<template>
  <div
    style="max-width: 700px; margin: auto;"
    v-if="this.$store.state.allCarts.length !== 0"
  >

    <v-card>
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap v-for="(cart, index) in this.$store.state.allCarts" :key="index">
          <v-flex xs12>
            <v-card color="cyan darken-2" class="white--text">
              <v-layout>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <table>
                        <thead style="font-size:20px">
                          <td>Item</td>
                          <td>Price</td>
                        </thead>
                        <tbody>
                          <tr v-for="(product, index) in cart.productId" :key="index">
                            <td>{{product.productName}}</td>
                            <td>USD {{product.price}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                <div style="margin-right:30px">Total</div>
                <div class="headline" px-3>USD {{cart.total}}</div>
                <v-spacer></v-spacer>
                <div style="margin-right:30px">Total Items</div>
                <div class="headline" px-3> {{cart.amount}}</div>
              </v-card-actions>
              <v-btn flat @click.prevent="getDeleteCart(cart._id)">Delete Cart</v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
  <div v-else style="text-align:center">
     <router-link to="/products" style="textDecoration : none;">
          <span class="font-weight-medium">No Transactions . . . Get Me a Car!!</span>
     </router-link>
    <img src="../../public/img/no_data.svg" alt="">
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
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
      ...mapState(["allCarts"]),

      localComputed() {
        return 'Local Computed!';
      },
  },
  watch: {
      
  },
};
</script>

<style scoped>
.v-card__title {
    padding: 29px;
    margin-left: 30px;
    width: 300px;
}
td, th {
    display: table-cell;
    vertical-align: inherit;
    width: 500px;
}
.v-card__title[data-v-76c71362] {
    padding: 29px;
    margin-left: 30px;
    width: 700px;
}
</style>
