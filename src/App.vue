<template>
    <n-message-provider placement="bottom">
        <MainPage />
    </n-message-provider>
</template>

<script>
import MainPage from './components/MainPage.vue';
import { NMessageProvider } from 'naive-ui';

export default {
    name: 'App',
    components: {
        MainPage,
        NMessageProvider
    }
}
</script>

<style>

</style>