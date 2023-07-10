import {
  REQUEST_RESTAURANT_LIST_TO_SPRING,
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestRestaurantRegisterToSpring({ }, payload) {
    return axiosInst.springAxiosInst.post("/restaurant/register", payload)
      .then((resRestaurantRegister) => {
        if (resRestaurantRegister.data) {
          return resRestaurantRegister.data;
        } else {
          alert("음식점 등록 불가!");
        }
      })
  },
  requestRestaurantListToSpring({ commit }) {
    return axiosInst.springAxiosInst.get("/restaurant/list")
      .then((resRestaurantList) => {
        commit(REQUEST_RESTAURANT_LIST_TO_SPRING, resRestaurantList.data);
      })
      .catch((error) => {
        alert('에러 발생!')
      })
  },

};