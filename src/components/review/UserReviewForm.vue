<template>
    <div>
        <form @submit.prevent="submitReview">
            <div style="justify-content: center;" class="contents_box1">
                <h2 class="contents_name" style="color: black;">리뷰 쓰기</h2>
            </div>
            <div class="product_inq_home">
                <div class="product_info">
                    <p>{{ restaurantName }}에서 즐거운 식사하셨나요?</p>
                    <label>리뷰를 작성해 주세요!</label>
                </div>
                <div class="product_inq_listbox">
                    <div class="register-star-rating space-x-4 mx-auto">
                        <input type="radio" id="stars-5" name="rating" value="5" v-model="ratings" />
                        <label for="stars-5" class="star pr-4">★</label>
                        <input type="radio" id="stars-4" name="rating" value="4" v-model="ratings" />
                        <label for="stars-4" class="star">★</label>
                        <input type="radio" id="stars-3" name="rating" value="3" v-model="ratings" />
                        <label for="stars-3" class="star">★</label>
                        <input type="radio" id="stars-2" name="rating" value="2" v-model="ratings" />
                        <label for="stars-2" class="star">★</label>
                        <input type="radio" id="star-1" name="rating" value="1" v-model="ratings" />
                        <label for="star-1" class="star">★</label>
                    </div>
                    <!-- 이미지 등록 추가하기
                    <div>
                    <label for="image">이미지 첨부</label>
                    <input type="file">
                </div> -->

                    <div class="product_inq_question">
                        <div>
                            <textarea style="height: 150px; width: 100%; justify-content: center;" class="writeValue"
                                id="comment" v-model="comment" required
                                placeholder="작성내용은 매장주를 포함한 다른 사람들이 볼 수 있으니, 서로를 배려하는 마음을 담아 작성해 주세요"></textarea>
                        </div>
                    </div>

                    <div class="post_button_box">
                        <button raised type="submit" @click="showReviewRegisterForm" value="리뷰등록"
                            class="post_button">리뷰등록</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex"

const accountModule = 'accountModule'
const restaurantModule = 'restaurantModule'

export default {
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            userToken: '',
            comment: '',
            ratings: '',
            restaurantName: '',
            nickName: '',
            accountId: null,
        }
    },
    methods: {
        submitReview() {
            const { comment, ratings, userToken, id } = this
            console.log('내가 준 점수:', this.ratings, '내가 준 후기 코멘트:', this.comment)

            this.$emit('submit', { comment, ratings, userToken, id })
        },

        ratingToPercent() {
            const score = +this.restaurant.averageScore * 20;
            return score + 1.5;
        },

        async fetchAccountData() {
            this.userToken = localStorage.getItem("userToken");
            this.restaurantName = await this.requestRestaurantNameToSpring(this.id);
        },

        ...mapActions(accountModule, ["requestAccountToSpring"]),
        ...mapActions(restaurantModule, ["requestRestaurantNameToSpring"]),
    },

    created() {
        this.fetchAccountData();
        this.accountId = localStorage.getItem("accountId");
    },
};
</script>

<style scoped>
h2 {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input,
select,
textarea {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}

.room-deal-information-container {
    /* 기존의 높이 속성 제거 */
    /* height: 450px; */
    max-height: 80vh;
    /* 최대 높이를 뷰포트 높이의 80%로 설정 */
    overflow-y: auto;
    /* 내용이 넘칠 경우 스크롤 허용 */
    position: flex;
    /* margin-top: -400px; */
    color: #222222;
    border: 1px solid #dddddd;
    width: 700px;
    /* 높이를 600px로 조정 */
    /* height: 600px; */
    justify-content: center;
    align-items: center;
}

.writeValue {
    border: 1px solid #dddddd;
}

.register-star-ratings {
    color: #aaa9a9;
    position: relative;
    unicode-bidi: bidi-override;
    width: max-content;
    -webkit-text-fill-color: transparent;
    /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1.3px;
    /* -webkit-text-stroke-color: #2b2a29; */
    margin-top: 50px;
}

.register-star-ratings-fill {
    /* color: #fff58c; */
    padding: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    top: 0;
    left: 0;
    overflow: hidden;
    -webkit-text-fill-color: gold;
}

.register-star-ratings-base {
    z-index: 0;
    padding: 0;
}

.register-star-rating {
    display: flex;
    flex-direction: row-reverse;
    font-size: 2.25rem;
    line-height: 2.5rem;
    justify-content: space-around;
    padding: 0 0.2em;
    text-align: center;
    width: 5em;
}

.register-star-rating input {
    display: none;
}

.register-star-rating label {
    -webkit-text-fill-color: transparent;
    /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 2.3px;
    -webkit-text-stroke-color: #2b2a29;
    cursor: pointer;
}

.register-star-rating :checked~label {
    -webkit-text-fill-color: gold;
}

.register-star-rating label:hover,
.register-star-rating label:hover~label {
    -webkit-text-fill-color: #fff58c;
}

.product_inq_home {
    box-sizing: border-box;
    display: block;
    padding: 26px 20px 0 20px;
}

.product_inq_title {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: -.6px;
    color: #333;
    display: block;
}

.product_inq_title>span {
    display: inline-block;
    margin-bottom: 1px;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.6;
    letter-spacing: -.6px;
    color: #ff4a43;
    vertical-align: bottom;
}

.product_box {
    width: 100%;
    height: 90px;
    margin: 0 auto;
    border-radius: 8px;
    padding: 12px 12px 14px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-color: #f6f6f6;
    margin-bottom: 18px;
}

.product_image {
    width: 60px;
    height: 60px;
    background: #fafafa url("") center center no-repeat;
    background-size: contain;
    border-radius: 10px;
}

.product_inq_info {
    padding-left: 10px;
}

.product_inq_info>p {
    font-size: 14px;
    line-height: 1.6;
    line-height: 1.71;
    letter-spacing: -.56px;
}

.date {
    font-size: 12px;
    line-height: 1;
    letter-spacing: -.55px;
    color: #888;
}

.answer_flag {
    background-color: #eee;
    color: #231f20;
    display: inline-block;
    height: 22px;
    width: 57px;
    margin-left: 9px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -.5px;
    text-align: center;
}

.product_inq_question {
    margin-top: 30px;
    font-size: 15px;
    line-height: 1.73;
    letter-spacing: -.6px;
    color: #555;
}

.product_inq_question textarea {
    border: 1px solid #ccc;
    border-radius: 10px;
}

.product_inq_listbox {
    display: block;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 10px;
}

.product_info>p {
    font-size: 17px;
    line-height: 1.6;
    justify-content: center;
    text-align: center;
    color: black;
}

.product_info>label {
    font-size: 20px;
    line-height: 1.6;
    justify-content: center;
    text-align: center;
    color: black;
}

.product_info {
    padding-left: 10px;
    margin-bottom: 20px;
}

.post_button_box {
    margin-top: 20px;
    justify-content: center;
    padding-bottom: 10px;
}

.post_button {
    width: 98px;
    height: 32px;
    background-color: #F3CA5A;
    padding: 1px;
    border: none;
    border-radius: 10px;
    color: #fff;
    display: block;
    box-sizing: border-box;
    font-weight: 600;
    text-align: center;
    letter-spacing: -.5px;
    outline: none;
    cursor: pointer;
}
</style>
