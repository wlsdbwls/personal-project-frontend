<template lang="">
    <v-container class="signupContainer">
    <v-card id="signupVcard" justify-center>
        <h1>BUSINESS JOIN</h1>
        <div>
            <v-card-text class="text-center px-12 py-16">
                <v-form @submit.prevent="onSubmit" ref="form">
                <table id="signupTable">
                        <div class="d-flex">
                            <v-text-field
                                v-model="email"
                                label="email을 입력하세요" 
                                :rules="email_rule"
                                :disabled="false"
                                filled
                                outlined
                                required>
                            </v-text-field>
                            <v-btn text large outlined style="font-size: 13px"
                                    class="mt-3 ml-1" color="teal lighten-1"
                                    @click="checkDuplicateEmail">
                                    이메일 <br/>중복확인
                            </v-btn>
                            <!-- 
                                중복 확인 버튼을 누르면 바로 이메일로 코드를 보냈다고 하고
                                코드 입력 폼이 나오는 것이 나을 것 같음 
                                근데 이메일이 입력된 것이 확인되면 넘어가야 함
                            -->                            
                        </div>
                        <!-- <div v-if="checkDuplicateEmail === true">
                            <email-authentication-form/>
                        </div> -->
                        <div class="d-flex">
                            <v-text-field
                                v-model="businessNumber"
                                label="사업자 번호를 입력하세요" 
                                :rules="businessNumber_rule"
                                :disabled="false"
                                filled
                                outlined
                                required>
                            </v-text-field>
                            <v-btn text large outlined style="font-size: 13px"
                                    class="mt-3 ml-1" color="teal lighten-1"
                                    @click="checkBusinessNumber">
                                    사업자 <br/>인증하기
                            </v-btn>
                        </div>
                        <div class="d-flex">
                            <v-text-field
                                v-model="password"
                                label="password를 입력하세요" 
                                :rules="password_rule"
                                :disabled="false"
                                filled
                                outlined
                                required>
                            </v-text-field>
                        </div>
                        <div class="d-flex">
                            <v-text-field
                                v-model="password_chk"
                                label="password를 확인하세요" 
                                :rules="password_check"
                                :disabled="false"
                                filled
                                outlined
                                required>
                            </v-text-field>
                        </div>
                        <div>
                            <v-btn type="submit" block x-large rounded
                            color="orange lighten-1" class="mt-6"
                            :disabled="!isFormValid()">회원 가입하기</v-btn>
                        </div>
                </table>
                </v-form>
            </v-card-text>
        </div>
    </v-card>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

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

            businessNumber: "",
            businessNumber_rule: [
                v => !!v || '사업자 번호를 입력하세요',
                v => v.length >= 10 || '사업자 번호는 10자리로 구성됩니다.',
                v => (v >= 1000000000 && v <= 9999999999) || '올바른 사업자 번호를 입력해주세요!.'
            ],

            password: "",
            // passwordPass: false,
            password_rule: [
                v => !!v || '비밀번호를 입력하세요',
                v => v.length >= 8 || '비밀번호는 최소 8자 이상이어야 합니다.',
                v => /(?=.*[a-z])(?=.*\d)(?=.*(_|[^\w])).+/g.test(v) || '비밀번호는 소문자, 숫자, 특수문자를 모두 포함해야 합니다.'
            ],
            password_chk: "",
            password_check: [
                v => !!v || '비밀번호를 확인하세요',
                v => v === this.password || '비밀번호가 일치하지 않습니다.'
            ],
        }
    },
    methods: {
        ...mapActions('accountModule', ['requestSpringToCheckEmailDuplication']),
        onSubmit() {
            if (this.$refs.form.validate()) {
                const { email, password, businessNumber } = this
                this.$emit("submit", { email, password, businessNumber })
            } else {
                alert('올바른 정보를 입력하세요!')
            }

            if (!this.emailPass) {
                alert("이메일 중복 확인을 해주세요!")
            }
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
        },
        isFormValid() {
            return this.emailPass && this.email_rule[1](this.email) === true
        },
        checkBusinessNumber() {

        },
    },
}
</script>

<style scoped>
.signupContainer {
    display: flex;
    justify-content: center;
}

#signupVcard {
    width: 460px;
    height: 610px;
    margin-top: 30px;
    padding-top: 30px;
    padding-left: 18px;
}
</style>