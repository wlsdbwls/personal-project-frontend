<template lang="">
  <div>
  <h1>맛집 상세 페이지</h1>
    <template v-if="restaurant">
          <restaurant-read-form :restaurant="restaurant" />
        </template>
        <template v-else>
          <p>로딩중 ...</p>
        </template>
    <v-container fluid>
      <v-row justify="center">
        <user-review-form :restaurantName="restaurant.restaurantName" @submit="submitReview"/>
      </v-row>
      <!-- 후기 등록 폼 아래에 등록된 후기들 나열 -->
      <v-col justify="center">
        <v-btn class="centered-button" @click="goToRestaurantListPage">목록으로</v-btn>
      </v-col>      
    </v-container>
  </div>
</template>

<script>
import RestaurantReadForm from "@/components/restaurant/RestaurantReadForm.vue";
import UserReviewForm from '@/components/review/UserReviewForm.vue'

import { mapActions, mapState } from "vuex"
import router from "@/router"

const restaurantModule = "restaurantModule"
const reviewModule = 'reviewModule'

export default {
  name: "RestaurantReadPage",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  components: {
    RestaurantReadForm,
    UserReviewForm,
  },

  computed: {
    ...mapState(restaurantModule, ["restaurant"]),
    // ...mapState(reviewModule, ["review"]),
  },
  methods: {
    ...mapActions(restaurantModule, [
      "requestRestaurantToSpring",
    ]),
    ...mapActions(reviewModule, [
      "requestRestaurantReviewToSpring",
    ]),

    goToRestaurantListPage() {
      router.push("/restaurant-list-page");
    },

    async submitReview(payload) {
      await this.requestRestaurantReviewToSpring(payload)

      // 후기 작성 후 초기화
      // this.$refs.userReviewForm.comment = "";
      // this.$refs.userReviewForm.ratings = "";
    },
  },

  async created() {
    await this.requestRestaurantToSpring(this.id)
  }
}
</script>

<style scoped>
.centered-button {
  margin: 0 auto;
  margin-top: 20px;
}
</style>