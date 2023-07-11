import Vue from "vue";
import VueRouter from "vue-router";

import RestaurantListPage from "@/views/restaurant/RestaurantListPage.vue";
import RestaurantRegisterPage from "@/views/restaurant/RestaurantRegisterPage.vue";
import RestaurantReadPage from "@/views/restaurant/RestaurantReadPage.vue";

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
  {
    path: "/restaurant-read-page/:id",
    name: "RestaurantReadPage",
    components: {
      default: RestaurantReadPage,
    },
    props: {
      default: true,
    },
  },
];

export default restaurantRoutes;
