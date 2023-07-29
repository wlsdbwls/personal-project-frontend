import {
    REQUEST_REVIEW_LIST_TO_SPRING,
    REQUEST_REVIEW_TO_SPRING,
} from "./mutation-types";

import axiosInst from '@/utility/axiosInst'

export default {
    requestReviewRegisterToSpring({ }, payload) {
        const { ratings, comment, userToken, id } = payload

        return axiosInst.springAxiosInst.post("/review/register", { ratings, comment, userToken, restaurantId: id })
            .then((resReview) => {
                alert('후기가 작성되었습니다')
                location.reload()

                console.log('작성한 리뷰: ' + resReview.data)
                return resReview.data
            })
            .catch(() => {
                alert("통신이 불가합니다")
            })
    },
    requestReviewListToSpring({ commit }, payload) {
        const { restaurantId } = payload

        return axiosInst.springAxiosInst.post("/review/list", { restaurantId })
            .then((resReviewList) => {
                console.log('후기 목록: ' + resReviewList.data)
                commit(REQUEST_REVIEW_LIST_TO_SPRING, resReviewList.data);
            })
            .catch((error) => {
                alert('에러 발생!')
            })
    },
    requestModifyReviewToSpring({ }, payload) {
        const { id, userToken, comment, ratings } = payload

        return axiosInst.springAxiosInst.put(`/review/${id}`, { id, userToken, comment, ratings })
            .then((resReviewModify) => {
                if (resReviewModify.data) {
                    console.log("수정 잘 되는지 확인: " + JSON.stringify(resReviewModify.data))
                    alert("후기가 수정되었습니다.");
                    location.reload()

                    return resReviewModify.data
                }
            })
            .catch(() => {
                alert("후기 수정 통신 실패");
            });
    },
    requestReviewToSpring({ commit }, id) {
        return axiosInst.springAxiosInst.get(`/review/${id}`)
            .then((resReviewRead) => {
                console.log("후기 잘 읽는지 확인: " + JSON.stringify(resReviewRead.data))
                commit(REQUEST_REVIEW_TO_SPRING, resReviewRead.data)
                return resReviewRead.data
            })
            .catch(() => {
                alert("후기 read 통신 실패!");
            });
    },
    requestDeleteReviewToSpring({ }, id) {
        return axiosInst.springAxiosInst.delete(`/review/${id}`)
            .then((resReviewDelete) => {
                alert('삭제 완료되었습니다!')
                location.reload()
            })
            .catch(() => {
                alert("후기 삭제 실패!")
            });
    },
    requestAverageRatingsToSpring({ }, restaurantId) {
        return axiosInst.springAxiosInst.post("/review/average-ratings", { restaurantId })
            .then((resAverageRatings) => {
                console.log('restaurantId:', restaurantId, '평균 별점:', resAverageRatings.data)
                // 이거 리스트 띄울 때마다 계산하는 거 수정하기
                return resAverageRatings.data
            })
            .catch((error) => {
                alert('평균 평점 통신 에러 발생!')
            })
    },
}