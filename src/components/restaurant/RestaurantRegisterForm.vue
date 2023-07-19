<template lang="">
  <v-container>
    <div class="main-container">
      <form @submit.prevent="onSubmit">
        <div>
          <div style="font-weight: bold">상호명</div>
          <div>
            <v-text-field type="text" class="inputValue" v-model="restaurantName" placeholder="상호명을 입력하세요"/>
          </div>
          <div style="font-weight: bold">맛집 정보</div> 
          <div>
            <v-textarea class="inputValue" rows="4" v-model="restaurantInfo" placeholder="맛집 상세 정보를 입력하세요"/>
          </div>
        </div>
          <div class="room-deal-information-container">
            <div class="room-deal-information-title">사진 등록</div>
            <div class="room-picture-notice">
              <ul class="room-write-wrapper">
                <li>맛집 정보를 담은 사진은 3장 이상 등록을 권합니다.</li>
                <li>사진 용량은 사진 한 장당 10MB 까지 등록이 가능합니다.</li>
              </ul>
            </div>              
            <div class="room-file-upload-wrapper">
              <div v-if="!file.length" class="room-file-upload-example-container">
                <div class="room-file-upload-example">
                  <div class="room-file-notice-item room-file-upload-button">
                    <div class="image-box">
                      <label for="file-selector">사진 등록</label>
                      <input type="file" id="file-selector" ref="file" multiple @change="handleFileUpload" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="file-preview-content-container">
                <div class="file-preview-container">
                  <div v-for="(preview, index) in imagePreviews" :key="index" class="file-preview-wrapper">
                    <div class="file-close-button" @click="deleteImage(index)" :name="file.number">x</div>
                    <img :src="preview" style="max-width: 200px; max-height: 200px; margin-bottom: 10px;" />
                  </div>
                  <div class="file-preview-wrapper-upload">
                  <div class="image-box">
                    <label for="file">추가 사진 등록</label>
                    <input type="file" id="file" ref="files" @change="imageAddUpload" multiple />
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div class="button-container">
            <v-btn raised type="submit">등록</v-btn>
            <router-link class="cancel-link" :to="{ name: 'RestaurantListPage' }">취소</router-link>
          </div>
      </form>
    </div>
  </v-container>
</template>

<script>

import AWS from 'aws-sdk'
import env from '@/env'

export default {
  data() {
    return {
      restaurantName: '',
      restaurantInfo: '',
      imageUrls: [],

      imagePreviews: [],
      file: [],
      s3fileList: [],
      awsBucketName: env.api.MAIN_AWS_BUCKET_NAME,
      awsBucketRegion: env.api.MAIN_AWS_BUCKET_REGION,
      awsIdentityPoolId: env.api.MAIN_AWS_IDENTITY_POOL_ID,
      s3: null,
      // startAfterAwsS3Bucket: null,
    }
  },

  mounted() {
    this.userToken = localStorage.getItem("userToken")
    console.log('userToken: ' + this.userToken)
  },

  methods: {
    awsS3Config() {
      AWS.config.update({
        region: this.awsBucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.awsIdentityPoolId
        })
      });

      this.s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {
          Bucket: this.awsBucketName
        }
      });
    },

    async onSubmit() {
      if (!this.restaurantName) {
        alert('상호명을 입력해주세요.');
        return;
      }

      if (!this.restaurantInfo) {
        alert('맛집 정보를 입력해주세요.');
        return;
      }

      if (!this.file || this.file.length === 0) {
        alert('이미지를 선택해주세요.');
        return;
      }

      await this.uploadAwsS3()

      const { restaurantName, restaurantInfo, userToken, imageUrls } = this

      this.$emit("submit", { restaurantName, restaurantInfo, userToken, imageUrls })
      await this.$router.push({ name: 'RestaurantListPage' })
    },

    uploadAwsS3() {
      this.awsS3Config()

      if (!Array.isArray(this.file)) {
        this.file = [this.file];
      }

      for (let idx = 0; idx < this.file.length; idx++) {
        const file = this.file[idx];

        this.s3.upload({
          Key: file.name,
          Body: file,
          ACL: 'public-read'
        }, (err, data) => {
          if (err) {
            console.log(err)
            return alert('업로드 중 문제 발생 (사진 파일에 문제가 있음)', err.message)
          }
        })
      }
    },

    handleFileUpload() {
      this.file = Array.from(this.$refs.file.files);

      this.s3fileList = [];
      this.imagePreviews = [];

      for (let idx = 0; idx < this.$refs.file.files.length; idx++) {
        const file = this.file[idx];
        const reader = new FileReader();

        reader.onload = (e) => {
          const preview = e.target.result;
          this.s3fileList.push(file);
          this.imagePreviews.push(preview);
          this.imageUrls.push(file.name); // 이미지 파일 이름을 imageUrls에 추가
        };

        reader.readAsDataURL(file);
      }
    },

    imageAddUpload() {
      const files = Array.from(this.$refs.files.files); // 새로 추가된 파일들

      for (let idx = 0; idx < files.length; idx++) {
        const file = files[idx];
        const reader = new FileReader();

        reader.onload = (e) => {
          const preview = e.target.result;
          this.file.push(file); // 기존 파일 배열에 새로운 파일 추가
          this.s3fileList.push(file);
          this.imagePreviews.push(preview);
        };

        reader.readAsDataURL(file);
      }
    },

    deleteImage(index) {
      this.imagePreviews.splice(index, 1);
      this.file.splice(index, 1);
      this.s3fileList.splice(index, 1);
      this.imageUrls.splice(index, 1); // 이미지 파일 이름을 imageUrls에서 제거
    },

    // deleteAwsS3File(key) {
    //   this.awsS3Config()

    //   this.s3.deleteObject({
    //     Key: key // key값인 파일 이름으로 지우겠다고 하는 것
    //   }, (err, data) => {
    //     if (err) {
    //       return alert('AWS 버킷 데이터 삭제에 문제가 발생했습니다: ' + err.message)
    //     }
    //     alert('AWS 버킷 데이터 삭제가 성공적으로 완료되었습니다')
    //     this.getAwsS3Files()
    //   })
    // }
  },
}
</script>

<style scoped>
.inputValue {
  outline: none;
  color: gray;
  width: 270px;
  font-weight: 300;
  font-size: 15px;
  padding: 8px 10px;
}

.main-container {
  width: 1200px;
  height: 400px;
  margin: 0 auto;
}

.room-deal-information-container {
  margin-top: 50px;
  color: #222222;
  border: 1px solid #dddddd;
}

.room-deal-information-title {
  text-align: center;
  font-size: 18px;
  line-height: 60px;
  border-bottom: 1px solid #dddddd;
}

.room-deal-information-content-wrapper {
  min-height: 50px;
  display: flex;
}

.room-deal-informtaion-content-title {
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  background-color: #f9f9f9;
}

.room-deal-information-content {
  width: 100%;
  font-size: 14px;
}

.room-deal-option-selector {
  display: flex;
  align-items: center;
  padding: 15px;
}

.room-deal-option-item {
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #cccccc;
  border-radius: 5px;
  cursor: pointer;
}

.room-deal-option-item:last-child {
  margin-left: 10px;
}

.room-deal-option-notice {
  margin-left: auto;
  font-size: 14px;
  color: #888888;
}

.room-deal-option-item-deposit {
  margin-left: 10px;
}

.room-deal-information-wrapper {
  display: flex;
  flex-direction: column;
}

.room-deal-information-option {
  padding: 10px;
  display: flex;
  align-items: center;
}

.room-deal-information-option:last-child {
  border-bottom: 1px solid #dddddd;
}

.room-deal-information-item-type {
  font-size: 13px;
  color: #fff;
  background-color: #61b6e5;
  min-width: 50px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
}

.room-deal-information-item-wrapper {
  display: flex;
  align-items: center;
  margin-left: 10px;
  height: 46px;
  width: 100%;
}

.room-deal-information-item-wrapper>input {
  border: 1px solid #dddddd;
  width: 140px;
  height: 100%;
  padding: 0 15px;
  font-size: 15px;
}

.room-deal-inforamtion-won {
  margin: 0 10px;
}

.room-deal-information-example {
  color: #888888;
}

.room-deal-information-option:not(:first-child) {
  margin-top: 10px;
}

.room-deal-inforamtion-divide {
  font-size: 22px;
  margin: 0 8px;
  color: #222222;
  font-weight: 100;
}

.room-deal-close-button-wrapper {
  margin-left: auto;
  cursor: pointer;
}

.room-deal-close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background-color: #666666;
  color: rgb(220, 220, 220);
}

.room-deal-cliked {
  background-color: rgb(235, 235, 235);
  color: rgb(170, 170, 170);
}

.room-file-upload-example {
  height: 100%;
}

.room-write-content-container {
  border-top: 1px solid #dddddd;
  min-height: 260px;
}

.room-picture-notice {
  margin: 20px;
  padding: 20px 40px;
  border: 1px solid #dddddd;
}

.file-preview-content-container {
  height: 100%;
}

.room-file-upload-wrapper {
  margin: 20px;
  border: 1px solid #dddddd;
  background-color: #f4f4f4;
  min-height: 350px;
  font-size: 15px;
  color: #888888;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.room-file-upload-example-container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 100%;
  width: 100%; */
}

.room-file-image-example-wrapper {
  text-align: center;
}

.room-file-notice-item {
  margin-top: 5px;
  text-align: center;
}

.room-file-notice-item-red {
  color: #ef4351;
}

.image-box {
  margin-top: 30px;
  padding-bottom: 20px;
  text-align: center;
}

.image-box input[type='file'] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}

.image-box label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #232d4a;
  color: #fff;
  vertical-align: middle;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
}

.file-preview-wrapper {
  padding: 10px;
  position: relative;
}

.file-preview-wrapper>img {
  position: relative;
  width: 190px;
  height: 130px;
  z-index: 10;
}

.file-close-button {
  position: absolute;
  /* align-items: center; */
  line-height: 18px;
  z-index: 99;
  font-size: 18px;
  right: 5px;
  top: 10px;
  color: #fff;
  font-weight: bold;
  background-color: #666666;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}

.file-preview-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.file-preview-wrapper-upload {
  margin: 10px;
  padding-top: 20px;
  background-color: #888888;
  width: 190px;
  height: 130px;
}

.room-write-button-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #222222;
}

.room-write-button-wrapper>div {
  width: 160px;
  height: 50px;
  border: 1px solid #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
}

.room-write-button {
  margin-left: 15px;
  color: #fff;
  background-color: #1564f9;
}

.room-write-button:hover {
  opacity: 0.8;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-container>.cancel-link {
  font-size: 13px;
  margin-left: 10px;
}
</style>