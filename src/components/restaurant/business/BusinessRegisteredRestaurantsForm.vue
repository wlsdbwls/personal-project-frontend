<template>
    <v-container grid-list-xl>
        <div class="contents_box1">
            <!-- 글꼴 나중에 꾸미기 -->
            <h2 class="contents_name">내가 등록한 맛집</h2>
        </div>
        <div class="business_list_wrap">
            <v-layout row wrap>
                <v-row>
                    <template v-for="myRestaurant in findMyRestaurant">
                        <v-flex xs12 sm6 md4 lg3 xl2>
                            <v-card @click="handleCellClick(myRestaurant)">
                                <div class="restaurant-image-container" v-if="myRestaurant.restaurantImagePath">
                                    <v-img :src="getS3ImageUrl(myRestaurant.restaurantImagePath)" aspect-ratio="1"
                                        class="restaurant-image"></v-img>
                                </div>
                                <div v-else class="no-image-text">
                                    <v-img :src="'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs'">이미지가 등록되지
                                        않았습니다</v-img>
                                </div>
                                <v-card-text>
                                    <div style="text-align: center">{{ myRestaurant.restaurantName }}</div>
                                </v-card-text>
                                <v-divider />
                                <v-card-actions>
                                    <v-spacer />
                                    <div>
                                        <v-icon class="mdi mdi-account-eye" color="#DBA901"></v-icon>
                                        <span style="font-size: 15px; color: #6E6E6E;">{{ getVisitor(myRestaurant.id)
                                        }}</span>
                                    </div>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </template>
                </v-row>
            </v-layout>
        </div>
    </v-container>
</template>


<script>
import { mapActions, mapState } from 'vuex';
import env from '@/env'

const restaurantModule = 'restaurantModule'

export default {
    data() {
        return {
            userToken: '',
            searchTerm: '',
            id: null
        };
    },
    methods: {
        ...mapActions(restaurantModule, ['requestBusinessRestaurantListToSpring', 'restaurantVisitorToSpring']),
        handleCellClick(myRestaurant) {
            this.$router.push({ name: 'BusinessRestaurantReadPage', params: { id: myRestaurant.id } })
        },

        getS3ImageUrl(imageKey) {
            const bucketRegion = env.api.MAIN_AWS_BUCKET_REGION
            const bucketName = env.api.MAIN_AWS_BUCKET_NAME

            return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageKey}`;
        },

        getVisitor(restaurantId) {
            // this.restaurantVisitorToSpring(restaurantId)
        }
    },
    async created() {
        this.userToken = localStorage.getItem("userToken")
        await this.requestBusinessRestaurantListToSpring({ userToken: this.userToken })
    },
    computed: {
        ...mapState(restaurantModule, ['filteredRestaurants']),
        findMyRestaurant() {
            // return this.filteredRestaurants.filter((filteredRestaurants) =>
            //     filteredRestaurants.restaurantName.toLowerCase().includes(this.searchTerm.toLowerCase())
            // );
            return this.filteredRestaurants
        },
    },
}
</script>

<style>
.business_list_wrap {
    margin-top: 50px;
    margin-bottom: 100px;
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
}
</style>