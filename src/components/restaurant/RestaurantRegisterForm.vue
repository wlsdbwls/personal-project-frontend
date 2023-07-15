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
            v-model="restaurantName" placeholder="상호명을 입력하세요"/>
          </td>
        </tr> 
        <tr>
          <td style="font-weight: bold">맛집 정보</td>
          <td>
            <v-textarea class="inputValue" rows="4" v-model="restaurantInfo" 
            color="#f18893" placeholder="맛집 상세 정보를 입력하세요"/>
          </td>
        </tr>
        <p></p>
        <tr>
          <td style="font-weight: bold">이미지 등록</td>
          <td>
            <input type="file" id="file-selector" ref="file" multiple @change="handleFileUpload" />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <div v-for="(preview, index) in imagePreviews" :key="index">
              <img :src="preview" style="max-width: 200px; max-height: 200px; margin-bottom: 10px;" />
              <div class="image-actions">
                <button @click="deleteAwsS3File(index)">X</button>
              </div>
            </div>
          </td>
        </tr>
        </table>
        <v-btn raised type="submit">등록</v-btn></br>
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

import AWS from 'aws-sdk'
import env from '@/env'

export default {
  data() {
    return {
      restaurantName: '',
      restaurantInfo: '',
      imagePreviews: [],

      file: null,
      awsBucketName: env.api.MAIN_AWS_BUCKET_NAME,
      awsBucketRegion: env.api.MAIN_AWS_BUCKET_REGION,
      awsIdentityPoolId: env.api.MAIN_AWS_IDENTITY_POOL_ID,
      s3: null,
      startAfterAwsS3Bucket: null,
    }
  },

  created() {
    this.getAwsS3Files()
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

      this.uploadAwsS3()

      this.$emit("submit", this.restaurantName, this.restaurantInfo, this.file.files)
      await this.$router.push({ name: 'RestaurantListPage' })
    },

    uploadAwsS3() {
      this.awsS3Config()

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
          alert('업로드 성공!')
          this.getAwsS3Files()
        })
      }
    },

    getAwsS3Files() {
      // ACL 설정 수정 필요
      this.awsS3Config()

      let res = this.s3.listObjects({
        Delimiter: '/',
        MaxKeys: 1,
      }, (err, data) => {
        if (err) {
          return alert('AWS 버킷 내에 문제가 있습니다: ' + err.message)
        } else {
          this.imagePreviews = data.Contents
          console.log('s3 리스트: ', data)
          this.startAfterAwsS3Bucket = data.NextMarker
        }
      })
    },

    handleFileUpload() {
      this.file = this.$refs.file.files;
      console.log(this.file);

      this.imagePreviews = [];

      for (let idx = 0; idx < this.file.length; idx++) {
        const file = this.file[idx];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };

        reader.readAsDataURL(file);
      }
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