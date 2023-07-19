<template>
    <v-container>
        <v-layout column align-center>
            <v-flex>
                <v-card align="center" height="600px" width="700px">
                    <v-carousel>
                        <v-carousel-item v-for="(restaurantImagePath, idx) in filteredRestaurant.restaurantImagesPathList"
                            :key="idx" :width="550" :height="550">
                            <v-img :src="getS3ImageUrl(restaurantImagePath)"></v-img>
                        </v-carousel-item>
                    </v-carousel>
                    <v-card-text>
                        <div>상호명 - {{ filteredRestaurant.restaurantName }}</div>
                        <div>맛집 상세 정보 - {{ filteredRestaurant.restaurantInfo }}</div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import env from '@/env'

export default {
    name: "BusinessRestaurantReadForm",
    props: {
        filteredRestaurant: {
            type: Object,
            required: true,
        },
    },
    methods: {
        getS3ImageUrl(imageKey) {
            const bucketRegion = env.api.MAIN_AWS_BUCKET_REGION
            const bucketName = env.api.MAIN_AWS_BUCKET_NAME

            return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageKey}`;
        }
    },
};
</script>

<style lang="">
</style>