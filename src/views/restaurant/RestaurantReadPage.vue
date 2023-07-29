<template lang="">
  <div>
    <template v-if="restaurant">
      <restaurant-read-form :restaurant="restaurant" />
      <v-container fluid>
        <v-row justify="center">
          <user-review-list-form class="review-list" :id="restaurant.id" :review="review"/>
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
import UserReviewListForm from '@/components/review/UserReviewListForm.vue'

import { mapActions, mapState } from "vuex"
import router from "@/router"

const restaurantModule = "restaurantModule"
const reviewModule = 'reviewModule'
const accountModule = 'accountModule'

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
    UserReviewListForm,
  },

  data() {
    return {
      restaurantId: '',
    }
  },

  computed: {
    ...mapState(restaurantModule, ["restaurant"]),
    ...mapState(reviewModule, ["review"]),
    // ...mapState(accountModule, ["account"]),
  },
  methods: {
    ...mapActions(restaurantModule, ["requestRestaurantToSpring",]),
    // ...mapActions(accountModule, ["requestAccountToSpring",]),
    ...mapActions(reviewModule, ['requestReviewListToSpring']),

    goToRestaurantListPage() {
      router.push("/restaurant-list-page");
    },
  },

  async created() {
    await this.requestRestaurantToSpring(this.id)
    await this.requestReviewListToSpring({ restaurantId: this.id });
    // await this.requestAccountToSpring({ userToken: this.userToken })
  }
}
</script>

<style scoped>
.centered-button {
  margin: 0 auto;
  margin-top: 20px;
  margin-left: 500px;
}
</style>