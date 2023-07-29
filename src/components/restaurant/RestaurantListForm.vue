<template>
    <v-container grid-list-xl>
        <div class="contents_box1">
            <!-- 글꼴 나중에 꾸미기 -->
            <h2 class="contents_name">맛있는 발자취!</h2>
        </div>
        <div class="restaurant_list_wrap">
            <v-layout row wrap>
                <v-row>
                    <template v-for="item in findRestaurant">
                        <v-flex xs12 sm6 md4 lg3 xl2>
                            <v-card @click="handleCellClick(item)">
                                <div class="restaurant-image-container" v-if="item.restaurantImagePath">
                                    <v-img :src="getS3ImageUrl(item.restaurantImagePath)" aspect-ratio="1"
                                        class="restaurant-image"></v-img>
                                </div>
                                <div v-else class="no-image-text">
                                    <v-img style="margin-top: 118px; margin-bottom: -118px;"
                                        :src="'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs'">이미지가 등록되지
                                        않았습니다</v-img>
                                </div>
                                <v-card-text>
                                    <div style="text-align: center; font-size: medium; font-weight: bold;
                            color: black;">{{ item.restaurantName }}
                                    </div>
                                </v-card-text>
                                <v-divider />
                                <v-card-actions>
                                    <v-spacer />
                                    <div class="heart-icon-container">
                                        <template v-if="isLiked(item.id)">
                                            <v-icon class="mdi mdi-heart" style="color: red;"
                                                @click.stop="toggleLike(item.id)"></v-icon>
                                        </template>
                                        <template v-else>
                                            <v-icon class="mdi mdi-heart-outline"
                                                @click.stop="toggleLike(item.id)"></v-icon>
                                        </template>
                                    </div>
                                    <div class="star-rating">
                                        <label class="star" style="color: gold;">★ </label>
                                        <span style="font-size: 15px; color: #6E6E6E;">{{ getAverageRatings(item.id)
                                        }}</span>
                                    </div>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </template>
                </v-row>
            </v-layout>
        </div>
        <!-- <div>
            <input type="text" :value="searchTerm" @change="searchTerm = $event.target.value" placeholder="상호명을 입력하세요" />
            <v-btn :small="true" raised @click="findRestaurant">검색</v-btn>
        </div> -->
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import env from '@/env'

const restaurantModule = 'restaurantModule'
const likeModule = 'likeModule'
const accountModule = 'accountModule'
const reviewModule = 'reviewModule'

export default {
    data() {
        return {
            userToken: '',
            searchTerm: '',
            id: null,
            likedRestaurants: [],
            restaurantAverageRatings: {},
        }
    },

    methods: {
        ...mapActions(restaurantModule, ['requestRestaurantListToSpring']),
        ...mapActions(accountModule, ['requestAccountIdToSpring']),
        ...mapActions(likeModule, ['requestLikeRestaurantToSpring',
            'requestUnlikeRestaurantToSpring']),
        ...mapActions(reviewModule, ['requestAverageRatingsToSpring']),

        // 게시물 클릭
        async handleCellClick(item) {
            this.id = item.id
            await this.$router.push({ name: 'RestaurantReadPage', params: { id: item.id } });
            console.log('restaurantId: ' + this.id)
        },

        // 찜 기능
        async toggleLike(restaurantId) {
            if (this.isLiked(restaurantId)) {
                await this.requestUnlikeRestaurantToSpring(restaurantId);

                const likedRestaurants = this.getLikedRestaurants();
                const updatedLikedRestaurants = likedRestaurants.filter((id) => id !== restaurantId);
                this.saveLikedRestaurants(updatedLikedRestaurants);

                this.likedRestaurants = updatedLikedRestaurants;

            } else {
                await this.requestLikeRestaurantToSpring({ userToken: this.userToken, restaurantId });

                const likedRestaurants = this.getLikedRestaurants();
                likedRestaurants.push(restaurantId);
                this.saveLikedRestaurants(likedRestaurants);

                this.likedRestaurants = likedRestaurants;
            }
        },

        getLikedRestaurants() {
            const accountId = localStorage.getItem('accountId')
            const likedRestaurants = localStorage.getItem(`likedRestaurants_${accountId}`)
            return likedRestaurants ? JSON.parse(likedRestaurants) : [];
        },

        saveLikedRestaurants(likedRestaurants) {
            const accountId = localStorage.getItem('accountId')
            localStorage.setItem(`likedRestaurants_${accountId}`, JSON.stringify(likedRestaurants));
        },

        // 이미지 가져오기
        getS3ImageUrl(imageKey) {
            const bucketRegion = env.api.MAIN_AWS_BUCKET_REGION
            const bucketName = env.api.MAIN_AWS_BUCKET_NAME

            return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageKey}`
        },

        // 평균 평점 가져오기
        async fetchAverageRatings() {
            for (const restaurant of this.restaurants) {
                const restaurantId = restaurant.id
                const averageRatings = await this.requestAverageRatingsToSpring(restaurantId)
                this.setAverageRatings(restaurantId, averageRatings)
            }
        },

        setAverageRatings(restaurantId, averageRatings) {
            this.$set(this.restaurantAverageRatings, restaurantId, averageRatings);
        },

        getAverageRatings(restaurantId) {
            return this.restaurantAverageRatings[restaurantId] || 0
        },
    },

    async mounted() {
        await this.requestRestaurantListToSpring()

        this.userToken = localStorage.getItem('userToken')
        await this.requestAccountIdToSpring({ userToken: this.userToken })

        await this.fetchAverageRatings()
    },

    computed: {
        ...mapState(restaurantModule, ['restaurants']),
        findRestaurant() {
            // const restaurants = this.restaurants.filter((restaurant) =>
            //     restaurant.restaurantName.toLowerCase().includes(this.searchTerm.toLowerCase())
            // )
            return this.restaurants
        },

        isLiked() {
            return (restaurantId) => {
                const accountId = localStorage.getItem('accountId');
                const likedRestaurants = JSON.parse(localStorage.getItem(`likedRestaurants_${accountId}`)) || [];
                return Array.isArray(likedRestaurants) && likedRestaurants.includes(restaurantId);
            }
        },
    }
}
</script>

<style>
.restaurant_list_wrap {
    margin-top: 50px;
    margin-bottom: 100px;
}

.star-rating {
    margin-right: -55px;
    font-size: 1.2rem;
    width: 5em;
    margin-top: -2px;
}

.star-rating label {
    -webkit-text-stroke-width: 1.5px;
}

.heart-icon-container {
    margin-right: 73px;
}

.restaurant-image {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.no-image-text {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    color: #888;
    text-align: center;
}
</style>
