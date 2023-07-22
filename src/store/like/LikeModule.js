import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/like/actions"
import state from "@/store/like/states"
import mutations from "@/store/like/mutations"

Vue.use(Vuex)

const LikeModule = {
    namespaced: true,
    actions,
    state,
    mutations,
}

export default LikeModule