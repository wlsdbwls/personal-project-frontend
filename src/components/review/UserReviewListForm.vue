<template>
    <v-container grid-list-xl>
        <div style="margin-top:50px;" class="contents_box1">
            <h2 class="contents_name">사용자 리뷰</h2>
        </div>
        <div class="user_review_list">
            <v-layout row wrap class="user_review">
                <v-row>
                    <v-flex xs12 sm6 md4 lg3 xl2 v-for="item in Reviews" :key="item.id">
                        <v-card @click="handleCellClick(item)">
                            <!-- <v-img :src="getS3ImageUrl(item.restaurantImagePath)"></v-img> -->
                            <v-card-text>
                                <div>
                                    <v-menu offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <div class="menu-icon">
                                                <v-btn icon v-bind="attrs" v-on="on" @click="handleMenuClick(item)">
                                                    <v-icon>mdi-dots-vertical</v-icon>
                                                </v-btn>
                                            </div>
                                        </template>
                                        <div v-if="isMyAccount === true">
                                            <v-list>
                                                <v-list-item @click="handleShare(item)">
                                                    <v-list-item-icon>
                                                        <v-icon small>mdi-share</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content style="font-size: 13px;">공유</v-list-item-content>
                                                </v-list-item>
                                                <v-list-item @click="openModifyDialog(item)">
                                                    <v-list-item-icon>
                                                        <v-icon small>mdi-pencil</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content style="font-size: 13px;">수정</v-list-item-content>
                                                </v-list-item>
                                                <v-list-item @click="handleDelete(item)">
                                                    <v-list-item-icon>
                                                        <v-icon small>mdi-delete</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content style="font-size: 13px;">삭제</v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                        </div>
                                        <div v-if="isMyAccount === false">
                                            <v-list>
                                                <v-list-item @click=" handleShare(item)">
                                                    <v-list-item-icon>
                                                        <v-icon small>mdi-share</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content style="font-size: 13px;">공유</v-list-item-content>
                                                </v-list-item>
                                                <v-list-item @click="openModifyDialog(item)">
                                                    <v-list-item-icon>
                                                        <v-icon small>mdi-pencil</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content style="font-size: 13px;">신고</v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                        </div>
                                    </v-menu>
                                    <div class="list-star-rating space-x-4 mx-auto">
                                        <label v-for="star in 5" :key="star" class="star"
                                            :style="{ color: star <= item.ratings ? 'gold' : 'white' }">★</label>
                                    </div>
                                </div>
                                <v-divider />
                                <div style="margin-top:10px">{{ item.comment }}</div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-row>
            </v-layout>
        </div>

        <!-- 수정용 팝업 -->
        <v-dialog v-model="showModifyDialog" max-width="800px">
            <v-card>
                <v-card-title style="justify-content: center;">
                    <div class="headline">후기 수정 팝업</div>
                </v-card-title>
                <v-card-text>
                    <user-review-modify-form v-if="showModifyDialog" :review="modifiedReview" @submit="submitReview" />
                </v-card-text>
                <v-card-actions style="justify-content: center;">
                    <v-btn @click="cancelModify">취소</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import env from '@/env'

import UserReviewModifyForm from '@/components/review/UserReviewModifyForm.vue'

const reviewModule = 'reviewModule'
const accountModule = 'accountModule'

export default {
    components: {
        UserReviewModifyForm,
    },

    data() {
        return {
            id: null,
            showModifyDialog: false,
            userToken: '',
            registeredReview: null,
            modifiedReview: null,
            isMyAccount: false,
        }
    },

    methods: {
        ...mapActions(reviewModule, ["requestModifyReviewToSpring", "requestReviewToSpring", "requestDeleteReviewToSpring"]),

        handleCellClick(item) {
            this.id = item.id
            console.log(this.id)
        },

        // getS3ImageUrl(imageKey) {
        //     const bucketRegion = env.api.MAIN_AWS_BUCKET_REGION
        //     const bucketName = env.api.MAIN_AWS_BUCKET_NAME

        //     return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageKey}`;
        // },

        async openModifyDialog(item) {
            this.id = item.id
            this.registeredReview = await this.requestReviewToSpring(this.id)
            console.log(this.registeredReview)

            this.showModifyDialog = true;
        },

        cancelModify() {
            this.showModifyDialog = false
        },

        async submitReview(payload) {

            await this.requestModifyReviewToSpring(payload)
            this.showModifyDialog = false
        },

        async handleDelete(item) {
            this.id = item.id
            this.modifiedReview = await this.requestDeleteReviewToSpring(this.id)
        },

        // async handleMenuClick(item) {
        //     await this.requestReviewToSpring(item.id)
        //     console.log("후기 등록한 accountId: " + item.accountId);
        // },

        handleMenuClick(item) {
            this.requestReviewToSpring(item.id)
                .then((reviewData) => {
                    console.log("후기 등록한 accountId: " + reviewData.accountId);
                    console.log("로그인한 accountId: " + this.accountId)
                    this.isMyAccount = reviewData.accountId == this.accountId;
                })
                .catch(() => {
                    console.error("후기 읽기 실패!");
                });
        },

    },

    computed: {
        ...mapState(reviewModule, ['reviews']),
        ...mapState(reviewModule, ['review']),

        Reviews() {
            return this.reviews
        },

        accountId() {
            return localStorage.getItem('accountId');
        },
    },

    async created() {
        this.userToken = localStorage.getItem("userToken")
    },
}
</script>

<style >
.user_review_list {
    margin-top: 30px;
}

.user_review {
    display: flex;
}

.list-star-rating {
    display: flex;
    font-size: 1.5rem;
    line-height: 2.5rem;
    width: 5em;
}

.list-star-rating label {
    /* -webkit-text-fill-color: transparent; */
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: #2b2a29;
}

.menu-icon {
    position: absolute;
    right: 0;
}
</style>
