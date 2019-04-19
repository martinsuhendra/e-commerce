<template>
  <v-layout justify-start px-3 py-2 style="background : url('https://images.unsplash.com/photo-1547110543-617b53652bdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80');">
    <div>
      <v-text-field dark label="Search..." v-model="search"></v-text-field>
      <v-btn :to="{ name : 'showAllCarts', params : {} }" v-if="isLogin">
        <v-icon>add_shopping_cart</v-icon>My Carts
      </v-btn>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on" @click="dialog = true" v-if="isLogin && role == 'admin' ">Add Product</v-btn>
        </template>
        <span>Admin only!</span>
      </v-tooltip>
    </div>
    <v-flex xs12 sm6>
      <v-layout row wrap style="width: 800px">
        <v-flex
          v-for="car in filtered"
          :key="car.productName"
          v-bind="{ [`xs${car.flex}`]: true }"
          px-2
          py-2
        >
          <v-card style="min-width:350px">
            <v-img :src="car.image" height="400px">
              <v-container fill-height fluid pa-2>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline white--text">{{car.productName}}</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>

            <v-card-actions>
              <v-btn small :to="{ name : 'userCart', params : {} }" color="primary" flat v-if="isLogin">Cart Checkout</v-btn>
              <v-spacer></v-spacer>
              <v-btn small @click="cartTrigger(car._id, car.price, car.productName)" v-if="isLogin">
                <v-icon>add_shopping_cart</v-icon>
              </v-btn>

              <router-view></router-view>

              <v-btn :to="{ name : 'oneProduct',params : {productId : car._id} }" icon>
                <v-icon>zoom_in</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>

    <!-- Dialog -->
    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <v-btn fab dark small color="primary" @click="amount++">
            <v-icon dark>add</v-icon>
          </v-btn>

          <input type="text" color="primary" dark v-model="amount" style="width:10px">

          <v-btn fab dark small color="primary" @click="amount--" v-if="amount == 0" disabled>
            <v-icon dark>remove</v-icon>
          </v-btn>
          <v-btn fab dark small color="primary" @click="amount--" v-else>
            <v-icon dark>remove</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click="cancel">Close</v-btn>
          <v-btn color="primary" flat @click="addToCart">Add to Cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template>
      <!--Add Product Dialog -->
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-container>
              <v-card-title>
                <span class="headline">Add Car</span>
              </v-card-title>
            </v-container>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field label="Product Name*" required v-model="newProductName"></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field label="Description*" required v-model="description"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <input v-on:change="getImage" type="file" required>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="Available Stock*" required v-model="availableStock"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="Price" v-model="newPrice"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="addProduct">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-layout>
</template>
  </v-layout>

</template>

<script>
import VueSwal from 'vue-swal'

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "ProductCard",
  data() {
    return {
      search: "",
      dialog2: false,
      dialog: false,
      amount: 0,
      price: "",
      productId: "",
      productName: "",

      //register new product
      newProductName: "",
      description: "",
      image: "",
      availableStock: "",
      newPrice: "",

      role : localStorage.getItem('role')

    };
  },
  created() {
    this.getProductList();
  },
  methods: {
    ...mapActions(["getProductList", "addItem", "createCart","createProduct"]),

    //CART BUSINESS PROCESS
    getImage(event){
      this.image = event.target.files[0]
      
    },
    cartTrigger(productId, price, productName) {
      if (!localStorage.getItem("token")) {
        this.$swal("Oops", "please login to continue", "warning");
        this.$router.push("/users/signIn");
      } else {
        this.dialog2 = true;
        this.productId = productId;
        this.price = price;
        this.productName = productName;
      }
    },
    addProduct() {
       this.dialog = false
       let product = {
          productName: this.newProductName,
          description: this.description,
          image: this.image,
          availableStock: Number(this.availableStock),
          newPrice: Number(this.newPrice)
       }
       this.$route.push('/products')
       this.createProduct(product)
       this.$swal("success","created","success")

    },
    addToCart(){
      this.dialog2 = false;
      if (this.amount > 0) {
        let item = {
          productId: this.productId,
          amount: this.amount,
          total: +this.price * this.amount,
          price: this.price,
          productName: this.productName,
          amount: this.amount
        };
        this.addItem(item);
        this.dialog2 = false,
          this.amount = 0,
          this.price = "",
          this.productId = "";
      this.productName = "";
      } else {
      this.$swal("Oops", "please put the amount!", "warning");
      }
    },

    cancel() {
      this.dialog2 = false,
        this.amount = 0,
        this.price = "",
        this.productId = "";
    }
  },
  computed: {
    filtered() {
      return this.$store.state.cars.filter(entry => {
        return entry.productName.toLowerCase().match(this.search);
      });
    },
    
    ...mapState(["cars","isLogin"]),
    ...mapGetters(["updatedCars"])
  },
  mounted() {
    this.getProductList()
  },
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
