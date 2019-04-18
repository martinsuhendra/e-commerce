<template>
  <v-layout justify-start px-3 py-2>
    <v-flex xs12 sm6>
          <v-layout row wrap style="width: 800px">
            <v-flex
              v-for="card in cards"
              :key="card.title"
              v-bind="{ [`xs${card.flex}`]: true }"
              px-2
              py-2
            >
              <v-card>
                <v-img
                  :src="card.src"
                  height="400px"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="card.title"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>add_shopping_cart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>zoom_in</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
   
    </v-flex>
  </v-layout>
</template>

<!--<template>
  <v-container grid-list-md text-xs-center>
    <div>
      <v-text-field
            label="Search..."
            v-model="search"
      ></v-text-field>
    </div>
    <v-layout row wrap>
      <v-flex v-for="(guitar, index) in filteredArticles" :key="index" xs3>
        <productCard
          v-bind:productName="guitar.productName"
          v-bind:price="guitar.price"
          v-bind:image="guitar.image"
        ></productCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>-->

<script>

import productCard from '../components/productCard'

export default {
    components : {
      productCard
    },
    data() {
        return {
            cars : [],
            search: '',
            cards: [
        { title: 'Ferari', src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', flex: 12 },
        { title: 'Mustang', src: 'https://images.unsplash.com/photo-1496437792604-55ca7c5c3f6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', flex: 12 },
        { title: 'Aston Martin', src: 'https://images.unsplash.com/photo-1508974491678-7ec251d629fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', flex: 12 },
      ]
        }
    },
    computed: {
        filteredArticles() {
            return this.cars.filter((entry)=> {
                return entry.productName.toLowerCase().match(this.search)
            })
        }
    },
    created() {
      this.axios
          .get('/products')
          .then(({data})=> {
            this.guitars = data
          })
          .catch((err)=> {
            console.log(err.message);
          })
          
    },
}
</script>

<style scoped>

</style>