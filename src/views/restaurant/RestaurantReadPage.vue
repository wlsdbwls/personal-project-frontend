<template lang="">
  <div>
  <h1>맛집 상세 페이지</h1>
    <template v-if="restaurant">
      <restaurant-read-form :restaurant="restaurant" />
      <v-container fluid>
        <v-row justify="center">
          <user-review-list-form :restaurantName="restaurant.restaurantName" :review="review" />
          <user-review-form :restaurantName="restaurant.restaurantName" @submit="submitReview"/>
        </v-row>
        <v-col justify="center">
          <v-btn class="centered-button" @click="goToRestaurantListPage">목록으로</v-btn>
        </v-col>      
      </v-container>
    </template>
    <template v-else>
      <p>로딩중 ...</p>
    </template>
  </div>
</template>

<script>
import RestaurantReadForm from "@/components/restaurant/RestaurantReadForm.vue";
import UserReviewForm from '@/components/review/UserReviewForm.vue'
import UserReviewListForm from '@/components/review/UserReviewListForm.vue'

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
    UserReviewListForm,
  },

  data() {
    return {
      // review: null,
    }
  },

  computed: {
    ...mapState(restaurantModule, ["restaurant"]),
    ...mapState(reviewModule, ["review"]),

    // handleReviewData() {
    //   return this.review
    // },
  },
  methods: {
    ...mapActions(restaurantModule, ["requestRestaurantToSpring",]),
    ...mapActions(reviewModule, ["requestReviewRegisterToSpring", 'requestReviewListToSpring', 'requestReviewToSpring']),

    goToRestaurantListPage() {
      router.push("/restaurant-list-page");
    },

    async submitReview(payload) {
      await this.requestReviewRegisterToSpring(payload)

      // Todo: 후기 작성 후 초기화
      // this.$refs.userReviewForm.comment = "";
      // this.$refs.userReviewForm.ratings = "";
    },
  },

  async created() {
    await this.requestRestaurantToSpring(this.id)
    await this.requestReviewListToSpring({ restaurantName: this.restaurant.restaurantName });
  }
}
</script>

<style scoped>
.centered-button {
  margin: 0 auto;
  margin-top: 20px;
}
</style>