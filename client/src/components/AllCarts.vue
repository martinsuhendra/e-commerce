<template>
  <div
    style="max-width: 700px; margin: auto;"
  >

    <v-card>
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap v-for="(cart, index) in carts" :key="index">
          <v-flex xs12>
            <v-card color="cyan darken-2" class="white--text">
              <v-layout>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div >
                      <ul v-for="(product, index) in cart.productId" :key="index">
                          <li>{{product.productName}}</li>
                          <li>{{product.price}}</li>
                      </ul>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                Total
                <div class="headline" px-3> {{cart.total}}</div>
                <v-spacer></v-spacer>
                Total Items
                <div class="headline" px-3> {{cart.amount}}</div>
              </v-card-actions>
              <v-btn flat @click.prevent="getDeleteCart(cart._id)">Delete Cart</v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
        carts : this.$store.state.allCarts
    };
  },
  methods: {
      getDeleteCart(cartId){
          this.deleteCart(cartId)
      },
    ...mapActions(["showCarts","deleteCart"]),
  },
  created() {
      this.showCarts()
  },
  computed: {
      ...mapState(["allCarts"])
  },
  watch: {
      
  },
};
</script>

<style>
</style>
