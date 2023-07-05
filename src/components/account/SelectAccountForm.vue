<template>
    <div>
        <div>
            <p></p>
            <h1>회원 유형 선택</h1>
            <p></p>
            <div class="account-type-card-container">
                <v-card class="select-account-type-card" @click="goToNormalRegister">
                    <v-icon color="black" size="150px">mdi-account-circle</v-icon>
                    <h3>개인 회원</h3>
                </v-card>
                <v-card class="select-account-type-card" @click="goToBusinessRegister">
                    <v-icon color="black" size="160px">mdi-badge-account</v-icon>
                    <h3>사업자 회원</h3>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goToNormalRegister() {
            this.$router.push('/signup-normal-account');
        },
        goToBusinessRegister() {
            this.$router.push('/signup-business-account');
        }
    }
}
</script>

<style>
.account-type-card-container {
    display: flex;
    justify-content: center;
}

.select-account-type-card {
    width: 300px;
    height: 400px;
    display: grid;
    place-items: center;
}
</style>
