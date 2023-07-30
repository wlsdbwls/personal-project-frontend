<template>
  <div class="nav_bg">
    <div class="nav_mold">
      <div class="nav_userMenu">
        <div class="login_wrap">
          <div v-if="!isAuthenticated" class="login_wrap_line1"></div>
          <div class="login_wrap_line2"></div>
          <button style="color:gray" v-if="!isAuthenticated" @click="goToSelectAccountTypePage"
            class="regist"><span>회원가입</span></button>
          <button style="color:gray" v-if="!isAuthenticated" @click="goToLoginPage"
            class="login"><span>로그인</span></button>
          <button style="color:gray" v-if="isAuthenticated" @click="signOut" class="logout"><span>로그아웃</span></button>
          <button style="color:gray" class="callcenter"><span>고객센터</span></button>
        </div>

        <div class="logo_top_wrap">
          <div class="logo_top">
            <label><button @click="goToHome"><img src="@/assets/foodfoot-logo.jpg" alt="풋풋 메인 로고"></button></label>
          </div>
        </div>

        <div class="category">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <button @click="on.click" class="ico_category">
                <v-icon alt="삼선 메뉴 아이콘">mdi-menu</v-icon>
              </button>
            </template>
            <v-list>
              <!-- 메뉴 항목 1 -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>#맛집 태그</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>

          <label style="margin-right: 250px;"><button style="color: black;" @click="showFoodListPage" class="totalfood">
              <span class="food-list-label">맛집 리스트</span> </button></label>
          <!-- <label><a href="#" target="_blank" class="recommend"><span>추천 맛집</span></a></label> -->
          <!-- 내 주변 맛집으로 넣어도 괜찮을 듯 함 -->
        </div>

        <div class="search_my_cart_box">
          <div style="display:flex; margin-left: -150px;">
            <label v-if="isAuthenticated">
              <p>반가워요 <span>{{ account.nickName }}님</span></p>
            </label>
          </div>
          <div class="searchbar_wrap"><input type="text" maxlength="40"><v-icon class="icon_search"
              alt="돋보기">mdi-magnify</v-icon>
          </div>

          <template v-if="!isAuthenticated">
            <label><button @click="beforeLogIn" class="icon_mypage"><v-icon alt="마이페이지 아이콘"
                  size="32">mdi-account-outline</v-icon></button></label>
          </template>

          <template v-if="isAuthenticated">
            <label v-if="roleType === 'NORMAL'"><button @click="goToNormalMyPage" class="icon_mypage"><v-icon
                  alt="마이페이지 아이콘" size="32">mdi-account-outline</v-icon></button></label>
            <label v-if="roleType === 'BUSINESS'"><button @click="goToBusinessMyPage" class="icon_mypage"><v-icon
                  alt="마이페이지 아이콘" size="32">mdi-account-outline</v-icon></button></label>
          </template>

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

import { mapActions, mapState, mapMutations } from 'vuex'

const accountModule = 'accountModule'

export default {
  data() {
    return {
      showAccountForm: false,
      userToken: null,
      nickName: '',
      id: '',
      userToken: '',
      roleType: '',
    }
  },

  watch: {
    isAuthenticated: {
      immediate: true, // 초기 로딩 시에도 즉시 실행하도록 설정
      handler(newValue) {
        if (newValue) {
          // 인증 상태가 true로 변경되었을 때의 로직
          this.updateUserInfo();
        } else {
          // 인증 상태가 false로 변경되었을 때의 로직
          this.resetUserInfo();
        }
      }
    }
  },

  computed: {
    ...mapState(accountModule, ['isAuthenticated', 'account'])
  },
  methods: {
    ...mapMutations(accountModule, ['LOGIN_COMPLETE']),

    // 여기서 롤타입까지 받아와보자
    ...mapActions(accountModule, ['requestNicknameToSpring',
      'requestAccountToSpring', 'requestAccountRoleToSpring']),

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

    beforeLogIn() {
      if (!this.isAuthenticated) {
        alert('로그인이 필요합니다!')
        router.push('/signin').catch(() => { });
      }
    },

    goToNormalMyPage() {
      if (!this.isAuthenticated) {
        alert('로그인이 필요합니다!')
        router.push('/signin').catch(() => { });
      } else {
        router.push('/normal-mypage').catch((normal) => { });
      }
    },
    goToBusinessMyPage() {
      if (!this.isAuthenticated) {
        alert('로그인이 필요합니다!')
        router.push('/signin').catch(() => { });
      } else {
        router.push('/business-mypage').catch(() => { });
      }
    },

    async updateUserInfo() {
      this.userToken = localStorage.getItem("userToken")

      if (this.userToken != null) {
        await this.requestAccountToSpring({ userToken: this.userToken })
        await this.requestNicknameToSpring(this.account.id)
        this.roleType = await this.requestAccountRoleToSpring({ id: this.account.id })
      }
    },

    resetUserInfo() {
      this.userToken = null;
      this.nickName = '';
      this.id = '';
      this.roleType = '';
    },

    signOut() {
      localStorage.removeItem("userToken")
      this[LOGIN_COMPLETE](false)
      this.resetUserInfo(); // 로그아웃 시에도 유저 정보 초기화
      router.push('/').catch(() => { });
    },
  },
  async created() {
    this.userToken = localStorage.getItem("userToken")

    if (this.userToken == null) {
      this[LOGIN_COMPLETE](false)
    } else {
      this[LOGIN_COMPLETE](true)
      await this.requestAccountToSpring({ userToken: this.userToken })
      await this.requestNicknameToSpring(this.account.id)
      this.roleType = await this.requestAccountRoleToSpring({ id: this.account.id })
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
  width: 1150px;
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
  margin-left: 420px;
}

.ico_category {
  margin-right: 13px;
  float: left;
  /* margin-top: 10px; */
}

.name {
  margin-right: 160px;
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
  font-size: 20px;
}

.totalfood:hover,
.recommend:hover {
  color: #0db081;
  transition: 0.3s;
}

.totalfood {
  /* margin-bottom: 10px; */
  margin-right: 180px;
}

.search_my_cart_box {
  float: right;
  width: 353px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: -20px;
}

.icon_mypage {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.is-authenticated .icon_mypage {
  display: block;
}

.searchbar_wrap {
  width: 245px;
  height: 35px;
  border-radius: 17px;
  background-color: #f4f5f5;
  position: relative;
  margin-left: 5px;
}

.searchbar_wrap input[type="text"] {
  padding: 0 10px;
  width: 170px;
  height: 33px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 0px solid #fff;
  color: #333;
  margin-left: 20px
}

.searchbar_wrap input[type="text"]:focus {
  border: 0px solid #fff;
}

.icon_search {
  margin-left: 15px;
}
</style>