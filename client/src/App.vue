<template>
  <v-app>
    <!-- Nav -->
    <v-container fluid style="background: url('https://images.unsplash.com/photo-1517994112540-009c47ea476b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1981&q=80');
      no-repeat center center fixed; 
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;">
      <v-layout align-start justify-space-around row>

        <router-link to="/" style="textDecoration : none;">
          <span class="font-weight-light white--text ghost-button-size-transition" style="font-size: 32px">FOXMOTOR</span>
        </router-link>
       
        <v-layout justify-end>
            <router-link to="/users/signIn" style="textDecoration : none;" v-if="isLogin == false">
              <span class="font-weight-light white--text ghost-button-size-transition">Sign In</span>
            </router-link>
            <span class="font-weight-light white--text ghost-button-size-transition" v-else-if="isLogin" @click="signOut">Sign Out</span>

          <router-link to="/users/signUp" style="textDecoration : none;">
            <span class="font-weight-light white--text ghost-button-size-transition">Sign Up</span>
          </router-link>
        </v-layout>

      </v-layout>

       <v-layout align-start justify-center align-center row fill-height>
        <router-link to="/products" style="textDecoration : none;">
          <span class="font-weight-medium white--text ghost-button-transition" id="collection">Collections</span>
        </router-link>
       </v-layout>
    </v-container>

    <v-content>
      <router-view v-on:isLogin="successRegister" v-on:signIn="successSignin"></router-view>
    </v-content>
  </v-app>
</template>
 
<script>

import { mapState, mapActions } from 'vuex'
export default {
  name: "App",
  components: {
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
     ...mapActions(['showCarts']),
    clearStore(){
      this.$store.state.carts = []
      this.$store.state.allCarts = []
    },
    successRegister() {
      let message = "Please login to continue!";
      this.$swal("Congratulation", message, "success");
      this.$router.push("/users/signIn");
    },
    successSignin() {
      this.$store.state.isLogin = true;
      this.$router.push("/products");
      this.$swal("You are logged in!", "", "success");
      this.showCarts()
    },
    signOut() {
      this.$store.state.isLogin = false;
      localStorage.clear();
      this.$router.push("/");
      this.$swal("You are logged out!", "", "success");
      this.clearStore()
    },
  },
  computed: {
    ...mapState(['isLogin'])
  },
};
</script>

<style>

.ghost-button-size-transition {
  display: inline-block;
  width: 200px;
  height: 25px;
  line-height: 25px;
  margin: 0 auto;
  padding: 8px;
  color: #fff;
 
  text-align: center;
  outline: none;
  text-decoration: none;
  transition: width 0.3s ease-out,
              height 0.3s ease-out,
              line-height 0.3s ease-out;
}
.ghost-button-size-transition:hover,
.ghost-button-size-transition:active {
  width: 220px;
  height: 45px;
  line-height: 45px;
  transition: width 0.1s ease-in,
              height 0.1s ease-in,
              line-height 0.1s ease-in;
              font-size: 20px
}

 .ghost-button-transition {
  display: inline-block;
  width: 200px;
  padding: 8px;
  color: #000;
  border: 2px solid #fff;
  text-align: center;
  outline: none;
  text-decoration: none;
  transition: background-color 0.2s ease-out,
              color 0.2s ease-out;
}
 .ghost-button-transition:hover,
 .ghost-button-transition:active {
  background-color: #000;
  opacity: 0.7;
  color: #000;
  transition: background-color 0.3s ease-in,
              color 0.3s ease-in;
}


.v-card__text {
  padding: 6px;
  width: 100%;
}

.router-link {
  textdecoration: none;
}
</style>
