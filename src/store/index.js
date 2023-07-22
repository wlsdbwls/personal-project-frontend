import Vue from 'vue'
import Vuex from 'vuex'

import accountModule from '@/store/account/AccountModule'
import restaurantModule from '@/store/restaurant/RestaurantModule'
import reviewModule from '@/store/review/ReviewModule'
import likeModule from '@/store/like/LikeModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    accountModule: accountModule,
    restaurantModule: restaurantModule,
    reviewModule: reviewModule,
    likeModule: likeModule,
  },
})

export default store