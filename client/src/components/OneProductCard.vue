<template>
  <v-container fluid grid-list-md 3 style="min-height:500px;background: url('https://images.unsplash.com/photo-1552229633-cbbaf48ddd4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60')">
    <v-layout row wrap justify-center style="">
      <v-flex d-flex xs12 sm6 md4>
        <v-card >
          <v-img :src="detail.image"></v-img>
          <v-card-text></v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card color="grey darken-3" dark>
             
              <v-card-text>
                Description: <br>
                {{detail.description}}
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex d-flex xs12 align-center>
                <v-card color="grey darken-4" dark>
                  <v-card-text> USD : $ {{detail.price}}</v-card-text>
                </v-card>
                <v-card color="grey darken-4" dark>
                  <v-card-text>Stock : {{detail.availableStock}}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState(['detail'])
  },
}
</script>

<style>

</style>
