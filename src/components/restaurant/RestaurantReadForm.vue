<template>
  <v-container>
    <v-layout column align-center>
      <v-flex>
        <v-card align="center" height="615px" width="700px">
          <v-carousel>
            <v-carousel-item v-for="(restaurantImagePath, idx) in restaurant.restaurantImagesPathList" :key="idx"
              :width="550" :heigth="550">
              <v-img :src="getS3ImageUrl(restaurantImagePath)"></v-img>
            </v-carousel-item>
          </v-carousel>
          <v-card-text>
            <div>상호명 - {{ restaurant.restaurantName }}</div>
            <div>맛집 상세 정보 - {{ restaurant.restaurantInfo }}</div>
          </v-card-text>
          <v-divider />
          <v-card-actions class="justify-center">
            <v-icon :class="isLiked(restaurant.id) ? 'mdi mdi-heart red--text' : 'mdi mdi-heart-outline'"
              @click.stop="toggleLike(restaurant.id)"></v-icon>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import env from '@/env'

export default {
  name: "RestaurantReadForm",
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      likedRestaurants: [],
    };
  },

  mounted() {
    // 로컬 스토리지에서 찜한 음식점 목록 가져오기
    const userLikedRestaurants = localStorage.getItem('likedRestaurants');
    if (userLikedRestaurants) {
      this.likedRestaurants = JSON.parse(userLikedRestaurants);
    }
  },

  methods: {
    // 음식점이 찜되었는지 확인
    isLiked(restaurantId) {
      return this.likedRestaurants.includes(restaurantId);
    },

    toggleLike(restaurantId) {
      if (this.isLiked(restaurantId)) {
        // 이미 찜되어 있으면 likedRestaurants 배열에서 제거
        const index = this.likedRestaurants.indexOf(restaurantId);
        this.likedRestaurants.splice(index, 1);
      } else {
        // 찜되어 있지 않으면 likedRestaurants 배열에 추가
        this.likedRestaurants.push(restaurantId);
      }

      // localStorage에 찜한 음식점 ID 저장
      localStorage.setItem('likedRestaurants', JSON.stringify(this.likedRestaurants));
    },

    getS3ImageUrl(imageKey) {
      const bucketRegion = env.api.MAIN_AWS_BUCKET_REGION
      const bucketName = env.api.MAIN_AWS_BUCKET_NAME

      return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageKey}`;
    }
  },
};
</script>

<style lang="">
</style>