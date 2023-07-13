<template>
    <v-container grid-list-xl>
        <v-layout row wrap>
            <template v-for="myRestaurant in findMyRestaurant">
                <v-flex xs12 sm6 md4 lg3 xl2>
                    <v-card @click="handleCellClick(myRestaurant)">
                        <v-img :src="require(`@/assets/uploadImgs/${myRestaurant.restaurantImagePath}`)">
                        </v-img>
                        <v-card-text>
                            <!-- <div>{{ restaurant.type }}</div> 음식점 타입 추가하기!! -->
                            <div>{{ myRestaurant.restaurantName }}</div>
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
            <v-btn :small=true color="#f18893" raised @click="findMyRestaurant">검색</v-btn>
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
        ...mapActions(restaurantModule, ['requestBusinessRestaurantListToSpring']),
        handleCellClick(myRestaurant) {
            this.$router.push({ name: 'BusinessRestaurantReadPage', params: { id: myRestaurant.id } })
        },
    },
    async created() {
        this.userToken = localStorage.getItem("userToken")
        await this.requestBusinessRestaurantListToSpring({ userToken: this.userToken })
    },
    computed: {
        ...mapState(restaurantModule, ['filteredRestaurants']),
        findMyRestaurant() {
            return this.filteredRestaurants.filter((filteredRestaurants) =>
                filteredRestaurants.restaurantName.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },
    },
}
</script>