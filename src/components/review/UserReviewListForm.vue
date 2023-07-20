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
                                <v-list style="width: 100px">
                                    <v-list-item @click="handleShare(item)">
                                        <v-list-item-icon>
                                            <v-icon small>mdi-share</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content
                                            style="font-size: 13px; margin-left: -20px;">공유</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item @click="handleModify(item)">
                                        <v-list-item-icon>
                                            <v-icon small>mdi-pencil</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content
                                            style="font-size: 13px; margin-left: -20px;">수정</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item @click="handleDelete(item)">
                                        <v-list-item-icon>
                                            <v-icon small>mdi-delete</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content
                                            style="font-size: 13px; margin-left: -20px;">삭제</v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                            <div class="star-rating space-x-4 mx-auto">
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
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
// import env from '@/env'

const reviewModule = 'reviewModule'

export default {
    data() {
        return {
            id: null,
        }
    },

    methods: {
        handleCellClick(item) {
            this.id = item.id // id 값을 설정
            this.$router.push({ name: 'UserReviewReadPage', params: { id: item.id } })
            console.log(this.id) // 설정된 id 값 확인
        },

        // getS3ImageUrl(imageKey) {
        //     const bucketRegion = env.api.MAIN_AWS_BUCKET_REGION
        //     const bucketName = env.api.MAIN_AWS_BUCKET_NAME

        //     return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageKey}`;
        // }
    },

    computed: {
        ...mapState(reviewModule, ['reviews']),
        Reviews() {
            return this.reviews
        }
    }
};
</script>

<style scoped>
.star-rating {
    display: flex;
    font-size: 1.5rem;
    line-height: 2.5rem;
    width: 5em;
}

.star-rating label {
    /* -webkit-text-fill-color: transparent; */
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: #2b2a29;
}

.menu-icon {
    position: absolute;
    right: 0;
}
</style>
