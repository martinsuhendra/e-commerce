<template>
    <div>
      <product-card/>
    </div>
</template>

<script>

import ProductCard from '../components/ProductCard.vue'
export default {
    name: 'ProductList', 
    components : {
      ProductCard,
    }
}
</script>
