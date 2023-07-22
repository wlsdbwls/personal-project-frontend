import {
    REQUEST_LIKE_RESTAURANT_TO_SPRING
} from "./mutation-types"

export default {
    [REQUEST_LIKE_RESTAURANT_TO_SPRING](state, receivedData) {
        state.likedRestaurants = receivedData;
    },
}

