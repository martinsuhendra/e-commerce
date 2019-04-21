<template>
  <div>
    <div xs6 md6>
      <v-text-field v-model="search" label="Input Product Id"></v-text-field>
      <v-btn @click="searchProduct">Search</v-btn>
    </div>
    <v-form>
      <v-text-field v-model="productName" label="Product Name"></v-text-field>

      <v-text-field v-model="description" label="Description"></v-text-field>

      <v-text-field v-model="price" label="Price"></v-text-field>

      <v-text-field v-model="availableStock" label="Stock"></v-text-field>

      <div>
        <input type="file" v-on:change="image" label="Image">
      </div>

      <div>
        <v-btn color="success" @click="updateProduct">Update</v-btn>
        <v-btn color="error" @click="cancel">Cancel</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      productName: "",
      description: "",
      price: "",
      availableStock: "",
      image: ""
    };
  },
  created() {},
  methods: {
    ...mapActions["getOneProduct"],
    searchProduct() {
      axios
        .get(`http://localhost:3000/products/${this.search}`)
        .then(({ data }) => {
          (this.productName = data.productName),
            (this.description = data.description),
            (this.price = data.price),
            (this.availableStock = data.availableStock),
            // this.image = data.image,
            console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateProduct() {
      axios
        .patch(
          `http://localhost:3000/products/${this.search}`,
          {
            productName: this.productName,
            description: this.description,
            price: this.price,
            availableStock: this.availableStock,
            image: this.image
          },
          {
            headers: {
              token: localStorage.getItem("token"),
              role: localStorage.getItem("role")
            }
          }
        )
        .then(({ data }) => {
          this.$swal("success", "update success", "success");
          this.productName = "";
          this.description = "";
          this.price = "";
          this.availableStock = "";
          this.image = "";
          console.log(data);
        })
        .catch(err => {
          this.$swal("success", err.response.data.message, "warning");
          console.log();
        });
    },
    cancel() {
      this.productName = "";
      this.description = "";
      this.price = "";
      this.availableStock = "";
      this.image = "";
      this.$router.push('/products')
    }
  }
};
</script>

<style>
</style>
