<template>
    <div class="room-deal-information-container">
        <h2>후기 작성 폼</h2>
        <form @submit.prevent="submitReview">
            <div>
                <label for="name">{{ email }}님, {{ restaurantName }}에서 즐거운 식사하셨나요? </label>
                <span>후기를 작성해 주세요!</span>
                <!-- 일단 이메일로 설정 후 닉네임으로 수정할 것 -->
                <!-- 재방문 의사 있어요 - 없어요 표시하기 -->
            </div>
            <div>
                <label style="margin-top: 20px;">평점:</label>
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
            </div>

            <!-- 이미지 추가하기 -->
            <!-- <div>
                <label for="image">이미지 첨부</label>
                <input type="file">
            </div> -->
            <div>
                <label style="margin-top: 20px;" for="comment">후기:</label>
                <textarea style="height: 100px; width: 500px;" class="writeValue" id="comment" v-model="comment"
                    required></textarea>
            </div>
            <v-btn raised type="submit">후기 등록</v-btn>
        </form>
    </div>
</template>

<script>

import { mapActions } from "vuex"

const accountModule = 'accountModule'

export default {
    props: {
        restaurantName: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            email: '',
            userToken: '',
            comment: '',
            ratings: '',
        }
    },
    methods: {
        submitReview() {
            const { comment, ratings, userToken, restaurantName } = this
            console.log('내가 준 점수:', this.ratings, '내가 준 후기 코멘트:', this.comment)

            this.$emit('submit', { comment, ratings, userToken, restaurantName })
        },

        ratingToPercent() {
            const score = +this.restaurant.averageScore * 20;
            return score + 1.5;
        },

        ...mapActions(accountModule, [
            "requestEmailToSpring",
        ]),
    },

    created() {
        this.userToken = localStorage.getItem("userToken");
    },

    async mounted() {
        this.email = await this.requestEmailToSpring({ userToken: this.userToken })
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
    margin-top: 30px;
    color: #222222;
    border: 1px solid #dddddd;
    width: 700px;
    height: 450px;
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
</style>
