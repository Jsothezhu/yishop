import Vue from 'vue'
import Vuex from 'vuex'
import cart from "./module/cart.js"
import address from "./module/address.js"

Vue.use(Vuex) // vue的插件机制


const store = new Vuex.Store({
    modules:{
		cart,
		address
	}
})

export default store
