<template lang="">
    <div>
      <restaurant-modify-form v-if="filteredRestaurant" :filteredRestaurant="filteredRestaurant" @submit="onSubmit" />
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
        ...mapState(restaurantModule, ["filteredRestaurant"]),
    },
    methods: {
        ...mapActions(restaurantModule, [
            "requestRestaurantToSpring",
            "requestModifyRestaurantToSpring",
        ]),
        async onSubmit(payload) {
            const { modifiedRestaurantName, modifiedRestaurantInfo } = payload;
            const id = this.id;

            await this.requestModifyRestaurantToSpring({
                modifiedRestaurantName,
                modifiedRestaurantInfo,
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