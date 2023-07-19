import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/review/actions"
import state from "@/store/review/states"
import mutations from "@/store/review/mutations"

Vue.use(Vuex)

const ReviewModule = {
    namespaced: true,
    actions,
    state,
    mutations,
}

export default ReviewModule