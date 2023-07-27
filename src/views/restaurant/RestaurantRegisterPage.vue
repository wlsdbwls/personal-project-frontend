<template lang="">
    <div>
        <restaurant-register-form @submit="onSubmit"/>
    </div>
</template>

<script>
import RestaurantRegisterForm from '@/components/restaurant/RestaurantRegisterForm.vue';

import { mapActions } from 'vuex';
const restaurantModule = 'restaurantModule'

export default {
    components: {
        RestaurantRegisterForm,
    },
    methods: {
        ...mapActions(
            restaurantModule, ['requestRestaurantRegisterToSpring']
        ),
        async onSubmit(payload) {
            const restaurant = await this.requestRestaurantRegisterToSpring(payload)
            console.log('restaurant: ' + JSON.stringify(restaurant))
        }
    }
}
</script>

<style lang="">
    
</style>