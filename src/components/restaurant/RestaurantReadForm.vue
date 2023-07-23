<template>
  <v-container>
    <v-layout column align-center>
      <v-flex>
        <v-card align="center" height="635px" width="700px">
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
              @click="toggleLike(restaurant.id)"></v-icon>
          </v-card-actions>
          <v-layout justify-center style="margin-top: -9px;">
            <span style="color: #6E6E6E; font-size: small;">{{ likesCount }}</span>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import env from '@/env'
import { mapActions } from 'vuex'

const likeModule = 'likeModule'
const accountModule = 'accountModule'

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
      likesCount: 0,
    }
  },

  methods: {
    ...mapActions(accountModule, ['requestAccountIdToSpring']),
    ...mapActions(likeModule, ['requestLikeRestaurantToSpring',
      'requestUnlikeRestaurantToSpring', 'requestLikesCountToSpring']),

    async toggleLike(restaurantId) {
      if (this.isLiked(restaurantId)) {
        await this.requestUnlikeRestaurantToSpring(restaurantId)

        const likedRestaurants = this.getLikedRestaurants()
        const updatedLikedRestaurants = likedRestaurants.filter((id) => id !== restaurantId)
        this.saveLikedRestaurants(updatedLikedRestaurants)

        this.likedRestaurants = updatedLikedRestaurants

      } else {
        await this.requestLikeRestaurantToSpring({ userToken: this.userToken, restaurantId })

        const likedRestaurants = this.getLikedRestaurants()
        likedRestaurants.push(restaurantId)
        this.saveLikedRestaurants(likedRestaurants)

        this.likedRestaurants = likedRestaurants
      }
    },

    getLikedRestaurants() {
      const accountId = localStorage.getItem('accountId')
      const likedRestaurants = localStorage.getItem(`likedRestaurants_${accountId}`)
      return likedRestaurants ? JSON.parse(likedRestaurants) : []
    },

    saveLikedRestaurants(likedRestaurants) {
      const accountId = localStorage.getItem('accountId')
      localStorage.setItem(`likedRestaurants_${accountId}`, JSON.stringify(likedRestaurants))
    },

    getS3ImageUrl(imageKey) {
      const bucketRegion = env.api.MAIN_AWS_BUCKET_REGION
      const bucketName = env.api.MAIN_AWS_BUCKET_NAME

      return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageKey}`;
    }
  },

  async mounted() {
    this.userToken = localStorage.getItem('userToken')
    this.likedRestaurants = await this.getLikedRestaurants()
  },

  async updated() {
    const restaurantId = this.restaurant.id
    this.likesCount = await this.requestLikesCountToSpring(restaurantId)
  },

  computed: {
    isLiked() {
      return (restaurantId) => {
        const accountId = localStorage.getItem('accountId')
        const likedRestaurants = JSON.parse(localStorage.getItem(`likedRestaurants_${accountId}`)) || []
        return Array.isArray(likedRestaurants) && likedRestaurants.includes(restaurantId)
      }
    },
  }
}
</script>

<style lang="">
</style>