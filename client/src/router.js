import Vue from 'vue';
import Router from 'vue-router';
import homepage from './views/Homepage.vue'
import register from './views/Register.vue'
import signIn from './views/SignIn.vue'
import productList from './views/ProductList.vue'
import oneProduct from './views/OneProduct.vue'
import userCart from './views/userCart.vue'
import showAllCarts from './views/ShowCarts.vue'
import adminPage from './views/Admin.vue'
import deleteProduct from '@/components/DeleteProduct.vue'
import editProduct from '@/components/EditProduct.vue'

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
      component: productList,
    
    },
    {
      path : '/products/:productId',
      name : 'oneProduct',
      component : oneProduct
    },
    {
      path : '/cart',
      name : 'userCart',
      component : userCart
    },
    {
      path : '/cart/userId',
      name : 'showAllCarts',
      component : showAllCarts
    },
    {
      path : '/admin',
      name : 'adminPage',
      component : adminPage,
      children : [
        {
          path : '/admin/edit',
          name : 'editProduct',
          component : editProduct,
        },
        {
          path : '/admin/delete',
          name : 'deleteProduct',
          component : deleteProduct,
        }
      ]
    }
   
  ],
});
