import {
  REQUEST_RESTAURANT_TO_SPRING,
  REQUEST_RESTAURANT_LIST_TO_SPRING,
  REQUEST_BUSINESS_RESTAURANT_LIST_TO_SPRING,
  REQUEST_BUSINESS_RESTAURANT_TO_SPRING
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestRestaurantRegisterToSpring({ }, payload) {
    const { restaurantName, restaurantNumber, menuItems, restaurantAddress, restaurantTime, foodType, restaurantInfo, userToken, imageUrls } = payload;

    // menuItems 데이터를 배열로 변환
    const menus = menuItems.map(item => ({ menuItem: item.menuItem, menuPrice: item.menuPrice }));

    return axiosInst.springAxiosInst.post("/restaurant/register", {
      restaurantName, restaurantNumber, menus, restaurantAddress, restaurantTime, foodType, restaurantInfo, userToken, imageUrls
    })
      .then((resRestaurantRegister) => {
        if (resRestaurantRegister.data) {
          return resRestaurantRegister.data;
        } else {
          alert("맛집 등록 불가! 사업자 회원이 맞으신가요?");
        }
      })
  },

  requestRestaurantListToSpring({ commit }) {
    return axiosInst.springAxiosInst.get("/restaurant/list")
      .then((resRestaurantList) => {
        console.log('받아올 수 있는거니?: ' + resRestaurantList.data)
        commit(REQUEST_RESTAURANT_LIST_TO_SPRING, resRestaurantList.data);
      })
      .catch((error) => {
        alert('에러 발생!')
      })
  },
  requestRestaurantToSpring({ commit }, id) {
    return axiosInst.springAxiosInst.get(`/restaurant/${id}`)
      .then((resRestaurantRead) => {
        console.log("맛집 잘 읽는지 확인: " + JSON.stringify(resRestaurantRead.data));
        commit(REQUEST_RESTAURANT_TO_SPRING, resRestaurantRead.data);
      })
      .catch(() => {
        alert("맛집이 존재하지 않습니다.");
      });
  },
  requestBusinessRestaurantListToSpring({ commit }, payload) {
    return axiosInst.springAxiosInst.post("/restaurant/business-restaurant-list", payload)
      .then((resBusiResisteredList) => {
        console.log('받아올 수 있는거니?: ' + resBusiResisteredList.data)
        commit(REQUEST_BUSINESS_RESTAURANT_LIST_TO_SPRING, resBusiResisteredList.data);
      })
      .catch(() => {
        alert("통신이 불가합니다")
      })
  },
  requestBusinessRestaurantToSpring({ commit }, id) {
    return axiosInst.springAxiosInst.get(`/restaurant/business-restaurant/${id}`)
      .then((resBusiRestaurantRead) => {
        console.log("맛집 잘 읽는지 확인: " + JSON.stringify(resBusiRestaurantRead.data));
        commit(REQUEST_BUSINESS_RESTAURANT_TO_SPRING, resBusiRestaurantRead.data);
      })
      .catch(() => {
        alert("맛집이 존재하지 않습니다.");
      });
  },
  requestModifyRestaurantToSpring({ }, payload) {
    const { restaurantName, restaurantInfo, id } = payload

    return axiosInst.springAxiosInst.put(`/restaurant/${id}`, { restaurantName, restaurantInfo, id })
      .then((resRestaurantModify) => {
        if (resRestaurantModify.data) {
          alert("맛집 게시물이 수정되었습니다.");
          return resRestaurantModify.data;
        }
      })
      .catch(() => {
        alert("통신 실패");
      });
  },
  requestDeleteRestaurantToSpring({ }, id) {
    return axiosInst.springAxiosInst.delete(`/restaurant/${id}`)
      .then((resRestaurantDelete) => {
      })
      .catch(() => {
        alert("맛집 삭제 실패");
      });
  },
  // restaurantVisitorToSpring({ }, id) {
  //   return axios.springAxiosInst.get(`/restaurant/visitor/${id}`)
  //   .then((resVisitor) => {
  //   })
  //   .catch(() => {
  //     alert("방문자 받아오기 실패!")
  //   })
  // },
  requestRestaurantNameToSpring({ }, id) {
    return axiosInst.springAxiosInst.get(`/restaurant/return-name/${id}`)
      .then((resRestaurantName) => {
        console.log("맛집 이름: " + JSON.stringify(resRestaurantName.data));
        return resRestaurantName.data
      })
      .catch(() => {
        alert("맛집이 존재하지 않습니다.");
      });
  },
};