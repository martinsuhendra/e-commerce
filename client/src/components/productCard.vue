<template>
  <v-layout justify-start px-3 py-2>
     <div>
      <v-text-field
            label="Search..."
            v-model="search"
      ></v-text-field>
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
              <v-card>
                <v-img
                  :src="car.image"
                  height="400px"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="car.productName"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>add_shopping_cart</v-icon>
                  </v-btn>

                  <router-view></router-view>
                 
                     <v-btn :to = "{ name : 'oneProduct',params : {productId : car._id} }" icon >
                      <v-icon>zoom_in</v-icon>
                     </v-btn>
                 
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
   
    </v-flex>
  </v-layout>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductCard',
  data() {
    return {
       search: ''
    };
  },
  created() {
      this.getProductList()
  },
  methods: {
        ...mapActions(['getProductList'])
  },
  computed: {
        filtered() {
            return this.$store.state.cars.filter((entry)=> {
                return entry.productName.toLowerCase().match(this.search)
            })
        },
        ...mapState(['cars'])
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
