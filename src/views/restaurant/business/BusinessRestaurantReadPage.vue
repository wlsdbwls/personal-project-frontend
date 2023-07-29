<template lang="">
  <div>
    <business-restaurant-read-form v-if="filteredRestaurant" :filteredRestaurant="filteredRestaurant"/>
    <p v-else>로딩중 ...</p>
      <v-container fluid>
           <div class="post_button_box">
                <input type="button"  @click="goToRestaurantModifyPage" value="수정" class="post_button">
           </div>
           <div class="post_button_box">
                <input type="button"  @click="restaurantDelete" value="삭제" class="post_button">
            </div>
            <div class="gotolist_button_box">
                <input type="button"  @click="goToMyRestaurantListPage" value="나의 맛집 목록으로" class="gotolist_button">
            </div>
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
<style>
.post_button_box {
  padding-bottom: 30px;
  padding-left: 300px;
}

.post_button {
  width: 60px;
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

.gotolist_button_box {
  padding-bottom: 30px;
  padding-left: 300px;
}

.gotolist_button {
  width: 150px;
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