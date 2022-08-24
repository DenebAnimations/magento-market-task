<template>
    <div class="header">
        <h1>{{ title }}</h1>

        <n-space size="large">
            <n-button text strong quaternary round v-on:click="cartOpen">
                <template #icon>
                    <n-icon size="24"> <ShoppingCartOutlined /> </n-icon>
                </template>
            </n-button>
            <n-button text strong quaternary round v-on:click="profileOpen">
                <template #icon>
                    <n-icon size="24"> <PersonOutlineRound /> </n-icon>
                </template>
            </n-button>
        </n-space>
    </div>
</template>

<script>
import { NButton, NIcon, NSpace, useMessage } from "naive-ui"
import { ShoppingCartOutlined, PersonOutlineRound } from "@vicons/material";

export default {
    name: 'AppHeader',
    setup() {
        const message = useMessage()
        return {
            infoMsg(msg) {
                message.info(msg)
            },
        }
    },
    methods: {
        cartOpen() {
            this.infoMsg("Cart opened")
        },
        profileOpen() {
            this.infoMsg("Profile opened")
        }
    },
    components: {
        NButton, NIcon, NSpace,
        ShoppingCartOutlined, PersonOutlineRound
    },
    props: {
        title: String,
    },
}
</script>

<style>
@media (max-width: 960px) {
    h1 {
        font-size: 1.5rem;
    }
}

h1, h2, h3 {
    font-family: 'Lexend Deca', sans-serif;
}

.header > h1 {
    cursor: pointer;
    user-select: none;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    margin: 0 2rem;
}
</style>