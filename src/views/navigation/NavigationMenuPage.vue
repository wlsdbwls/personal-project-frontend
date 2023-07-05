<template lang="">
    <nav>
      <!-- 아래 링크를 참고하여 본인 취향의 Navigation Bar를 만들 수 있습니다.
           https://vuetifyjs.com/en/components/app-bars/ -->
      <v-app-bar color="#FFF59D" shaped prominent>
        <!-- https://vuetifyjs.com/en/styles/colors/
             Vuetify 색상 설정하기 -->

        <v-toolbar-items>
        <button style="margin-left: 20px" @click="goToHome">
          <img slot="img" src="@/assets/foodfoot_logo.png" alt="로고" width="60" height="60"></img>
          <h4>풋풋(FoodFoot)</h4>
        </button>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <!--
          사용하고 싶은 아이콘을 자유롭게 선택해서 UI를 꾸미세요.
          https://pictogrammers.com/library/mdi/?welcome
          아이콘 따올때 맨 앞에 mdi 키워드가 붙어야 합니다.
        -->

        <v-toolbar-items>
        <v-btn text @click="showFoodListPage" style="margin-right: 40px;">
          <h2>맛집 리스트</h2>
        </v-btn>
        <v-btn text @click="showFoodlogListPage" style="margin-right: 40px;">
          <h2>푸드로그</h2>
        </v-btn>

         <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" style="margin-right: 40px;">
              <v-icon color="black" size="40px">mdi-account</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item @click="goToLoginPage">
                <v-list-item-title>로그인</v-list-item-title>
              </v-list-item>
              <v-list-item @click="goToSelectAccountTypePage">
                <v-list-item-title>회원가입</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        </v-toolbar-items>
      </v-app-bar>
    </nav>
  </template>
  
<script>

import router from '@/router'

export default {
  data() {
    return {
      showAccountForm: false,
      // userToken: null
    }
  },

  methods: {
    showFoodListPage() {
      // 등록된 맛집 리스트 페이지로 넘어가도록
      router.push('/food-list-page').catch(() => { })
    },
    showFoodlogListPage() {
      // 푸드로그 리스트 페이지로 넘어가도록
      router.push('/foodlog-list-page').catch(() => { })
    },
    showAccountInfo() {
      // 누르면 폼이 뜨도록
      // 로그인 안되어 있을 시 폼에 로그인이 뜨도록
      // 로그인 되어 있을 시 폼에 로그아웃이 뜨도록
      this.showAccountForm = !this.showAccountForm
    },
    goToLoginPage() {
      router.push('/signin').catch(() => { })

    },
    goToSelectAccountTypePage() {
      router.push('/select-account-type').catch(() => { })
    },
    goToHome() {
      router.push('/').catch(() => { })
    }
  },
  mounted() {
    // this.userToken = localStorage.getItem("userToken")
  },
}
</script>

<style lang="">
</style>