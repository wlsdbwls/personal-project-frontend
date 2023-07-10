import Vue from 'vue'
import Vuex from 'vuex'

import accountModule from '@/store/account/AccountModule'
import restaurantModule from '@/store/restaurant/RestaurantModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    accountModule: accountModule,
    restaurantModule: restaurantModule,
  },
})

export default store