<template lang="">
  <div>
  <h1>맛집 상세 페이지</h1>
    <restaurant-read-form v-if="restaurant" :restaurant="restaurant" />
    <p v-else>로딩중 ...</p>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="1">
          <v-btn @click="goToRestaurantListPage">목록으로</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import RestaurantReadForm from "@/components/restaurant/RestaurantReadForm.vue";
import { mapActions, mapState } from "vuex";
import router from "@/router";

const restaurantModule = "restaurantModule";

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
  },
  computed: {
    ...mapState(restaurantModule, ["restaurant"]),
  },
  methods: {
    ...mapActions(restaurantModule, [
      "requestRestaurantToSpring",
    ]),
    goToRestaurantListPage() {
      router.push("/restaurant-list-page");
    },
  },
  created() {
    this.requestRestaurantToSpring(this.id);
  },
};
</script>

<style lang=""></style>
