<template lang="">
    <v-container >
        <div class="normal_account_register" style="padding-top: 100px; padding-bottom: 100px;">
        <div class="normal_regist">
            <h2 class="contents_name">로그인</h2>
        </div>
        <div class="edit2_myinfo_bigbox">
            <ul class="edit2_form_list1">
                <v-form @submit.prevent="onSubmit" ref="form">
                <li>
                    <dl>
                        <dt>이메일</dt>
                        <dd>
                            <input type="text" v-model="email" placeholder="이메일을 입력하세요" />
                            <p v-show="email && !validateEmail()" class="input-error">이메일 주소를 정확히 입력해주세요</p>
                        </dd>
                    </dl>

                    <dl>
                    <dt>비밀번호</dt>
                        <dd>
                            <input :type="showPassword ? 'text' : 'password'" v-model="password" onpaste="return false" oncopy="return false" placeholder="비밀번호를 입력하세요"></input>
                             <div class="eyes" @click="togglePasswordVisibility">
                            <v-icon style="font-size:20px;">{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                            </div>
                            <p v-show="password && !validatePassword()" class="input-error">비밀번호는 8글자 이상 소문자, 숫자, 특수문자를 모두 포함해야 합니다.</p>
                        </dd>
                    </dl>

                    <div class="valid_form_button">
                        <v-btn type="submit" x-large
                        :disabled="!isLoginValid()">로그인</v-btn>
                    </div>                       
                </li>
                </v-form>  
            </ul>
            <div class="check_membership">
                아직 가입하지 않으셨나요? <button style="color: #DBA901" @click="goToSelectAccountPage()">회원가입</button>
            </div>
        </div>
        </div>
</v-container>
</template>

<script>
import router from '@/router'

export default {
    data() {
        return {
            email: "",
            emailPass: false,
            password: "",
            showPassword: false,
        }
    },
    methods: {
        onSubmit() {
            if (this.$refs.form.validate()) {
                const { email, password } = this
                this.$emit("submit", { email, password })
            } else {
                alert('올바른 정보를 입력하세요!') // 에러 메시지 설정
            }

            const { email, password } = this
            this.$emit('submit', { email, password })
        },

        isLoginValid() {
            const isEmailValid = this.validateEmail();
            const isPasswordValid = this.validatePassword();

            return isEmailValid && isPasswordValid
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

        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },

        goToSelectAccountPage() {
            router.push('/select-account-type').catch(() => { })
        },
    }
}
</script>

<style scoped>
.normal_account_register {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* max-height: 400px; */
    padding-bottom: 200px;
}

.contents_name {
    display: flex;
    justify-content: center;
}

.edit2_myinfo_bigbox {
    max-width: 460px;
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
    line-height: 1.37;
    color: #555;
    font-size: 18px;
}

.edit2_form_list1 li dl dd {
    display: table-cell;
    color: #555;
}

.edit2_form_list1 li dl dd input {
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 50px;
    width: 250px;
    padding-left: 5px
}

.edit2_form_list1 li dl dd input::placeholder {
    font-size: 15px;
    margin-left: 3px;
}

.edit2_form_list1 {
    border-bottom: 1px solid rgb(146, 134, 134);
    padding: 0 20px 30px 0;
    display: block;
    margin-top: 35px;
}

.check_membership {
    margin-top: 10px;
}

.valid_form_button {
    margin-top: 10px;
    margin-left: 170px;
}

.input-error {
    line-height: 16px;
    font-size: 11px;
    color: red;
}

.eyes {
    float: right;
    cursor: pointer;
    margin-right: 180px;
    margin-top: 10px;
}
</style>