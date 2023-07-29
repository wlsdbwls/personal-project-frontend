<template>
  <div>
    <div class="contents_box1">
      <h2 class="contents_name">{{ restaurant.restaurantName }}</h2>
    </div>
    <div class="contents_box6">
      <div class="product_info_image">
        <div class="image_box">
          <v-img :src="getS3ImageUrl(restaurant.restaurantImagesPathList[0])" :width="440" :height="400"></v-img>
        </div>

        <div class="image_gallery">
          <v-img v-for="(restaurantImagePath, idx) in slicedRestaurantImages" :key="idx"
            :src="getS3ImageUrl(restaurantImagePath)" :width="110" :height="110"
            @click="showImageModal(restaurantImagePath)"></v-img>
        </div>
        <div v-if="restaurant.restaurantImagesPathList.length > 5" class="view_more_button" @click="toggleImageGallery">
          더보기
        </div>
      </div>

      <div class="product_info_post">
        <div class="product_post_firstline">
          <p>맛집 유형</p>
          <div class="product_post_line"></div>
          <div class="restaurant_answer">
            <div>{{ restaurant.foodType }}</div>
          </div>

        </div>
        <div class="product_post_firstline">
          <p>메뉴</p>
          <div class="product_post_line"></div>
          <div class="restaurant_answer">
            <div>{{ restaurant.menuItem }}</div>
          </div>
          <p style="margin-left: 7px;"> ·········· {{ restaurant.menuPrice }}원</p>

        </div>
        <div class="product_post_firstline">
          <p>전화번호</p>
          <div class="product_post_line"></div>
          <div class="restaurant_answer">
            <div>0{{ restaurant.restaurantNumber }}</div>
          </div>

        </div>
        <div class="product_post_firstline">
          <p>영업시간</p>
          <div class="product_post_line"></div>
          <div class="restaurant_answer">
            <div>{{ restaurant.restaurantTime }}</div>
          </div>

        </div>
        <div class="product_post_firstline">
          <p>주소</p>
          <div class="product_post_line"></div>
          <div class="restaurant_answer">
            <div>{{ restaurant.restaurantAddress }}</div>
          </div>

        </div>
        <div class="product_post_firstline">
          <p>맛집 태그</p>
          <div class="product_post_line"></div>
          <div style="color:#FF00DD;" class="restaurant_answer">#{{ restaurant.restaurantInfo }}</div>
        </div>

        <div class="product_post_firstline">
          <template v-if="isLiked(restaurant.id)">
            <v-icon class="mdi mdi-heart" style="color: red;" @click.stop="toggleLike(restaurant.id)"></v-icon>
          </template>
          <template v-else>
            <v-icon class="mdi mdi-heart-outline" @click.stop="toggleLike(restaurant.id)"></v-icon>
          </template>
          <v-layout justify-center>
            <span style="color: #6E6E6E; font-size: small;">{{ likesCount }}</span>
          </v-layout>
        </div>
      </div>

      <div class="post_button_box">
        <!-- <button  class="post_delete_button"></button> -->
        <button type="button" @click="showReviewRegisterForm" value="리뷰작성" class="post_button">리뷰작성</button>
      </div>

    </div>
    <!-- 사진 클릭하면 팝업 -->
    <div v-if="showModal" class="modal">
      <span class="close" @click="closeModal">&times;</span>
      <v-img class="modal_content" :src="getS3ImageUrl(selectedGalleryImage)" :width="modalImageWidth"
        :height="modalImageHeight"></v-img>
    </div>

    <!-- 후기 등록 팝업 -->
    <v-dialog class="review_dialog" style="height: 100%; width: 100%; max-width: none; margin: 0;"
      v-model="showReviewRegisterDialog" max-width="800px">
      <v-card>
        <v-card-title style="justify-content: center;"></v-card-title>
        <v-card-text>
          <div class="review-form-container">
            <user-review-form :id="restaurant.id" @submit="submitReview" />
          </div>
        </v-card-text>
        <ul class="inq_button_box">
          <li>
            <button @click="cancelReview">취소</button>
          </li>
        </ul>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import env from '@/env'
import { mapActions } from 'vuex'
import UserReviewForm from '../review/UserReviewForm.vue'

const likeModule = 'likeModule'
const accountModule = 'accountModule'
const reviewModule = 'reviewModule'

export default {
  name: "RestaurantReadForm",
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },

  components: {
    UserReviewForm
  },

  data() {
    return {
      likedRestaurants: [],
      likesCount: 0,
      showFullGallery: false,
      showModal: false,
      selectedGalleryImage: "",
      modalImageWidth: 0,
      modalImageHeight: 0,
      showReviewRegisterDialog: false,
    }
  },

  methods: {
    ...mapActions(accountModule, ['requestAccountIdToSpring']),
    ...mapActions(reviewModule, ['requestReviewRegisterToSpring']),
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
    },

    // 사진 더보기
    toggleImageGallery() {
      this.showFullGallery = !this.showFullGallery;
      this.updateSlicedRestaurantImages();
    },

    updateSlicedRestaurantImages() {
      if (this.showFullGallery) {
        // 이미지를 모두 표시하는 경우, 첫 번째 사진을 제외한 나머지 이미지만
        this.slicedRestaurantImages = this.restaurant.restaurantImagesPathList.slice(1);
      } else {
        // 이미지를 일부만 표시하는 경우, 첫 번째부터 다섯 번째 사진까지만
        this.slicedRestaurantImages = this.restaurant.restaurantImagesPathList.slice(1, 6);
      }
    },

    // 이미지를 클릭하여 모달 팝업을 표시
    showImageModal(restaurantImagePath) {
      this.selectedGalleryImage = restaurantImagePath;
      this.modalImageWidth = 0; // 이미지 폭 초기화
      this.modalImageHeight = 0; // 이미지 높이 초기화

      // 이미지 로드를 위해 임시 Image 객체 생성
      const tempImage = new Image();
      tempImage.src = this.getS3ImageUrl(restaurantImagePath);

      // 이미지 로드 완료 후, 모달 팝업 크기 설정
      tempImage.onload = () => {
        this.modalImageWidth = tempImage.width;
        this.modalImageHeight = tempImage.height;
      };

      this.showModal = true;
    },

    // 모달 팝업을 닫기
    closeModal() {
      this.showModal = false;
    },

    async showReviewRegisterForm() {
      this.showReviewRegisterDialog = true
    },

    async submitReview(payload) {

      await this.requestReviewRegisterToSpring(payload)
      this.showReviewRegisterDialog = false
    },

    cancelReview() {
      this.showReviewRegisterDialog = false
    },
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

    // 첫 번째 사진을 제외한 나머지 사진들을 보여줄지 여부를 계산
    slicedRestaurantImages() {
      return this.showFullGallery
        ? this.restaurant.restaurantImagesPathList.slice(1)
        : this.restaurant.restaurantImagesPathList.slice(1, 5);
    },
  }
}
</script>

<style scoped>
.contents_box1 {
  text-align: center;
  justify-content: center;
}

.contents_name {
  font-size: 35px;
  text-align: center;
}

.post_button_box {
  padding-bottom: 30px;
  padding-left: 300px;
}

.post_button {
  width: 98px;
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

.product_post_line {
  border-left: 1px solid #888;
  height: 15px;
  margin-top: 3px;
  margin-left: 10px;
}

.product_info_image {
  padding-left: 170px;
  padding-right: 170px;
  align-items: flex-start;
}

.product_info_post {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.product_post_firstline {
  margin-left: 80px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 100px;
}

.product_post_firstline>p {
  font-size: 18px;
  line-height: 1.6;
  font-weight: 350;
}

.post_delete_button {
  width: 20px;
  height: 20px;
  background: url("") center center no-repeat;
  background-size: 20px;
  color: transparent;
  display: block;
  position: relative;
  top: 3px;
  left: 80px;
}

.contents_box6 div {
  box-sizing: border-box;
}


.contents_box6 {
  width: 600px;
  max-height: max-content;
  border: 1px solid #cccccc;
  margin: 0 auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.product_info {
  padding-left: 10px;
}

.product_info>p {
  font-size: 14px;
  line-height: 1.6;
}

.image_box {
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}

.image_gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  cursor: pointer;
}

.image_gallery img {
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
}

/* 더보기 버튼 스타일 */
.view_more_button {
  cursor: pointer;
  color: #DBA901;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
  text-align: right;
}

.modal {
  display: block;
  /* 보이도록 변경 */
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal_content {
  margin: auto;
  /* display: block; */
  max-width: 500px;
  max-height: 500px;
}

.close {
  color: #f1f1f1;
  position: absolute;
  top: 15px;
  right: 35px;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}

.restaurant_answer {
  margin-left: 10px;
}

.review_dialog {
  max-height: 80%;
  /* 최대 높이를 80%로 설정 */
  width: 1000px;
  /* 필요에 따라 고정 너비 설정 */
  max-width: 1000px;
  /* 최대 너비 설정 */
}

.inq_button_box {
  margin: 16px 0 8px;
  font-size: 0;
  table-layout: fixed;
  box-sizing: border-box;
  text-align: right;
  padding-bottom: 20px;
}

.inq_button_box li {
  display: inline-block;
  margin-right: 50px;
}

.inq_button_box li button {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.57;
  color: #555;
}
</style>