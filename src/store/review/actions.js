import axiosInst from '@/utility/axiosInst'

import {
    REQUEST_REVIEW_TO_SPRING,
} from "./mutation-types";

export default {
    requestRestaurantReviewToSpring({ commit }, payload) {
        return axiosInst.springAxiosInst.post("/review/register", payload)
            .then((resReview) => {
                console.log('작성한 리뷰: ' + resReview.data)
                commit(REQUEST_REVIEW_TO_SPRING, resReview.data)
            })
            .catch(() => {
                alert("통신이 불가합니다")
            })
    },
}