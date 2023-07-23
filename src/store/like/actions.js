import {
    REQUEST_LIKE_RESTAURANT_TO_SPRING,
} from "./mutation-types";

import axiosInst from '@/utility/axiosInst'

export default {
    requestLikeRestaurantToSpring({ commit }, payload) {
        const { userToken, restaurantId } = payload

        return axiosInst.springAxiosInst.post("/like/restaurant", { userToken, restaurantId })
            .then((resLike) => {
                if (resLike.data === true) {
                    commit(REQUEST_LIKE_RESTAURANT_TO_SPRING, resLike.data)

                    alert('찜 되었습니다')
                } else (
                    alert('중복된 찜!')
                )
            })
            .catch(() => {
                alert("찜 등록 통신이 불가합니다");
            })
    },
    requestUnlikeRestaurantToSpring({ }, id) {
        const userToken = localStorage.getItem('userToken');

        return axiosInst.springAxiosInst.delete(`/like/${id}`, {
            params: {
                userToken: userToken
            }
        })
            .then((resUnLike) => {
                alert('찜 해제 되었습니다');
            })
            .catch(() => {
                alert('찜 해제 통신이 불가합니다');
            });
    },
    requestLikesCountToSpring({ }, restaurantId) {

        return axiosInst.springAxiosInst.post("/like/restaurant-count", { restaurantId })
            .then((resLikesCount) => {
                console.log('resLikesCount: ' + resLikesCount.data)
                return resLikesCount.data
            })
            .catch(() => {
                alert('찜 Count 통신이 불가합니다');
            })
    },
}