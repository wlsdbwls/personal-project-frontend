<template>
    <div class="">
        <form @submit.prevent="submitReview">
            <label>후기를 수정해 주세요!</label>
            <!-- 재방문 의사 있어요 - 없어요 표시하기 -->
            <div>
                <label style="margin-top: 20px;">평점:</label>

            </div>
            <div class="modify-rating space-x-4 mx-auto">
                <input type="radio" id="5-stars" name="rating" value="5" v-model="ratings" />
                <label for="5-stars" class="star pr-4">★</label>
                <input type="radio" id="4-stars" name="rating" value="4" v-model="ratings" />
                <label for="4-stars" class="star">★</label>
                <input type="radio" id="3-stars" name="rating" value="3" v-model="ratings" />
                <label for="3-stars" class="star">★</label>
                <input type="radio" id="2-stars" name="rating" value="2" v-model="ratings" />
                <label for="2-stars" class="star">★</label>
                <input type="radio" id="1-star" name="rating" value="1" v-model="ratings" />
                <label for="1-star" class="star">★</label>
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
        </form>
        <v-btn raised type="button" @click="submitReview">저장</v-btn>
    </div>
</template>

<script>
import { mapState } from 'vuex'

const reviewModule = 'reviewModule'

export default {
    data() {
        return {
            id: null,
            // 리뷰 수정을 위해 기존 리뷰 데이터를 수정할 수 있도록 데이터를 담는 객체 추가
            comment: '',
            ratings: '',
            userToken: '',

        };
    },

    methods: {
        submitReview() {
            const { id, comment, ratings, userToken } = this

            console.log('수정한 점수: ', ratings, '수정한 코멘트: ', comment)

            this.$emit("submit", { id, comment, ratings, userToken })
        },
    },

    created() {
        this.userToken = localStorage.getItem("userToken")
        this.id = this.review.id
        this.comment = this.review.comment
        this.ratings = this.review.ratings
    },

    computed: {
        ...mapState(reviewModule, ["review"])
    },
}
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

.writeValue {
    border: 1px solid #dddddd;
}

/* .modify-ratings {
    color: #aaa9a9;
    position: relative;
    unicode-bidi: bidi-override;
    width: max-content;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1.3px;
    -webkit-text-stroke-color: #2b2a29;
}

.modify-ratings-fill {
    color: #fff58c;
    padding: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    top: 0;
    left: 0;
    overflow: hidden;
    -webkit-text-fill-color: gold;
}

.modify-ratings-base {
    z-index: 0;
    padding: 0;
} */

.modify-rating {
    display: flex;
    flex-direction: row-reverse;
    font-size: 2.25rem;
    line-height: 2.5rem;
    justify-content: space-around;
    padding: 0 0.2em;
    text-align: center;
    width: 5em;
}

.modify-rating input {
    display: none;
}

.modify-rating label {
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2.3px;
    -webkit-text-stroke-color: #2b2a29;
    cursor: pointer;
}

.modify-rating :checked~label {
    -webkit-text-fill-color: gold;
}

.modify-rating label:hover,
.modify-rating label:hover~label {
    -webkit-text-fill-color: #fff58c;
}
</style>
