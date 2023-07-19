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
                            <v-icon :class="isLiked(item.id) ? 'mdi mdi-heart red--text' : 'mdi mdi-heart-outline'"
                                @click.stop="toggleLike(item.id)"></v-icon>
                            <v-icon small class="px-2">후기</v-icon><span>0</span>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </template>
        </v-layout>
        <div>
            <input type="text" v-model="searchTerm" placeholder="상호명을 입력하세요" />
            <v-btn :small="true" raised @click="findRestaurant">검색</v-btn>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import env from '@/env'

const restaurantModule = 'restaurantModule';

export default {
    data() {
        return {
            userToken: '',
            searchTerm: '',
            id: null,
            likedRestaurants: [] // 찜한 음식점의 ID를 저장하는 배열
        };
    },
    methods: {
        ...mapActions(restaurantModule, ['requestRestaurantListToSpring']),
        handleCellClick(item) {
            this.id = item.id; // id 값을 설정
            this.$router.push({ name: 'RestaurantReadPage', params: { id: item.id } });
            console.log(this.id); // 설정된 id 값 확인
        },
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
    mounted() {
        this.requestRestaurantListToSpring();
        this.userToken = localStorage.getItem('userToken');

        // localStorage에서 찜한 음식점 ID 불러오기
        const likedRestaurantsData = localStorage.getItem('likedRestaurants');
        if (likedRestaurantsData) {
            this.likedRestaurants = JSON.parse(likedRestaurantsData);
        }
    },
    computed: {
        ...mapState(restaurantModule, ['restaurants']),
        findRestaurant() {
            const restaurants = this.restaurants.filter((restaurant) =>
                restaurant.restaurantName.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
            return restaurants;
        }
    }
};
</script>

<style></style>
