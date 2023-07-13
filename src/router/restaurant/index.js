import Vue from "vue";
import VueRouter from "vue-router";

import RestaurantListPage from "@/views/restaurant/RestaurantListPage.vue";
import RestaurantRegisterPage from "@/views/restaurant/RestaurantRegisterPage.vue";
import RestaurantReadPage from "@/views/restaurant/RestaurantReadPage.vue";

import BusinessRegisteredRestaurantsPage from '@/views/restaurant/business/BusinessRegisteredRestaurantsPage.vue'
import BusinessRestaurantReadPage from '@/views/restaurant/business/BusinessRestaurantReadPage.vue'

import RestaurantModifyPage from '@/views/restaurant/RestaurantModifyPage.vue'

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
  {
    path: '/business-registered-restaurant',
    name: 'BusinessRegisteredRestaurantsPage',
    component: BusinessRegisteredRestaurantsPage
  },
  {
    path: "/business-restaurant-read-page/:id",
    name: "BusinessRestaurantReadPage",
    components: {
      default: BusinessRestaurantReadPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: "/restaurant-modify-page/:id",
    name: "RestaurantModifyPage",
    components: {
      default: RestaurantModifyPage,
    },
    props: {
      default: true,
    },
  },
];

export default restaurantRoutes;
