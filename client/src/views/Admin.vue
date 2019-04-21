<template >
  <div style="background: url('https://images.unsplash.com/photo-1540476547779-348beb642680?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60');
  min-height: 500px">
    <div class="container" style="background-color: white; opacity:0.9">
      <div style="display: flex; justify-content: center">
        <router-link to="/admin/edit">
          <v-btn color="success" @click="changeShow('edit')">Edit Product</v-btn>
        </router-link>
        <router-link to="/admin/delete">
          <v-btn color="success" @click="changeShow('delete')">Delete Product</v-btn>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import EditProduct from "@/components/EditProduct.vue";
import DeleteProduct from "@/components/DeleteProduct.vue";

export default {
  name: "Admin",
  components: {
    EditProduct,
    DeleteProduct
  },
  data() {
    return {
      show: ""
    };
  },
  methods: {
    changeShow(value) {
      if (value == "edit") {
        this.show = "edit";
      } else {
        this.show = "delete";
      }
    }
  },
  created() {}
};
</script>

<style>
</style>
