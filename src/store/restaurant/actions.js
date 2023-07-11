import {
  REQUEST_RESTAURANT_TO_SPRING,
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
  requestRestaurantToSpring({ commit }, id) {
    return axiosInst.springAxiosInst.get(`/restaurant/${id}`)
      .then((resRestaurantRead) => {
        console.log("음식점 잘 읽는지 확인: " + JSON.stringify(resRestaurantRead.data));
        commit(REQUEST_RESTAURANT_TO_SPRING, resRestaurantRead.data);
      })
      .catch(() => {
        alert("상품이 존재하지 않습니다.");
      });
  },
};