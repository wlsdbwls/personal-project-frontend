<template lang="">
    <v-container class="container">
      <div id="restaurantRegisterCard" justify-center>
      <h2>음식점 등록</h2>
    <div>
      <v-card-text>
        <form @submit.prevent="onSubmit">
        <table id="restaurantRegisterTable">
        <tr>
          <td style="font-weight: bold">상호명</td>
          <td>
            <v-text-field color="#f18893" type="text" class="inputValue" 
            v-model="restaurantName" placeholder="상품명을 입력하세요"/>
          </td>
        </tr> 
        <tr>
          <td style="font-weight: bold">음식점 정보</td>
          <td>
            <v-textarea class="inputValue" rows="4" v-model="restaurantInfo" 
            color="#f18893" placeholder="상품의 세부 정보를 입력하세요"/>
          </td>
        </tr>
        <p></p>
        <tr>
          <td style="font-weight: bold">이미지</td>
          <td>
            <input type="file" id="files" ref="files"
                    multiple @change="handleFileUpload" />
          </td>
        </tr>
        <tr>
        <td></td>
        <td>
          <div v-for="preview in imagePreviews" :key="preview">
            <img :src="preview" style="max-width: 200px; max-height: 200px; margin-bottom: 10px;" />
              <div class="image-actions">
                <button @click="deleteImage(index)">X</button>
              </div>
          </div>
        </td>
        </tr>
        </table>
        <v-btn raised type="submit" color="#f18893">등록</v-btn></br>
        <router-link style="font-size: 13px" :to="{ name: 'RestaurantListPage' }">
                    취소
        </router-link>
    </form>
  </v-card-text>
  </div>
</div>

  </v-container>
</template>

<script>

import { mapActions } from 'vuex';

const restaurantModule = 'restaurantModule'

export default {
  data() {
    return {
      restaurantName: '',
      restaurantInfo: '',
      files: '',
      imagePreviews: []
    }
  },
  methods: {
    ...mapActions(
      restaurantModule, ['requestRestaurantRegisterToSpring']
    ),

    async onSubmit() {
      let formData = new FormData()
      let aboutRestaurant = {
        restaurantName: this.restaurantName,
        restaurantInfo: this.restaurantInfo,
        userToken: localStorage.getItem("userToken")
      }

      for (let idx = 0; idx < this.files.length; idx++) {
        formData.append('restaurantImg', this.files[idx])
      }

      formData.append(
        "aboutRestaurant",
        new Blob([JSON.stringify(aboutRestaurant)], { type: "application/json" })
      )

      this.$emit("submit", formData)
      await this.$router.push({ name: 'RestaurantListPage' })

    },
    handleFileUpload() {
      this.files = this.$refs.files.files

      // Create an empty array to store the image URLs
      this.imagePreviews = [];

      // Loop through each file and create a URL for preview
      for (let idx = 0; idx < this.files.length; idx++) {
        const file = this.files[idx];
        const reader = new FileReader();

        // Read the file and create a URL for preview
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };

        reader.readAsDataURL(file);
      }
    },
    deleteImage(index) {
      this.imagePreviews.splice(index, 1);
      this.files.splice(index, 1);
    },
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#restaurantRegisterCard {
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