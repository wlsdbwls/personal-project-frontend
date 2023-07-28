<template>
    <div>
        <div class="contents_box1">
            <h2 class="contents_name">{{ filteredRestaurant.restaurantName }}</h2>
        </div>
        <div class="contents_box6">
            <div class="product_info_image">
                <div class="image_box">
                    <v-img :src="getS3ImageUrl(filteredRestaurant.restaurantImagesPathList[0])" :width="440"
                        :height="400"></v-img>
                </div>

                <div class="image_gallery">
                    <v-img v-for="(restaurantImagePath, idx) in slicedRestaurantImages" :key="idx"
                        :src="getS3ImageUrl(restaurantImagePath)" :width="110" :height="110"
                        @click="showImageModal(restaurantImagePath)"></v-img>
                </div>
                <div v-if="filteredRestaurant.restaurantImagesPathList.length > 5" class="view_more_button"
                    @click="toggleImageGallery">
                    더보기
                </div>
            </div>

            <div class="product_info_post">
                <div class="product_post_firstline">
                    <p>맛집 유형</p>
                    <div class="product_post_line"></div>
                    <div class="restaurant_answer">
                        <div>{{ filteredRestaurant.foodType }}</div>
                    </div>

                </div>
                <div class="product_post_firstline">
                    <p>메뉴</p>
                    <div class="product_post_line"></div>
                    <div class="restaurant_answer">
                        <div>{{ filteredRestaurant.menuItem }}</div>
                    </div>
                    <p style="margin-left: 7px;"> ·········· {{ filteredRestaurant.menuPrice }}원</p>

                </div>
                <div class="product_post_firstline">
                    <p>전화번호</p>
                    <div class="product_post_line"></div>
                    <div class="restaurant_answer">
                        <div>0{{ filteredRestaurant.restaurantNumber }}</div>
                    </div>

                </div>
                <div class="product_post_firstline">
                    <p>영업시간</p>
                    <div class="product_post_line"></div>
                    <div class="restaurant_answer">
                        <div>{{ filteredRestaurant.restaurantTime }}</div>
                    </div>

                </div>
                <div class="product_post_firstline">
                    <p>주소</p>
                    <div class="product_post_line"></div>
                    <div class="restaurant_answer">
                        <div>{{ filteredRestaurant.restaurantAddress }}</div>
                    </div>

                </div>
                <div class="product_post_firstline">
                    <p>맛집 태그</p>
                    <div class="product_post_line"></div>
                    <div style="color:#FF00DD;" class="restaurant_answer">#{{ filteredRestaurant.restaurantInfo }}</div>
                </div>

                <div class="product_post_firstline">
                    <template>
                        <v-icon class="mdi mdi-heart" style="color: red;"></v-icon>
                    </template>
                    <v-layout justify-center>
                        <span style="color: #6E6E6E; font-size: small;">{{ likesCount }}</span>
                    </v-layout>
                </div>
            </div>

        </div>
        <!-- 사진 클릭하면 팝업 -->
        <div v-if="showModal" class="modal">
            <span class="close" @click="closeModal">&times;</span>
            <v-img class="modal_content" :src="getS3ImageUrl(selectedGalleryImage)" :width="modalImageWidth"
                :height="modalImageHeight"></v-img>
        </div>
    </div>
</template>


<script>
import env from '@/env'
import { mapActions } from 'vuex'

const likeModule = 'likeModule'

export default {
    name: "BusinessRestaurantReadForm",
    props: {
        filteredRestaurant: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            likesCount: 0,
            showModal: false,
            showFullGallery: false,
            selectedGalleryImage: "",
            modalImageWidth: 0,
            modalImageHeight: 0,
        }
    },
    methods: {
        ...mapActions(likeModule, ['requestLikesCountToSpring']),
        getS3ImageUrl(imageKey) {
            const bucketRegion = env.api.MAIN_AWS_BUCKET_REGION
            const bucketName = env.api.MAIN_AWS_BUCKET_NAME

            return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageKey}`;
        },

        toggleImageGallery() {
            this.showFullGallery = !this.showFullGallery;
            this.updateSlicedRestaurantImages();
        },

        updateSlicedRestaurantImages() {
            if (this.showFullGallery) {
                // 이미지를 모두 표시하는 경우, 첫 번째 사진을 제외한 나머지 이미지만
                this.slicedRestaurantImages = this.filteredRestaurant.restaurantImagesPathList.slice(1);
            } else {
                // 이미지를 일부만 표시하는 경우, 첫 번째부터 다섯 번째 사진까지만
                this.slicedRestaurantImages = this.filteredRestaurant.restaurantImagesPathList.slice(1, 6);
            }
        },

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
    },

    computed: {
        slicedRestaurantImages() {
            return this.showFullGallery
                ? this.filteredRestaurant.restaurantImagesPathList.slice(1)
                : this.filteredRestaurant.restaurantImagesPathList.slice(1, 5);
        },
    },

    async updated() {
        const restaurantId = this.filteredRestaurant.id
        this.likesCount = await this.requestLikesCountToSpring(restaurantId)
    },
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
</style>