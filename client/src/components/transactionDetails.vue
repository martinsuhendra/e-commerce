<template>
  <v-container>
    <v-data-table :headers="headers" :items="products" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.productName }}</td>
        <td class="text-right">{{ props.item.price }}</td>
        <td class="text-right">{{ props.item.amount }}</td>
        <td class="text-right">{{ props.item.total }}</td>
      </template>
    </v-data-table>
    <v-btn flat @click="cartCheckout">Cart Checkout</v-btn>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "Cars Type",
          align: "left",
          sortable: true,
          value: "name"
        },
        { text: "Price", value: "price" },
        { text: "Amount", value: "amount" },
        { text: "Total", value: "total" }
      ],
      products: this.$store.state.carts
    };
  },
  computed: {},
  methods: {
    ...mapActions(["createCart","showCarts"]),

    //CART BUSINESS PROCESS
    cartCheckout() {
      this.createCart();
      this.showCarts();
    }
  }
};
</script>

<style>
</style>
