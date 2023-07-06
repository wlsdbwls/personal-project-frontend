<template lang="">
    <v-container class="container">
    <v-card id="loginVcard" justify-center>
        <h1>LOGIN</h1>
        <div style="display: flex; justify-content: center; padding-bottom: 20px; padding-top: 20px">
            <v-icon size="80" color="#f18893">mdi-login-variant</v-icon>
        </div>
        <div>
            <v-card-text>
                <v-form @submit.prevent="onSubmit" id="loginInfo" ref="form">
                <table id="loginTable">
                    <div class="d-flex">
                        <v-text-field
                            v-model="email"
                            label="email을 입력하세요" 
                            :rules="email_rule"
                            :disabled="false"
                            required>
                        </v-text-field>
                    </div>
                    <div class="d-flex">
                        <v-text-field
                            v-model="password"
                            label="password를 입력하세요" 
                            :rules="password_rule"
                            :disabled="false"
                            required>
                        </v-text-field>
                    </div>
                    <div>
                        <a href="/select-account-type" class="signup" alt="회원가입" style="float:right;">회원가입</a>
                    </div>
                    <div>
                        <v-btn type="submit" block x-large rounded
                            color="gray lighten-1" class="mt-6"
                            :disabled="!isLoginValid()">로그인</v-btn>
                    </div>
                </table>
                </v-form>
            </v-card-text>
        </div>
    </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            emailPass: false,
            email_rule: [
                v => !!v || '이메일을 입력해주세요!',
                v => {
                    const replaceV = v.replace(/(\s*)/g, '')
                    const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
                    return pattern.test(replaceV) || '올바른 이메일 형식으로 입력해주세요!'
                }
            ],

            password: "",
            password_rule: [
                v => !!v || '비밀번호를 입력하세요',
                v => v.length >= 8 || '비밀번호는 최소 8자 이상이어야 합니다.',
                v => /(?=.*[a-z])(?=.*\d)(?=.*(_|[^\w])).+/g.test(v) || '비밀번호는 소문자, 숫자, 특수문자를 모두 포함해야 합니다.'
            ],
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
            return this.password_rule[1](this.password) && this.password_rule[2](this.password) === true
        }
    }
}
</script>

<style scoped>
.signup {
    text-decoration-line: none;
    font-size: 11px;
    color: gray;
    padding-top: 4px;
    padding-right: 42px;
    padding-bottom: 18px;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

#loginVcard {
    width: 460px;
    height: 500px;
    margin-top: 60px;
    padding-top: 20px;
}

#loginInfo {
    height: 110px;
}

#loginTable {
    width: 390px;
    height: 80px;
    padding-left: 30px;
}
</style>