<template>
  <div class="nav_bg">
    <div class="nav_mold">
      <div class="nav_userMenu">

        <!-- <a href="#" target="_blank">
          <div class="callcenter_pointer">
            <v-icon class="icon-style" alt="고객센터 아이콘">mdi-face-agent</v-icon>
          </div>
        </a> -->
        <div class="login_wrap">
          <div v-if="!isAuthenticated" class="login_wrap_line1"></div>
          <div class="login_wrap_line2"></div>
          <a style="color:gray" v-if="!isAuthenticated" @click="goToSelectAccountTypePage"
            class="regist"><span>회원가입</span></a>
          <a style="color:gray" v-if="!isAuthenticated" @click="goToLoginPage" class="login"><span>로그인</span></a>
          <a style="color:gray" v-if="isAuthenticated" @click="signOut" class="logout"><span>로그아웃</span></a>
          <a style="color:gray" class="callcenter"><span>고객센터</span></a>
        </div>

        <div class="logo_top_wrap">
          <div class="logo_top">
            <label><a @click="goToHome"><img src="@/assets/foodfoot-logo.jpg" alt="풋풋 메인 로고"></a></label>
          </div>
        </div>

        <label><a href="#" target="_blank" class="ico_category"><v-icon alt="삼선 메뉴 아이콘">mdi-menu</v-icon></a></label>
        <div class="category">
          <label><a style="color: black;" @click="showFoodListPage" class="totalfood">
              <span class="food-list-label">맛집 리스트</span> </a></label>
          <!-- <label><a href="#" target="_blank" class="recommend"><span>추천 맛집</span></a></label> -->
          <!-- 내 주변 맛집으로 넣어도 괜찮을 듯 함 -->
        </div>

        <div class="search_my_cart_box">
          <div class="searchbar_wrap"><input type="text" maxlength="30"><v-icon class="" alt="돋보기">mdi-magnify</v-icon>
          </div>
          <!-- 마이페이지 - 일반 회원, 사업자 회원 구분! -->
          <label><a v-if="isAuthenticated" @click="goToMyPage" class="icon_mypage"><v-icon alt="마이페이지 아이콘"
                size="32">mdi-account-outline</v-icon></a></label>
          <!-- 나중에 일반회원만 생기도록 고칠 것 -->
          <label><a v-if="isAuthenticated" @click="goToMyPage" class="icon_normal_like"><v-icon alt="일반회원 찜 아이콘"
                size="28">mdi-heart-outline</v-icon></a></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import router from '@/router'

import {
  LOGIN_COMPLETE,
} from '@/store/account/mutation-types'

import { mapState, mapMutations } from 'vuex'

const accountModule = 'accountModule'

export default {
  data() {
    return {
      showAccountForm: false,
      userToken: null
    }
  },
  computed: {
    ...mapState(accountModule, ['isAuthenticated'])
  },
  methods: {
    ...mapMutations(accountModule, ['LOGIN_COMPLETE']),
    showFoodListPage() {
      router.push('/restaurant-list-page').catch(() => { })
    },
    showAccountInfo() {
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
    },
    goToMyPage() {
      router.push('/business-mypage').catch(() => { })
    },
    signOut() {
      localStorage.removeItem("userToken")
      this[LOGIN_COMPLETE](false)
    },
  },
  mounted() {
    this.userToken = localStorage.getItem("userToken")

    if (this.userToken == null) {
      this[LOGIN_COMPLETE](false)
    } else {
      this[LOGIN_COMPLETE](true)
    }
  },
}
</script>

<style>
.nav_bg {
  width: 100%;
  height: 330px;
}

.nav_mold {
  width: 1050px;
  height: 100%;
  margin: 0 auto;
}

.nav_userMenu {
  width: 100%;
  height: 43px;
  margin: 0 auto;
  position: relative;
}

.login_wrap_line1 {
  position: absolute;
  border-right: 1.5px solid #d8d8d8;
  width: 16px;
  height: 11px;
  margin: 1px 0 0 40px;
}

.login_wrap_line2 {
  position: absolute;
  border-right: 1.5px solid #d8d8d8;
  width: 16px;
  height: 11px;
  margin: 1px 0 0 101px;
}

.callcenter img {
  width: 8px;
  height: 5px;
  margin-left: 6px;
  margin-top: -3px;
  display: inline-block;
}

.callcenter_pointer {
  float: right;
  width: 8px;
  height: 5px;
  margin-left: 4px;
  margin-top: 19px;
}

.regist {
  margin-top: -1px;
  font-size: 12px;
  display: inline-block;
}

.login {
  margin-top: -1px;
  font-size: 12px;
  display: inline-block;
}

.logout-callcenter-box {
  display: flex;
  /* align-items: center; */
  margin-top: 2px;
}

.logout {
  margin-top: -1px;
  font-size: 12px;
  margin-left: 60px;
}

.callcenter {
  margin-top: -1px;
  font-size: 12px;
}

.login_wrap {
  margin-top: 14px;
  width: 174px;
  height: 13px;
  float: right;
  padding: 0;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.logo_top img {
  width: 250px;
  height: 200px;
  margin-top: 20px;
  margin-left: 150px;
}

.ico_category {
  margin-right: 13px;
  margin-top: 19px;
  float: left;
}

.category {
  box-sizing: border-box;
  width: 575px;
  height: 58px;
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  float: left;
  margin-top: 5px;
  margin-left: 10px;
}

.food-list-label {
  color: black;
  font-weight: bold;
  font-size: 17px;
}

.totalfood:hover,
.recommend:hover {
  color: #0db081;
  transition: 0.3s;
}

.search_my_cart_box {
  float: right;
  width: 353px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon_mypage {
  width: 50px;
  height: 50px;
}

.searchbar_wrap {
  width: 245px;
  height: 35px;
  border-radius: 17px;
  background-color: #f4f5f5;
  position: relative;
}

.searchbar_wrap img {
  width: 33.5px;
  height: 35px;
  margin-left: 15px;
  position: absolute;
}

.searchbar_wrap input[type="text"] {
  padding: 0 10px;
  width: 170px;
  height: 33px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 0px solid #fff;
  color: #333;
}

.searchbar_wrap input[type="text"]:focus {
  border: 0px solid #fff;
}
</style>