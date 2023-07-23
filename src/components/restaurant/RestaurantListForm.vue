<template>
    <v-container grid-list-xl>
        <v-layout row wrap>
            <template v-for="item in findRestaurant">
                <v-flex xs12 sm6 md4 lg3 xl2>
                    <v-card @click="handleCellClick(item)">
                        <v-img :src="getS3ImageUrl(item.restaurantImagePath)"></v-img>
                        <v-card-text>
                            <!-- <div>{{ restaurant.type }}</div> 음식점 타입 추가하기!! -->
                            <div>{{ item.restaurantName }}</div>
                        </v-card-text>
                        <v-divider />
                        <v-card-actions>
                            <v-spacer />
                            <template v-if="isLiked(item.id)">
                                <v-icon class="mdi mdi-heart red--text" @click.stop="toggleLike(item.id)"></v-icon>
                            </template>
                            <template v-else>
                                <v-icon class="mdi mdi-heart-outline" @click.stop="toggleLike(item.id)"></v-icon>
                            </template>
                            <v-icon small class="px-2">후기</v-icon><span>0</span>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </template>
        </v-layout>
        <div>
            <input type="text" :value="searchTerm" @change="searchTerm = $event.target.value" placeholder="상호명을 입력하세요" />
            <v-btn :small="true" raised @click="findRestaurant">검색</v-btn>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import env from '@/env'

const restaurantModule = 'restaurantModule'
const likeModule = 'likeModule'
const accountModule = 'accountModule'

export default {
    data() {
        return {
            userToken: '',
            searchTerm: '',
            id: null,
            likedRestaurants: [],
        }
    },

    methods: {
        ...mapActions(restaurantModule, ['requestRestaurantListToSpring']),
        ...mapActions(accountModule, ['requestAccountIdToSpring']),
        ...mapActions(likeModule, ['requestLikeRestaurantToSpring',
            'requestUnlikeRestaurantToSpring']),

        handleCellClick(item) {
            this.id = item.id
            this.$router.push({ name: 'RestaurantReadPage', params: { id: item.id } });
            console.log('restaurantId: ' + this.id)
        },


        // isLiked(restaurantId) {
        //     const accountId = localStorage.getItem('accountId');
        //     this.likedRestaurants = JSON.parse(localStorage.getItem(`likedRestaurants_${accountId}`)) || [];
        //     return Array.isArray(this.likedRestaurants) && this.likedRestaurants.includes(restaurantId);
        // },

        async toggleLike(restaurantId) {
            if (this.isLiked(restaurantId)) {
                await this.requestUnlikeRestaurantToSpring(restaurantId);

                // 로컬 스토리지에서 해당 restaurantId 제거
                const likedRestaurants = this.getLikedRestaurants();
                const updatedLikedRestaurants = likedRestaurants.filter((id) => id !== restaurantId);
                this.saveLikedRestaurants(updatedLikedRestaurants);

                // 아이콘 변경된 후 로컬 스토리지와 Vue 컴포넌트 데이터 동기화
                this.likedRestaurants = updatedLikedRestaurants;

            } else {
                await this.requestLikeRestaurantToSpring({ userToken: this.userToken, restaurantId });

                // 로컬 스토리지에 해당 restaurantId 추가
                const likedRestaurants = this.getLikedRestaurants();
                likedRestaurants.push(restaurantId);
                this.saveLikedRestaurants(likedRestaurants);

                // 아이콘 변경된 후 로컬 스토리지와 Vue 컴포넌트 데이터 동기화
                this.likedRestaurants = likedRestaurants;
            }
        },

        // 로컬 스토리지에서 해당 사용자의 likedRestaurants 가져오기
        getLikedRestaurants() {
            const accountId = localStorage.getItem('accountId')
            const likedRestaurants = localStorage.getItem(`likedRestaurants_${accountId}`);
            return likedRestaurants ? JSON.parse(likedRestaurants) : [];
        },

        // 로컬 스토리지에 해당 사용자의 likedRestaurants 저장하기
        saveLikedRestaurants(likedRestaurants) {
            const accountId = localStorage.getItem('accountId')
            localStorage.setItem(`likedRestaurants_${accountId}`, JSON.stringify(likedRestaurants));
        },

        getS3ImageUrl(imageKey) {
            const bucketRegion = env.api.MAIN_AWS_BUCKET_REGION
            const bucketName = env.api.MAIN_AWS_BUCKET_NAME

            return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageKey}`
        }
    },
    async mounted() {
        await this.requestRestaurantListToSpring()

        this.userToken = localStorage.getItem('userToken')
        const accountId = await this.requestAccountIdToSpring({ userToken: this.userToken })
    },
    computed: {
        ...mapState(restaurantModule, ['restaurants']),
        findRestaurant() {
            const restaurants = this.restaurants.filter((restaurant) =>
                restaurant.restaurantName.toLowerCase().includes(this.searchTerm.toLowerCase())
            )
            return restaurants
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

<style></style>
