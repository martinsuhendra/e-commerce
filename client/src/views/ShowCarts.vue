<template>
    <all-carts/>
</template>

<script>

import allCarts from '../components/AllCarts.vue'

export default {
    name: "ShowCarts",
    components : {
        allCarts
    },
    beforeCreate() {
        if(!localStorage.getItem('token')){
           this.$route.push('/') 
        }
    },
}
</script>

<style>

</style>
