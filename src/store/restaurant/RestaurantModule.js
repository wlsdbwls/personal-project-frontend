import Vue from "vue";
import Vuex from "vuex";

import mutations from "@/store/restaurant/mutations";
import actions from "@/store/restaurant/actions";
import state from "@/store/restaurant/states";

Vue.use(Vuex);

const restaurantModule = {
  namespaced: true,
  actions,
  state,
  mutations,
};

export default restaurantModule;
