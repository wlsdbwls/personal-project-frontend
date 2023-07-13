<template>
    <v-container grid-list-xl>
        <v-layout row wrap>
            <template v-for="item in findRestaurant">
                <v-flex xs12 sm6 md4 lg3 xl2>
                    <v-card @click="handleCellClick(item)">
                        <v-img :src="require(`@/assets/uploadImgs/${item.restaurantImagePath}`)">
                        </v-img>
                        <v-card-text>
                            <!-- <div>{{ restaurant.type }}</div> 음식점 타입 추가하기!! -->
                            <div>{{ item.restaurantName }}</div>
                        </v-card-text>
                        <v-divider />
                        <v-card-actions>
                            <v-spacer />
                            <v-icon small class="px-2">찜</v-icon><span>0</span>
                            <v-icon small class="px-2">후기</v-icon><span>0</span>
                            <v-icon small class="px-2">조회수</v-icon><span>0</span>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </template>
        </v-layout>
        <p></p>
        <div>
            <input type="text" :value="searchTerm" @change="searchTerm = $event.target.value" placeholder="상호명을 입력하세요" />
            <v-btn :small=true color="#f18893" raised @click="findRestaurant">검색</v-btn>
        </div>
    </v-container>
</template>


<script>
import { mapActions, mapState } from 'vuex';

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
        ...mapActions(restaurantModule, ['requestRestaurantListToSpring']),
        handleCellClick(item) {
            this.id = item.id; // id 값을 설정
            this.$router.push({ name: 'RestaurantReadPage', params: { id: item.id } });
            console.log(this.id); // 설정된 id 값 확인
        },
    },
    mounted() {
        this.requestRestaurantListToSpring()
        this.userToken = localStorage.getItem("userToken")
    },
    computed: {
        ...mapState(restaurantModule, ['restaurants']),
        findRestaurant() {
            const restaurants = this.restaurants.filter((restaurant) =>
                restaurant.restaurantName.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
            return restaurants;
        },
    },
}
</script>