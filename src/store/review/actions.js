import {
    REQUEST_REVIEW_LIST_TO_SPRING,
} from "./mutation-types";

import axiosInst from '@/utility/axiosInst'

export default {
    requestReviewToSpring({ }, payload) {
        const { ratings, comment, userToken, restaurantName } = payload

        return axiosInst.springAxiosInst.post("/review/register", { ratings, comment, userToken, restaurantName })
            .then((resReview) => {
                console.log('작성한 리뷰: ' + resReview.data)
                return resReview.data
            })
            .catch(() => {
                alert("통신이 불가합니다")
            })
    },
    requestReviewListToSpring({ commit }, payload) {
        const { restaurantName } = payload

        return axiosInst.springAxiosInst.post("/review/list", { restaurantName })
            .then((resReviewList) => {
                console.log('후기 목록: ' + resReviewList.data)
                commit(REQUEST_REVIEW_LIST_TO_SPRING, resReviewList.data);
            })
            .catch((error) => {
                alert('에러 발생!')
            })
    },
}