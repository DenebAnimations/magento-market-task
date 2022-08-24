<template>
    <div class="products" v-if="!loading">
        <ProductCard v-for="card in productCards" :key="card.uid" :title="card.name" :price="{ value: card.price_range.minimum_price.regular_price.value, currency: card.price_range.minimum_price.regular_price.currency }" :sku="card.sku" :image="card.image.url" :stock="card.stock_status !== 'IN_STOCK'" v-on:click="cardClick" />
    </div>    
    <div class="line" v-else>
        <n-spin size="large" />
    </div>
    <div class="line">
        <n-pagination :page="page" :page-count="pageCount" :page-size="pageSize" show-size-picker :page-sizes="[8, 16, 32, 48, 64]" size="medium" @update:page="pageChanged" @update:page-size="pageSizeChanged" />
    </div>
</template>

<script>
import ProductCard from "./ProductCard.vue"
import { NPagination, NSpin } from "naive-ui"
import { venia } from "@/api/venia"

export default {
    name: "ProductsGrid",
    emits: ["buttonClick", "cardClick", "pageSizeChanged"],
    props: {
        category: { label: String, key: String },
        pageSizeProp: { type: Number, default: 8 },
    },
    setup(props) {
        return {
            pageSize: props.pageSizeProp
        }
    },
    async mounted() {
        this.pageSizeChanged(this.pageSizeProp)
        this.pageChanged(1)
    },
    beforeUnmount() {
        this.productCards = []
    },
    data() {
        return {
            loading: false,
            productCards: [],
            page: 1,
            // pageSize: 8,
            pageCount: 1,
        }
    },
    methods: {
        async update(page, pageSize) {
            /// Wait until loading is finished
            if (this.loading) return

            this.loading = true

            /// Reset page counter only if we change the number of items per page
            if (pageSize != this.pageSize) {
                this.pageCount = 1
                this.$emit("pageSizeChanged", pageSize)
            }
            
            this.page = page
            this.pageSize = pageSize
            
            let uid = JSON.parse(this.category).key
            let products = await venia.get_products(`{ category_uid: { eq: "${uid}" } }`, this.pageSize, this.page)
            this.pageCount = products.data.products.page_info.total_pages

            this.loading = false

            return products.data.products.items
        },
        async pageSizeChanged(value) {
            this.productCards = await this.update(1, value)
        },
        async pageChanged(value) {
            this.productCards = await this.update(value, this.pageSize)
        },
        cardClick(event) {
            if (event.target instanceof HTMLDivElement) {
                this.$emit("cardClick", event)
            }
            if (event.target instanceof HTMLButtonElement) {
                this.$emit("buttonClick", event)
            }
        },
    },
    components: {
        ProductCard, NPagination, NSpin
    }
}
</script>

<style>
.line {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    width: 100%;
}
</style>