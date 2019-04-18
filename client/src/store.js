import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cars: [],
        detail : null
    },
    mutations: {
        setProductList(state, payload){
            state.cars = payload
        },
        setDetail(state, payload) {
            state.detail = payload
        
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
            
        }
    }
})

