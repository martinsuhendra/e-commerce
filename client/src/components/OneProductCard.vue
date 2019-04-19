<template>
  <v-container fluid grid-list-md 3>
    <v-layout row wrap justify-center>
      <v-flex d-flex xs12 sm6 md4>
        <v-card >
          <v-img :src="detail.image"></v-img>
          <v-card-text></v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card color="indigo" dark>
              <v-card-text>{{detail.description}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex d-flex xs12 align-center >
                <v-card color="red lighten-2" dark>
                  <v-card-text> USD : $ {{detail.price}}</v-card-text>
                </v-card>
                <v-card color="red lighten-2" dark>
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
