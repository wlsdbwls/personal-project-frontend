<template>
    <div class="select-account">
        <div>
            <div class="select-account-type">
                <span>회원 유형 선택을 선택해 주세요!</span>
            </div>
            <div class="account-type-card-container">
                <v-card class="select-account-type-card" @click="goToNormalRegister">
                    <img src="@/assets/select_normal.png" alt="개인 회원 아이콘" width="150px" height="150px">
                    <p style="margin-bottom: 20px; font-weight: bold;">개인 회원</p>
                </v-card>
                <v-card class="select-account-type-card" @click="goToBusinessRegister">
                    <img src="@/assets/select_business.png" alt="사업자 회원 아이콘" width="150px" height="150px">
                    <p style="margin-bottom: 20px; font-weight: bold;">사업자 회원</p>
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
.select-account {
    display: contents;
}

.select-account-type {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
}

.select-account-type-card img {
    margin-top: 20px;
}

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
