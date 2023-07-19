import axiosInst from '@/utility/axiosInst'

import {
    REQUEST_REVIEW_TO_SPRING,
} from "./mutation-types";

export default {
    requestRestaurantReviewToSpring({ }, payload) {
        const { ratings, comment, userToken } = payload

        return axiosInst.springAxiosInst.post("/review/register", { ratings, comment, userToken })
            .then((resReview) => {
                console.log('작성한 리뷰: ' + resReview.data)
                return resReview.data
            })
            .catch(() => {
                alert("통신이 불가합니다")
            })
    },
}