<template>
  <v-container>
    <v-layout column align-center>
      <v-flex>
        <v-card align="center" height="600px" width="700px">
          <v-carousel>
            <v-carousel-item v-for="(restaurantImagePath, idx) in restaurant.restaurantImagesPathList" :key="idx"
              :width="550" :heigth="550">
              <v-img :src="require(`@/assets/uploadImgs/${restaurantImagePath}`)">
              </v-img>
            </v-carousel-item>
          </v-carousel>
          <v-card-text>
            <div>상호명 - {{ restaurant.restaurantName }}</div>
            <div>맛집 상세 정보 - {{ restaurant.restaurantInfo }}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "RestaurantReadForm",
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="">
</style>