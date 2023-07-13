import {
  REQUEST_RESTAURANT_TO_SPRING,
  REQUEST_RESTAURANT_LIST_TO_SPRING,
  REQUEST_BUSINESS_RESTAURANT_LIST_TO_SPRING,
  REQUEST_BUSINESS_RESTAURANT_TO_SPRING
} from "./mutation-types";

export default {
  [REQUEST_RESTAURANT_LIST_TO_SPRING](state, receivedData) {
    state.restaurants = receivedData;
  },
  [REQUEST_RESTAURANT_TO_SPRING](state, receivedData) {
    state.restaurant = receivedData;
  },
  [REQUEST_BUSINESS_RESTAURANT_LIST_TO_SPRING](state, receivedData) {
    state.filteredRestaurants = receivedData;
  },
  [REQUEST_BUSINESS_RESTAURANT_TO_SPRING](state, receivedData) {
    state.filteredRestaurant = receivedData;
  },
};

