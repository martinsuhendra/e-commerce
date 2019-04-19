<template>
    <div>
      <product-card/>
    </div>
</template>

<script>

import ProductCard from '../components/ProductCard.vue'
import { mapActions } from 'vuex'
export default {
    name: 'ProductList', 
    components : {
      ProductCard,
    },
    created() {
      this.getProductList()
    },
    methods: {
      ...mapActions(['getProductList'])
    },
}
</script>
