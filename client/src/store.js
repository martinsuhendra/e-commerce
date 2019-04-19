import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cars: [],
        detail : {},
        carts : [],
        allCarts : [],
        newProduct : '',
        isLogin : false
    },
    mutations: {
        setProductList(state, payload){
            state.cars = payload
        },
        setDetail(state, payload) {
            state.detail = payload
        },
        setCarts(state, payload) {
            state.carts.push(payload)
        },
        setAllCarts(state, payload){
            state.allCarts = payload
        },
        pushNewProduct(state, payload) {
            state.cars.push(payload)
        },
        clearCart(state){
            state.carts = []
        }
    },
    actions : {
        getProductList(context){
            axios
            .get('http://localhost:3000/products')
            .then(({data})=> {
              context.commit('setProductList', data)
            })
            .catch((err)=> {
              console.log(err.message);
            })
        },
        getOneProduct({commit}, productId){ 
            axios
            .get(`http://localhost:3000/products/${productId}`)
            .then(({data})=> {
                commit('setDetail', data)
                console.log(data);
            })
            .catch((err)=>{
                console.log(err);
            })
        },

        addItem({commit}, item){
            commit('setCarts', item)
        },
        createCart(context){
            let userId = localStorage.getItem('id')
            let productId = []
            let total = 0
            let amount = 0
            context.state.carts.forEach(item => {
                productId.push(item.productId)
                total += item.total
                amount += item.amount
            })     
            axios
                .post('http://localhost:3000/carts',{
                    userId,
                    productId,
                    total,
                    amount
                },{
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(({data})=> {
                    context.commit('clearCart')
                    console.log(data);
                })
                .catch((err)=> {
                    console.log(err);
                })
        },
        showCarts(context){
            axios
                .get('http://localhost:3000/carts',{
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(({data})=> {
                    context.commit('setAllCarts', data)
                })
                .catch((err)=> {
                    console.log(err);
                })
        },
        deleteCart({commit, dispatch}, cartId){
            axios
                .delete(`http://localhost:3000/carts/${cartId}`,{
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(({data})=> {
                   return axios
                        .get('http://localhost:3000/carts',{
                            headers : {
                                token : localStorage.getItem('token')
                            }
                        })       
                })
                .then(({data}) => {
                    commit('setAllCarts', data)
                })
                .catch((err)=> {
                    console.log(err);
                })
        },
        createProduct({commit}, newProduct){
            const fd = new FormData()
            fd.append('image', newProduct.image)
            fd.append('productName', newProduct.productName)
            fd.append('description', newProduct.description)
            fd.append('availableStock', newProduct.availableStock)
            fd.append('price', newProduct.newPrice)

            axios
                .post('http://localhost:3000/products', fd , {
                    headers : {
                        token: localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({data})=> {
                    commit('pushNewProduct', data)
                    console.log(data);
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
})

