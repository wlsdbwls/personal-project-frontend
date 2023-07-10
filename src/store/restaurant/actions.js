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
};