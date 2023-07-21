<template>
    <v-container grid-list-xl>
        <h2>사용자 리뷰</h2>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 xl2 v-for="item in Reviews" :key="item.id">
                <v-card @click="handleCellClick(item)">
                    <!-- <v-img :src="getS3ImageUrl(item.restaurantImagePath)"></v-img> -->
                    <v-card-text>
                        <div>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <div class="menu-icon">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </div>
                                </template>
                                <v-list style="width: 85px; height: 122px;">
                                    <v-list-item style="margin-top: -10px;" @click="handleShare(item)">
                                        <v-list-item-icon>
                                            <v-icon small>mdi-share</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content
                                            style="font-size: 13px; margin-left: -30px;">공유</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item style="margin-top: -10px;" @click="openModifyDialog(item)">
                                        <v-list-item-icon>
                                            <v-icon small>mdi-pencil</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content
                                            style="font-size: 13px; margin-left: -30px;">수정</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item style="margin-top: -10px;" @click="handleDelete(item)">
                                        <v-list-item-icon>
                                            <v-icon small>mdi-delete</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content
                                            style="font-size: 13px; margin-left: -30px;">삭제</v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                            <div class="list-star-rating space-x-4 mx-auto">
                                <label v-for="star in 5" :key="star" class="star"
                                    :style="{ color: star <= item.ratings ? 'gold' : 'white' }">★</label>
                            </div>
                        </div>
                        <v-divider />
                        <p></p>
                        <div>{{ item.comment }}</div>
                    </v-card-text>

                    <!-- <div v-else>
                        <v-card-actions>
                            <v-btn @click="handleShare(item)">공유</v-btn>
                            <v-btn @click="handleReport(item)">신고</v-btn>
                        </v-card-actions>
                    </div> -->
                </v-card>
            </v-flex>
        </v-layout>

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
            modifiedReview: null
        }
    },

    methods: {
        ...mapActions(reviewModule, ["requestModifyReviewToSpring",]),
        ...mapActions(reviewModule, ["requestReviewToSpring",]),
        ...mapActions(reviewModule, ["requestDeleteReviewToSpring",]),

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
            this.id = item.id;
            this.registeredReview = await this.requestReviewToSpring(this.id);

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
            this.id = item.id;
            this.modifiedReview = await this.requestDeleteReviewToSpring(this.id);
        }
    },

    computed: {
        ...mapState(reviewModule, ['reviews']),
        ...mapState(reviewModule, ['review']),
        Reviews() {
            return this.reviews
        }
    },

    created() {
        this.userToken = localStorage.getItem("userToken")
    },
}
</script>

<style >
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
