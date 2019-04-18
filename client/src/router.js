import Vue from 'vue';
import Router from 'vue-router';
import homepage from './views/Homepage.vue'
import register from './views/Register.vue'
import signIn from './views/SignIn.vue'
import productList from './views/ProductList.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/users/signUp',
      name: 'signUp',
      component: register
    },
    {
      path: '/users/signIn',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/products',
      name: 'productList',
      component: productList
    }
  ],
});