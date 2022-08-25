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
@media (max-width: 960px) {
    body {
        overflow-y: scroll;
    }
}
@media (min-width: 960px) {
    body {
        overflow: hidden;
    }
}
a { text-decoration: none; }
body { margin: 0; padding: 0;  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
#app { position: absolute; width: 100vw; height: 100vh; display: flex; flex-direction: column; }
</style>