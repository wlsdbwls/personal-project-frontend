<template lang="">
  <div>
    <h1>사업자용 상세 페이지 - 삭제/수정 가능</h1>
    <business-restaurant-read-form v-if="filteredRestaurant" :filteredRestaurant="filteredRestaurant"/>
    <p v-else>로딩중 ...</p>
      <v-container fluid>
        <v-row justify="center">
        <v-col cols="auto">
          <v-btn @click="goToRestaurantModifyPage">수정</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="restaurantDelete">삭제</v-btn>
        </v-col>
      </v-row>
        <v-row justify="center">
          <v-col justify="center">
           <v-btn @click="goToMyRestaurantListPage">나의 맛집 목록으로</v-btn>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>

import BusinessRestaurantReadForm from '@/components/restaurant/business/BusinessRestaurantReadForm.vue'
import { mapActions, mapState } from "vuex";
import router from "@/router";

const restaurantModule = 'restaurantModule'

export default {
  name: "BusinessRestaurantReadPage",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    BusinessRestaurantReadForm
  },
  computed: {
    ...mapState(restaurantModule, ["filteredRestaurant"]),

  },
  methods: {
    ...mapActions(restaurantModule, ["requestBusinessRestaurantToSpring", "requestDeleteRestaurantToSpring"]),
    goToMyRestaurantListPage() {
      router.push("/business-registered-restaurant");
    },
    goToRestaurantModifyPage() {
      this.$router.push({ name: "RestaurantModifyPage", params: { id: this.id } });
    },
    async restaurantDelete() {
      if (!confirm("맛집을 삭제하시겠습니까?")) {
      } else {
        await alert("등록하신 맛집이 삭제되었습니다.");
        await this.requestDeleteRestaurantToSpring(this.id);
        await this.goToMyRestaurantListPage();
      }
    },
  },
  created() {
    this.requestBusinessRestaurantToSpring(this.id)
    console.log(this.id)
  },
}
</script>
<style lang="">
    
</style>