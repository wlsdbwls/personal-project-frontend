<template lang="">
    <div>
      <h1>사업자 회원 - 상세 정보 수정 페이지</h1>
      <restaurant-modify-form v-if="restaurant" :restaurant="restaurant" @submit="onSubmit" />
      <p v-else>로딩중 ...</p>
    </div>
  </template>

<script>
import RestaurantModifyForm from "@/components/restaurant/RestaurantModifyForm.vue";
import { mapActions, mapState } from "vuex";

const restaurantModule = "restaurantModule";

export default {
    name: "RestaurantModifyPage",
    components: {
        RestaurantModifyForm,
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    computed: {
        ...mapState(restaurantModule, ["restaurant"]),
    },
    methods: {
        ...mapActions(restaurantModule, [
            "requestRestaurantToSpring",
            "requestModifyRestaurantToSpring",
        ]),
        async onSubmit(payload) {
            const { restaurantName, restaurantInfo } = payload;
            const id = this.id;

            await this.requestModifyRestaurantToSpring({
                restaurantName,
                restaurantInfo,
                id,
            });
            await this.$router.push({
                name: "BusinessRestaurantReadPage",
                params: { id: this.id },
            });
        },
    },
    created() {
        this.requestRestaurantToSpring(this.id);
    },
};
</script>
<style lang=""></style>