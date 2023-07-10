import Vue from "vue";
import VueRouter from "vue-router";

import RestaurantListPage from "@/views/restaurant/RestaurantListPage.vue";
import RestaurantRegisterPage from "@/views/restaurant/RestaurantRegisterPage.vue";

Vue.use(VueRouter);

const restaurantRoutes = [
  {
    path: "/restaurant-register-page",
    name: "RestaurantRegisterPage",
    component: RestaurantRegisterPage,
  },
  {
    path: "/restaurant-list-page",
    name: "RestaurantListPage",
    component: RestaurantListPage,
  },
];

export default restaurantRoutes;
