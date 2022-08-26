<template>
    <span class="material-symbols-rounded">{{icon}}</span>
</template>
    
<script>
export default {
    name: 'MaterialIcon',
    props: {
        icon: String
    }
}
</script>

<style>
.material-symbols-rounded {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}
</style>