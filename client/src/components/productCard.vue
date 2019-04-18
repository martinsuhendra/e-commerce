<template>
  <v-flex>
    <v-card>
      <v-img class="white--text" :src="image"></v-img>
      <v-card-title>
        <div>
          <span class="grey--text">{{productName}}</span>
          <br>
          <span class="grey--text">USD : {{price}}</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="orange"><i class="material-icons">add_shopping_cart</i></v-btn>
        <v-btn flat color="orange"><i class="material-icons">pageview</i></v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["image", "productName", "price"],
  data() {
    return {};
  },
  methods: {
    productDetails() {
      
    }
  }
};
</script>

<style>
.v-card__title {
  padding: 1px;
}

.flex.xs3 {
  -ms-flex-preferred-size: 25%;
  flex-basis: 25%;
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  max-width: 18%;
}

.v-btn--right {
  right: -2px;
}
</style>
