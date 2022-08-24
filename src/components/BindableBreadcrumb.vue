<template>
    <n-breadcrumb :separator="separator">
        <n-breadcrumb-item v-for="item in items" :key="item.key" :clickable="false" >{{ item.label }}</n-breadcrumb-item>
    </n-breadcrumb>
</template>

<script>
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui';

export default {
    name: 'BindableBreadcrumb',
    props: {
        items: {
            type: Array,
            default: () => [{}],
        },  
        separator: {
            type: String,
            default: '/',
        },
    },
    components: {
        NBreadcrumb, NBreadcrumbItem,
    }
}
</script>