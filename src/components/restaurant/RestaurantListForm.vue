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
        <template v-slot:item.restaurantName="{ item }">
            <td @click="handleCellClick(item)">{{ item.restaurantName }}</td>
        </template>
        <p></p>
        <div>
            <input type="text" :value="searchTerm" @change="searchTerm = $event.target.value" placeholder="상품명을 입력하세요" />
            <v-btn :small=true color="#f18893" raised @click="findProduct">검색</v-btn>
        </div>
    </v-container>
</template>


<script>
import axiosInst from '@/utility/axiosInst';
import { mapActions, mapState } from 'vuex';

const restaurantModule = 'restaurantModule'

export default {
    methods: {
        ...mapActions(restaurantModule, ['requestRestaurantListToSpring']),
        restaurantRead(item) {
            this.$router.push({ name: 'RestaurantReadPage', params: { id: item.id } })
        },
        handleCellClick(item) {
            this.$router.push({ name: 'RestaurantReadPage', params: { id: item.id } })
        },
    },
    mounted() {
        this.requestRestaurantListToSpring()
        this.userToken = localStorage.getItem("userToken")
    },
    computed: {
        ...mapState(restaurantModule, ['restaurants']),
        findRestaurant() {
            const filteredRestaurants = this.restaurants.filter((restaurant) =>
                restaurant.restaurantName.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
            return filteredRestaurants;
        },
    },
    data() {
        return {
            userToken: '',
            searchTerm: '',
        };
    },
}
</script>