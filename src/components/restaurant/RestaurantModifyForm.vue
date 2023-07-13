<template lang="">
    <v-container class="container">
      <div id="restaurantModifyCard" justify-center>
      <v-card-text>
        <form @submit.prevent="onSubmit">
        <table id="restaurantModifyTable">
          <tr>
            <td style="font-weight: bold">상호명</td>
            <td>
                <v-text-field type="text" class="inputValue" v-model="restaurantName"/>
            </td>
          </tr>
          <tr>
            <td style="font-weight: bold">음식점 정보</td>
            <td>
                <v-textarea class="inputValue" rows="4" v-model="restaurantInfo"/>
            </td>
          </tr>
        </table>
      <div>
        <v-btn @click="modifyBtn" class="detailbox1">수정완료</v-btn>
        <router-link :to="{
                name: 'BusinessRegisteredRestaurantsPage',
                params: { id: this.restaurant.id }
            }">취소</router-link>
      </div>
      </form>
    </v-card-text>
    </div>
  </v-container>
</template>

<script>
export default {
    props: {
        restaurant: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            restaurantName: '',
            restaurantInfo: '',
        }
    },
    created() {
        this.restaurantName = this.restaurant.restaurantName
        this.restaurantInfo = this.restaurant.restaurantInfo
    },
    methods: {
        onSubmit() {
            const { restaurantName, restaurantInfo } = this
            this.$emit('submit', { restaurantName, restaurantInfo })
        },
        modifyBtn() {
            this.$router.push({
                name: 'BusinessRestaurantReadPage',
                params: { id: this.restaurant.id }
            });
        }
    }
}
</script>
<style scoped>
.detailbox1 {
    margin: 20px;
}

table td {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

#restaurantModifyCard {
    width: 500px;
    height: 550px;
    margin-top: 60px;
    padding-top: 20px;
}

.inputValue {
    outline: none;
    color: gray;
    width: 270px;
    font-weight: 300;
    font-size: 15px;
    padding: 8px 10px;
}
</style>