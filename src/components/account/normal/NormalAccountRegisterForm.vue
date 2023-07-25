<template lang="">
    <v-container class="normal_account_register ">
        <div class="normal_regist">
            <h2 class="contents_name">개인회원 회원가입</h2>
        </div>
        <div class="edit2_myinfo_bigbox">
            <p class="contents_required"><span class="required_explain">*</span>표시는 필수입력 정보입니다</p>
            <ul class="edit2_form_list1">
                <v-form @submit.prevent="onSubmit" ref="form">
                <li>

                    <dl>
                        <dt><span class="required">*</span>이메일</dt>
                        <dd>
                            <input type="text" v-model="email" placeholder="이메일을 입력하세요" />
                            <v-btn text large outlined style="font-size: 13px; margin-left: 20px; width:50px;" @click="checkDuplicateEmail">
                            이메일 중복 <br/> 확인
                            </v-btn>
                            <p v-show="email && !validateEmail()" class="input-error">이메일 주소를 정확히 입력해주세요</p>
                        </dd>
                    </dl>

                    <dl>
                        <dt><span class="required">*</span>이메일 인증번호</dt>
                        <dd>
                            <input type="text" v-model="verificationCode" placeholder="인증 코드를 입력하세요" />
                            <v-btn text large outlined style="font-size: 13px; margin-left: 20px; width:50px;" @click="verifyEmail">
                            이메일 인증 
                            </v-btn>
                            <p style="font-size: 13px;" v-if="isEmailVerified">이메일이 인증되었습니다.</p>
                        </dd>
                    </dl>

                    <dl>
                    <dt><span class="required">*</span>비밀번호</dt>
                        <dd>
                            <input :type="showPassword ? 'text' : 'password'" v-model="password" onpaste="return false" oncopy="return false" placeholder="비밀번호를 입력하세요"></input>
                             <div class="eyes" @click="togglePasswordVisibility">
                            <v-icon style="font-size:20px;">{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                            </div>
                            <p v-show="password && !validatePassword()" class="input-error">비밀번호는 8글자 이상 소문자, 숫자, 특수문자를 모두 포함해야 합니다.</p>
                        </dd>
                    </dl>

                    <dl>
                    <dt><span class="required">*</span>비밀번호 확인</dt>
                        <dd>
                            <input type="password" v-model="password_chk" onpaste="return false" oncopy="return false" @copy="cantCopyPassword(event)" placeholder="비밀번호를 확인하세요"></input>
                            <p v-show="password_chk && !validatePasswordCheck()" class="input-error">비밀번호를 일치시켜주세요</p>
                        </dd>
                    </dl>

                    <dl>
                    <dt><span class="required">*</span>이름</dt>
                        <dd>
                            <input type="text" v-model="userName" placeholder="성명을 입력하세요" ></input>
                            <!-- 이름도 유효성 검사 필요한가? -->
                            <!-- <p v-show="userName && !validateUserName()" class="input-error">성명은 2자 이상의 영문자 또는 한글로 입력하세요.</p>                         -->
                        </dd>
                    </dl>

                    <dl>
                    <dt><span class="required">*</span>닉네임</dt>
                        <dd>
                            <input type="text" v-model="nickName" placeholder="닉네임을 입력하세요"></input>
                            <p v-show="nickName && !validateNickName()" class="input-error">닉네임은 영문자, 한글, 숫자로 1~8글자 이내로 입력하세요.</p>
                        </dd>
                    </dl>

                    <dl>
                    <dt>주소</dt>
                        <dd>
                            <input type="text" @click="openPostcodeSearch()" v-model="postcode" placeholder="우편번호"></input>
                                <v-btn @click="openPostcodeSearch()" text large outlined style="font-size: 13px; margin-left: 20px; width:50px;" class="mt-6">우편번호 <br/> 검색</v-btn>
                            <textarea type="text" id="oneAddress" v-model="oneAddress" style="height: 80px;" placeholder="주소"></textarea>
                            <br>
                            <input type="text" id="detailAddress" v-model="detailAddress" placeholder="상세주소" style="margin-top: 5px;"></input>
                        </dd>
                    </dl>

                    <dl>
                    <dt>성별</dt>
                        <dd>
                           <select v-model="gender" class="gender-select">
                                <option value="" hidden></option>
                                <option value="male">남</option>
                                <option value="female">여</option>
                            </select>
                        </dd>
                    </dl>

                    <dl>
                    <dt>생년월일</dt>
                        <dd>
                            <input type="date" v-model="birth" :class="{ 'placeholder': !birth }"></input>
                        </dd>
                    </dl>
                    <div class="valid_form_button text-center">
                        <v-btn type="submit" 
                        :disabled="!isFormValid()">회원 가입하기</v-btn>
                    </div>                       
                </li>
                </v-form>  
            </ul>
            <div class="check_membership">
                이미 가입 하셨나요? <button style="color: #DBA901" @click="goToLoginPage()">로그인</button>
            </div>
        </div>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import router from '@/router'

const accountModule = 'accountModule'

export default {
    data() {
        return {
            email: "",
            emailPass: false,
            verificationCode: "",
            isEmailVerified: false,
            code: "",

            password: "",
            password_chk: "",
            showPassword: false,

            postcode: "",
            oneAddress: "",
            detailAddress: "",

            nickName: "",
            userName: "",
            birth: "",
            gender: "",
        }
    },
    methods: {
        ...mapActions(accountModule, ['requestSpringToCheckEmailDuplication',
            'requestEmailCodeToSpring']),
        async onSubmit() {
            if (!this.email) {
                alert("이메일을 입력해주세요!")
                return;
            }
            if (!this.emailPass) {
                alert("이메일 중복 확인을 해주세요!")
                return;
            }
            if (!this.password) {
                alert("비밀번호를 입력해주세요!")
                return;
            }
            if (!this.password_chk) {
                alert("비밀번호를 확인해주세요!")
            }
            if (!this.userName) {
                alert("성명을 입력해주세요!")
                return;
            }
            if (!this.nickName) {
                alert("닉네임을 입력해주세요!")
                return;
            }
            if (!this.verificationCode) {
                alert("인증번호를 입력해주세요!")
                return;
            }

            this.address = this.combineAddress()

            if (this.$refs.form.validate()) {
                const { email, password, address, userName, nickName, gender, birth } = this
                this.$emit("submit", { email, password, address, userName, nickName, gender, birth })
            } else {
                alert('올바른 정보를 입력하세요!')
            }
        },

        validateEmail() {
            if (!this.email) return false;

            const replaceV = this.email.replace(/(\s*)/g, '');
            const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
            return pattern.test(replaceV);
        },

        validatePassword() {
            if (!this.password) return false;

            const pattern = /(?=.*[a-z])(?=.*\d)(?=.*(_|[^\w])).+/g;
            return this.password.length >= 8 && pattern.test(this.password);
        },

        validatePasswordCheck() {
            if (!this.password_chk) return false;

            return this.password_chk === this.password;
        },

        // validateUserName() {
        //     if (!this.userName) return false;

        //     const pattern = /^[a-zA-Z가-힣]{2,}$/;
        //     return pattern.test(this.userName);
        // },

        validateNickName() {
            if (!this.nickName) return false;

            const pattern = /^[a-zA-Z가-힣0-9]{1,8}$/;
            return pattern.test(this.nickName);
        },

        async checkDuplicateEmail() {
            const emailValid = this.email.match(
                /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
            this.emailPass = false

            if (emailValid) {
                const { email } = this
                console.log('before actions - email: ' + email)
                this.emailPass = await this.requestSpringToCheckEmailDuplication({ email })
            }

            if (this.emailPass) {
                const { email } = this
                this.code = await this.requestEmailCodeToSpring({ email })
            }
        },

        async verifyEmail() {
            if (this.code === this.verificationCode) {
                this.isEmailVerified = true
            } else {
                this.isEmailVerified = false
                alert("이메일 인증에 실패하였습니다.")
            }
        },

        isFormValid() {
            const isEmailValid = this.validateEmail();
            const isPasswordValid = this.validatePassword();
            const isPasswordCheckValid = this.validatePasswordCheck();
            const isNickNameValid = this.validateNickName();

            return isEmailValid && isPasswordValid && isPasswordCheckValid && isNickNameValid;
        },

        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
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

        goToLoginPage() {
            router.push('/signin').catch(() => { })
        },

        combineAddress() {
            const combinedAddress = `${this.postcode} ${this.oneAddress} ${this.detailAddress}`;
            return combinedAddress.trim();
        },
    },
}
</script>

<style scoped>
.normal_account_register {
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

.edit2_form_list1 li dl dd input[type="date"]:hover {
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

.check_membership {
    margin-top: 10px;
}

.valid_form_button {
    margin-left: 170px;
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

.eyes {
    float: right;
    cursor: pointer;
    margin-right: 235px;
}
</style>