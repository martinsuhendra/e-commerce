<template>  
 <one-product-card/>
</template>

<script>
import OneProductCard from '../components/OneProductCard.vue'
import { mapState, mapActions } from 'vuex'
export default {
    data(){
        return {
            singleProduct: this.$store.state.detail
        }
    },
    components: {
          OneProductCard
    },
    created() {
        console.log(this.$route.params.productId)
        this.getOneProduct(this.$route.params.productId)
    },
    methods: {
        ...mapActions(['getOneProduct'])
    }
}

</script>

<style>

</style>
