<template>
    <transition appear>
        <n-card class="card" :title="title" size="small" hoverable borderless>
            <template #cover>
                <transition appear>
                    <n-image :src="image" style="width:100%" :show-toolbar="false">
                        <template #placeholder>
                            <div class="placeholder">
                                <n-spin size="large" />
                            </div>
                        </template>
                    </n-image>
                </transition>
            </template>
            <template #action>
                <div class="card-footer">
                    <n-button class="card-button" strong icon-placement="right" type="primary" v-if="!stock">
                        <template #icon>
                            <n-icon> <AddShoppingCartRound /> </n-icon>
                        </template>
                        {{ price.value }} {{price.currency}}
                    </n-button>
                    <n-button class="card-button" strong icon-placement="left" type="default" disabled v-else>
                        <template #icon>
                            <n-icon> <DoNotDisturbRound /> </n-icon>
                        </template>
                        Out of stock
                    </n-button>
                </div>
            </template>
        </n-card>
    </transition>
</template>

<script>
import { NButton, NCard, NIcon, NImage, NSpin } from "naive-ui"
import { AddShoppingCartRound, DoNotDisturbRound } from "@vicons/material";

export default {
    name: "ProductCard",
    components: {
        NButton, NCard, NIcon, NImage, NSpin,
        AddShoppingCartRound, DoNotDisturbRound
    },
    props: {
        title: String,
        price: { value: Number, currency: String },
        sku: String,
        image: String,
        stock: Boolean
    }
}
</script>

<style>
.n-image {
    transition: opacity 0.5s;
}
.n-image[data-hidden="false"] {
    opacity: 1;
}
.n-image[data-hidden="true"] {
    opacity: 0;
}

.card {
    cursor: pointer;
    height: 100%
}
.card:hover {
    border: var(--n-color-target) 1px solid;
}
.card-button {
    width: 100%;
}
.card-button {
    height: auto;
    padding: 0;
    justify-content: space-around;
}
.card-footer {
    display: flex;
    justify-content: stretch;
}
.placeholder {
    width: -webkit-fill-available; 
    height: 256px; 
    display: flex; 
    justify-content: center; 
    align-items: center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  transition-delay: 0.25s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
