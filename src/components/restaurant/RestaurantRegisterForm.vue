<template lang="">
    <div>
      <div class="contents_box1">
        <h2 class="contents_name">맛집 등록</h2>
      </div>
        <div class="main_content">
            <p class="contents_required"><span class="required_explain">*</span>표시는 필수입력 정보입니다</p>
            <ul class="edit2_form_list1">
                <v-form @submit.prevent="onSubmit" ref="form">
                <li>
                    <dl>
                        <dt><span class="required">*</span>상호명</dt>
                        <dd>
                            <input type="text" v-model="restaurantName" placeholder="상호명을 입력하세요" />
                        </dd>
                    </dl>
                    
                    <dl>
                    <dt><span class="required">*</span>전화번호</dt>
                        <dd>
                            <input type="text" @input="restrictToNumeric($event)" oninput="this.value = this.value.replace(/[^0-9.]/g, '')" maxlength="11"
                            v-model="restaurantNumber" placeholder="전화번호를 입력하세요"></input>
                            <p class="input-message">전화번호는 '-'을 제외하고 숫자만 입력해주세요</p>
                        </dd>
                    </dl>

                    <dl>
                      <dt><span class="required">*</span>메뉴</dt>
                      <dd>
                        <div v-for="(item, index) in menuItems" :key="index">
                          <input v-model="item.menuItem" placeholder="메뉴를 입력하세요" />
                          <input type="number" v-model="item.menuPrice" placeholder="가격을 입력하세요" />
                          <button @click="removeMenuItem(index)">삭제</button>
                          <!-- -아이콘으로 바꿀 것 -->
                        </div>
                        <!-- 추가 버튼이 onSubmit메서드와 통하는 것 같음 -->
                        <button @click="addMenuItem">추가</button>
                        <p class="input-message">메뉴는 최소 1개 입력해주세요</p>
                      </dd>
                    </dl>

                    <dl>
                    <dt><span class="required">*</span>주소</dt>
                        <dd>
                            <input type="text" @click="openPostcodeSearch()" v-model="postcode" placeholder="우편번호"></input>
                                <v-btn @click="openPostcodeSearch()" text large outlined style="font-size: 13px; margin-left: 20px; width:50px;" class="mt-6">우편번호 <br/> 검색</v-btn>
                            <textarea type="text" id="oneAddress" v-model="oneAddress" style="height: 80px;" placeholder="주소"></textarea>
                            <br>
                            <input type="text" id="detailAddress" v-model="detailAddress" placeholder="상세주소" style="margin-top: 5px;"></input>
                        </dd>
                    </dl>

                    <dl>
                    <dt>시작 시간</dt>
                    <dd>
                      <input type="time" v-model="restaurantOpeningTime" placeholder="영업 시간을 입력하세요" ></input></dd>
                    </dl>
                    <dl>
                    <dt>마감 시간</dt>
                    <dd>
                      <input type="time" v-model="restaurantClosingTime" placeholder="영업 시간을 입력하세요" ></input></dd>
                    </dl>

                    <dl>
                    <dt>맛집 유형</dt>
                        <dd>
                           <select v-model="restaurantFood" class="restaurant-select">
                            <!-- <option value="" hidden>▾</option> -->
                            <option value="KOREAN">한식</option>
                            <option value="JAPANESE">일식</option>
                            <option value="CHINESE">중식</option>
                            <option value="WESTERN">양식</option>
                            <option value="THAI">태국식</option>
                            <option value="MEXICAN">멕시코식</option>
                            <option value="INDONESIAN">인도네시아식</option>
                            <option value="SEAFOOD">해산물 식당</option>
                            <option value="BAKERY">빵집</option>
                          </select>
                        </dd>
                    </dl>

                    <dl>
                    <dt>맛집 태그</dt>
                        <dd>
                            <input type="text" v-model="restaurantInfo" placeholder="맛집 태그를 입력하세요"></input>
                        </dd>
                    </dl>

                  <div class="room-deal-information-container">
                    <div class="room-deal-information-title">사진 등록</div>
                    <div class="room-picture-notice">
                      <ul class="room-write-wrapper">
                        <li>맛집 정보를 담은 사진 등록을 권합니다.</li>
                        <li>사진은 8장까지 등록 가능합니다.</li>
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

                  <div class="valid_form_button text-center">
                      <v-btn @click="onSubmit">등록</v-btn>
                  </div>                       
                  <router-link class="cancel-link" :to="{ name: 'RestaurantListPage' }">취소</router-link>

                </li>
                </v-form>  
            </ul>
        </div>
      </div>
</template>

<script>
import AWS from 'aws-sdk'
import env from '@/env'

export default {
  data() {
    return {
      restaurantName: '',
      restaurantInfo: null,
      restaurantNumber: '',
      restaurantFood: '',

      restaurantTime: '',
      restaurantOpeningTime: null,
      restaurantClosingTime: null,

      postcode: '',
      oneAddress: '',
      detailAddress: '',
      imageUrls: [],

      imagePreviews: [],
      file: [],
      s3fileList: [],
      awsBucketName: env.api.MAIN_AWS_BUCKET_NAME,
      awsBucketRegion: env.api.MAIN_AWS_BUCKET_REGION,
      awsIdentityPoolId: env.api.MAIN_AWS_IDENTITY_POOL_ID,
      s3: null,
      // startAfterAwsS3Bucket: null,

      menuItems: [{ menuItem: "", menuPrice: "" }],
      isAddMenuItem: false
    }
  },

  mounted() {
    this.userToken = localStorage.getItem("userToken")
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
        alert('상호명을 입력해주세요!');
        return;
      }

      if (!this.restaurantNumber) {
        alert('전화번호를 입력해주세요!');
        return;
      }

      if (!this.menuItems) {
        alert('메뉴를 최소 1개 입력해주세요!');
        return;
      }

      if (!this.oneAddress) {
        alert('주소를 입력해주세요!');
        return;
      }

      await this.uploadAwsS3()

      const foodType = this.restaurantFood

      this.restaurantAddress = this.combineAddress();
      this.restaurantTime = this.combineRestaurantTime();

      const { restaurantName, restaurantNumber, menuItems, restaurantAddress, restaurantTime, restaurantInfo, userToken, imageUrls } = this;

      this.$emit("submit", { restaurantName, restaurantNumber, menuItems, restaurantAddress, restaurantTime, foodType, restaurantInfo, userToken, imageUrls });
      await this.$router.push({ name: 'RestaurantListPage' });
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

      // Todo: for문 없이 여러장 올라가도 되도록 (올라갈 때 alert 띄우면 한장마다 다 올라감)
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

    addMenuItem() {
      this.menuItems.push({ menuItem: "", menuPrice: "" });
    },

    removeMenuItem(index) {
      this.menuItems.splice(index, 1);
    },

    // 전화번호 숫자만 입력 가능하게
    restrictToNumeric(event) {
      this.result = event.target.value
    },

    openPostcodeSearch() {
      const vm = this;

      new window.daum.Postcode({
        oncomplete: function (data) {
          if (vm.oneAddress !== "") {
            vm.oneAddress = "";
          }
          if (data.userSelectedType === "R") {
            vm.oneAddress = data.roadAddress;
          } else {
            vm.oneAddress = data.jibunAddress;
          }

          if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              vm.oneAddress += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
              vm.oneAddress +=
                vm.oneAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            if (vm.oneAddress !== "") {
              vm.oneAddress = `(${vm.oneAddress})`;
            }
          } else {
            vm.oneAddress = "";
          }
          vm.postcode = data.zonecode;
        },
      }).open();
    },

    combineAddress() {
      const combinedAddress = `(${this.postcode}) ${this.oneAddress} ${this.detailAddress}`;
      return combinedAddress.trim();
    },

    combineRestaurantTime() {
      const combineRestaurantTime = `${this.restaurantOpeningTime} - ${this.restaurantClosingTime}`;
      return combineRestaurantTime.trim();
    },
  },
}
</script>

<style scoped>
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

.room-file-notice-item {
  margin-top: 5px;
  text-align: center;
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

.restaurant_register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -50px;
  margin-bottom: 30px;
}

.contents_name {
  display: flex;
  justify-content: center;
}

.edit2_myinfo_bigbox {
  max-width: 500px;
  flex-direction: column;
  align-items: center;
  padding: 24px 20px 20px 20px;
  box-sizing: border-box;
}

.edit2_form_list1 li dl {
  display: table;
  table-layout: fixed;
  width: 600px;
  padding-bottom: 16px;
}

.edit2_form_list1 li dl dt {
  display: table-cell;
  width: 140px;
  padding-right: 10px;
  line-height: 1.37;
  color: #555;
}

.edit2_form_list1 li dl dd {
  display: table-cell;
  color: #555;
}

.edit2_form_list1 li dl dd input {
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 30px;
  width: 200px;
  padding-left: 5px
}

.edit2_form_list1 li dl dd textarea {
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 30px;
  width: 200px;
  padding-left: 5px
}

.edit2_form_list1 li dl dd input[type="time"]:hover {
  cursor: pointer;
}

.edit2_form_list1 li dl dd select {
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 30px;
  width: 200px;
  padding-left: 5px
}

.edit2_form_list1 li dl dd select:hover {
  cursor: pointer;
}

.edit2_form_list1 li dl dd input::placeholder {
  font-size: 13px;
}

.edit2_form_list1 li dl dd textarea::placeholder {
  font-size: 13px;
}

.edit2_form_list1 {
  border-bottom: 1px solid rgb(146, 134, 134);
  padding: 0 20px 30px 0;
  display: block;
  margin-top: 35px;
}

.required {
  color: red;
  float: right;
  margin-top: 3px;
}

.required_explain {
  color: red;
  margin-bottom: 30px;
}

.contents_required {
  color: gray;
  margin-bottom: 20px;
  font-size: 13px;
  float: right;
}

input[type="date"].placeholder {
  color: gray;
  font-size: 13px;
}

.input-error {
  line-height: 16px;
  font-size: 11px;
  color: red;
}

.input-message {
  line-height: 16px;
  font-size: 11px;
  margin-left: 5px;
}

.input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>