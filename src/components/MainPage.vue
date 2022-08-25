<template>
    <AppHeader title="Magento Market" />
    <Suspense>
        <div class="suspense">
            <div class="sidebar">
                <NavigationMenu @change="navSelectionChanged" @pathChange="navPathChanged" />
            </div>
            <div class="content" :key="selected">
                <BindableBreadcrumb class="path" :items="nav"/>
                <div class="products-container" v-if="selected === ''">
                    <h1>Select a category to view products</h1>
                </div>
                <ProductsGrid v-else :key="JSON.parse(selected).key" :category="selected" @buttonClick="productsButtonClick" @cardClick="productsCardClick" :pageSizeProp="globalPageSize" @pageSizeChanged="globalPageSizeChanged" />
            </div>
        </div>
        <template #fallback>
            <div class="overlay-center">
                <n-spin size="large" />
            </div>
        </template>
    </Suspense>
    <n-modal class="modal-card" v-model:show="show_product" preset="card" :bordered="false">
        <ProductPage />
    </n-modal>
</template>

<script>
import AppHeader from './AppHeader.vue'
import { NSpin, NModal, useMessage } from 'naive-ui'
import NavigationMenu from "./NavigationMenu.vue"
import BindableBreadcrumb from './BindableBreadcrumb.vue'
import ProductsGrid from './ProductsGrid.vue'
import ProductPage from './ProductPage.vue'

export default {
    name: 'MainPage',
    setup() {
        const message = useMessage()
        return {
            successMsg(msg) {
                message.success(msg)
            },
        }
    },
    data() {
        return {
            selected: '',
            show_product: false,
            globalPageSize: 8,
            nav: [{
                label: "Home",
                key: "home",
            }]
        }
    },
    methods: {
        titleClicked() {
            console.log("Title clicked")
            this.selected = ""
            this.navSelectionChanged(JSON.stringify({ label: "Home", key: "home" }))
        },
        globalPageSizeChanged(value) {
            console.log("globalPageSizeChanged", value)
            this.globalPageSize = value
        }, 
        productsCardClick(event) {
            console.log(event)
            this.show_product = true
        },
        productsButtonClick() {
            this.successMsg("Product added to cart")
            this.cart++
        },
        navSelectionChanged(value) {
            this.selected = value
        },
        navPathChanged(value) {
            this.nav = value.length > 1 && value[0] == JSON.stringify({ label: "Home", key: "home" }) ? value.map(item => {
                let { label, key } = JSON.parse(item)
                return {
                    label: label,
                    key: key,
                }
            }) : this.nav
        }
    },
    components: {
        NSpin, NModal,
        AppHeader,
        NavigationMenu,
        BindableBreadcrumb,
        ProductsGrid,
        ProductPage
    }
}
</script>

<style>
@media (max-width: 960px) {
    .sidebar {
        width: 100%;
    }
    .suspense {
        flex-direction: column;
        overflow-y: unset;
    }
    .path {
        margin: 0 0 0 1rem;
    }
    .modal-card {
        width: 100%;
        height: 100vh;
        border-radius: 0 !important;
        margin: 0;
    }
}

@media (min-width: 960px) {
    .sidebar {
        width: 256px;
    }
    .path {
        margin: 1rem 0 0 0;
    }
    .modal-card {
        width: calc(100% - 4rem);
        height: calc(100vh - 4rem);
    }
    .suspence {
        overflow-y: scroll;
    }
}

@media (min-width: 640px) {
    .products {
        grid-template-columns: repeat(auto-fill, 256px);
    }
}

@media (max-width: 640px) {
    .products {
        grid-template-columns: repeat(auto-fill, 240px);
    }
}

@media (max-width: 540px) {
    .products {
        grid-template-columns: repeat(auto-fill, 224px);
    }
}

@media (max-width: 500px) {
    .products {
        grid-template-columns: repeat(auto-fill, 100%);
    }
}

.container {
    width: 100vw;
    height: 100vh;
}

.overlay {
    position: absolute;
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: #00000080;
}

.overlay-center {
    position: absolute;
    width: 100vw; 
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff80;
    z-index: 9999;
}

.suspense {
    display: flex;
    height: 100%;
}

.content {
    flex: 1 0;
}

.products {
    display: grid;
    gap: 16px;
    margin: 1rem;
    justify-content: space-around;
}

.products-container {
    width: 100%; height: calc(100% - 48px);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.card-elevated {
    /* position: absolute; */
    width: 100%;
    height: 100%;
    box-shadow: 0px 8px 16px 0px #00000080;
    z-index: 9999;
}
</style>