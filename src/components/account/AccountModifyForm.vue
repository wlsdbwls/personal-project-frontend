<template>
    <div>
        <div class="contents_box1">
            <h2 class="contents_name">내 정보 관리</h2>
        </div>

        <div class="edit2_myinfo_bigbox">
            <ul class="edit2_form_list1">
                <li>
                    <h5 class="edit2_form_title">기본 정보</h5>
                    <dl>
                        <dt>이메일</dt>
                        <dd>{{ account.email }}</dd>
                    </dl>
                    <dl>
                        <dt>이름</dt>
                        <dd>{{ account.userName }}</dd>
                    </dl>
                    <dl>
                        <dt>성별</dt>
                        <dd>{{ account.gender }}</dd>
                    </dl>
                    <dl>
                        <dt>생년월일</dt>
                        <dd>{{ account.birth }}</dd>
                    </dl>
                    <dl>
                        <dt>닉네임</dt>
                        <dd id="nickName">{{ account.nickName }}</dd>
                        <dd class="edit2_form_list_button">
                            <a @click="showModal('nickname')">변경</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt>주소</dt>
                        <dd id="address">{{ account.address }}</dd>
                        <dd class="edit2_form_list_button">
                            <a @click="showModal('address')">변경</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt>비밀번호</dt>
                        <dd class="edit2_form_list_button">
                            <a @click="showModal('password')">변경</a>
                        </dd>
                    </dl>
                </li>
            </ul>
            <!-- <ul class="edit2_form_list2">
                <li>
                    <h5 class="edit2_form_title">간편 로그인</h5>
                    <dl>
                        <dt>카카오로 로그인</dt>
                        <dd>
                            <label for="switch_check1" class="switch_label">
                                <div class="slide_checkbox">
                                    <input type="checkbox" id="switch_check1" class="radio_hide">
                                </div>
                                <div class="slider"></div>
                            </label>
                        </dd>
                    </dl>
                    <dl>
                        <dt>구글로 로그인</dt>
                        <dd>
                            <label for="switch_check1" class="switch_label">
                                <div class="slide_checkbox">
                                    <input type="checkbox" id="switch_check2" class="radio_hide">
                                </div>
                                <div class="slider"></div>
                            </label>
                        </dd>
                    </dl>
                </li>
            </ul> -->

            <a @click="byeFoodFoot" class="withdrawal_button">회원탈퇴</a>

        </div>

        <!-- 닉네임 변경 모달 -->
        <v-dialog v-model="showNicknameModal" max-width="800px">
            <v-card>
                <v-card-title style="justify-content: center;">
                    <div class="headline">닉네임 변경</div>
                </v-card-title>
                <v-card-text v-if="isPasswordVerified === false">
                    <h5 class="list_title">비밀번호를 입력해 주세요</h5>
                    <input type="password" v-model="checkPassword" name="pwd" id="pwd" placeholder="영문+숫자 10자 이상으로 입력해주세요.">
                    <v-btn @click="verifyPassword">확인</v-btn>
                </v-card-text>
                <v-card-text v-if="isPasswordVerified === true">
                    <h5 class="list_title">새로운 닉네임을 입력해 주세요</h5>
                    <input type="text" v-model="newNickname" placeholder="영문자, 한글, 숫자로 1~8글자 이내로 입력하세요.">
                    <v-btn @click="changeNickname">저장</v-btn>
                </v-card-text>
                <v-card-actions style="justify-content: center;">
                    <v-btn @click="closeModal('nickname')">취소</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- 주소 변경 모달 -->
        <v-dialog v-model="showAddressModal" max-width="800px">
            <v-card>
                <v-card-title style="justify-content: center;">
                    <div class="headline">주소 변경</div>
                </v-card-title>
                <v-card-text v-if="isPasswordVerified === false">
                    <h5 class="list_title">비밀번호를 입력해 주세요</h5>
                    <input type="password" v-model="checkPassword" name="pwd" id="pwd"
                        placeholder="영문+숫자+특수 기호 8글자 이상으로 입력해주세요.">
                    <v-btn @click="verifyPassword">확인</v-btn>
                </v-card-text>
                <v-card-text v-if="isPasswordVerified === true">
                    <h5 class="list_title">새로운 주소를 입력해 주세요</h5>
                    <input type="text" @click="openPostcodeSearch()" v-model="newPostcode" placeholder="우편번호" />
                    <v-btn @click="openPostcodeSearch()" text large outlined
                        style="font-size: 13px; margin-left: 20px; width:50px;" class="mt-6">우편번호 <br /> 검색</v-btn>
                    <textarea type="text" id="oneAddress" v-model="newOneAddress" style="height: 80px;"
                        placeholder="주소"></textarea>
                    <br>
                    <input type="text" id="detailAddress" v-model="newDetailAddress" placeholder="상세주소"
                        style="margin-top: 5px;" />
                    <v-btn @click="changeAddress">저장</v-btn>
                </v-card-text>
                <v-card-actions style="justify-content: center;">
                    <v-btn @click="closeModal('address')">취소</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- 비밀번호 변경 모달 -->
        <v-dialog v-model="showPasswordModal" max-width="800px">
            <v-card>
                <v-card-title style="justify-content: center;">
                    <div class="headline">비밀번호 변경</div>
                </v-card-title>
                <v-card-text v-if="isPasswordVerified === false">
                    <h5 class="list_title">비밀번호를 입력해 주세요</h5>
                    <input type="password" v-model="checkPassword" name="pwd" id="pwd"
                        placeholder="영문+숫자+특수 기호 8글자 이상으로 입력해주세요.">
                    <v-btn @click="verifyPassword">확인</v-btn>
                </v-card-text>
                <v-card-text v-if="isPasswordVerified === true">
                    <h5 class="list_title">새로운 비밀번호를 입력해 주세요</h5>
                    <input type="text" v-model="newPassword" placeholder="영문+숫자+특수 기호 8글자 이상으로 입력해주세요.">
                    <v-btn @click="changePassword">저장</v-btn>
                </v-card-text>
                <v-card-actions style="justify-content: center;">
                    <v-btn @click="closeModal('password')">취소</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from '@/router'

const accountModule = 'accountModule'

export default {
    name: "AccountModifyForm",
    props: {
        account: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            showNicknameModal: false,
            showAddressModal: false,
            showPasswordModal: false,
            newNickname: "",
            newAddress: "",
            newPassword: "",
            checkPassword: "",
            email: '',
            responsePassword: '',
            isPasswordVerified: false,
            id: '',
            newPostcode: '',
            newOneAddress: '',
            newDetailAddress: ''
        }
    },

    methods: {
        ...mapActions(accountModule, ["requestVerifyPasswordToSpring", "requestChangeNicknameToSpring",
            "requestChangeAddressToSpring", "requestChangePasswordToSpring", "requestDeleteAccountToSpring"]),

        showModal(modalType) {
            switch (modalType) {
                case "nickname":
                    this.showNicknameModal = true;
                    break;
                case "address":
                    this.showAddressModal = true;
                    break;
                case "password":
                    this.showPasswordModal = true;
                    break;
            }
        },
        closeModal(modalType) {
            switch (modalType) {
                case "nickname":
                    this.showNicknameModal = false;
                    break;
                case "address":
                    this.showAddressModal = false;
                    break;
                case "password":
                    this.showPasswordModal = false;
                    break;
            }
        },

        // 닉네임 변경
        async changeNickname() {
            if (this.newNickname === this.account.nickName) {
                alert("새로운 닉네임이 이전 닉네임과 동일합니다.");
                return;
            }

            this.newNickname = await this.requestChangeNicknameToSpring({ id: this.account.id, newNickname: this.newNickname });
            this.closeModal("nickname");
            location.reload();
        },

        // 주소 변경
        async changeAddress() {
            const newCombinedAddress = this.combineAddress();

            if (newCombinedAddress === this.account.address) {
                alert("새로운 주소가 이전 주소와 동일합니다.");
                return;
            }

            this.newAddress = await this.requestChangeAddressToSpring({ id: this.account.id, newAddress: newCombinedAddress });
            this.closeModal("address");
            location.reload();
        },


        // 비밀번호 변경
        async changePassword() {
            if (this.newPassword === this.account.password) {
                alert("새로운 비밀번호가 이전 비밀번호와 동일합니다.");
                return;
            }

            this.newPassword = await this.requestChangePasswordToSpring({ id: this.account.id, newPassword: this.newPassword })
            this.closeModal("password");
            location.reload()
        },

        cancelModify() {
            this.showNicknameModal = false
        },

        // 비밀번호 맞는지 확인
        async verifyPassword() {
            this.responsePassword = await this.requestVerifyPasswordToSpring({ email: this.account.email })

            if (this.responsePassword === this.checkPassword) {
                this.isPasswordVerified = true
            } else {
                this.isPasswordVerified = false
                alert('비밀번호가 일치하지 않습니다!')
            }
        },

        openPostcodeSearch() {
            const vm = this;

            new window.daum.Postcode({
                oncomplete: function (data) {
                    if (vm.newOneAddress !== "") {
                        vm.newOneAddress = "";
                    }
                    if (data.userSelectedType === "R") {
                        vm.newOneAddress = data.roadAddress;
                    } else {
                        vm.newOneAddress = data.jibunAddress;
                    }

                    if (data.userSelectedType === "R") {
                        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                            vm.newOneAddress += data.bname;
                        }
                        if (data.buildingName !== "" && data.apartment === "Y") {
                            vm.newOneAddress +=
                                vm.newOneAddress !== ""
                                    ? `, ${data.buildingName}`
                                    : data.buildingName;
                        }
                        if (vm.newOneAddress !== "") {
                            vm.newOneAddress = `(${vm.newOneAddress})`;
                        }
                    } else {
                        vm.newOneAddress = "";
                    }
                    vm.newPostcode = data.zonecode;
                },
            }).open();
        },

        combineAddress() {
            const combinedAddress = `${this.newPostcode} ${this.newOneAddress} ${this.newDetailAddress}`;
            return combinedAddress.trim();
        },

        async byeFoodFoot() {
            if (confirm("정말로 탈퇴하시겠습니까?")) {
                await this.requestDeleteAccountToSpring({ id: this.account.id });
                alert('탈퇴가 완료되었습니다! 이용해주셔서 감사합니다')

                try {
                    await router.push('/');
                } catch (error) {
                    console.error("메인 페이지로 이동하는데 에러가 발생했습니다:", error);
                }
            }
        },

    },
}

</script>

<style scoped>
.edit2_myinfo_bigbox {
    display: block;
    padding: 24px 20px 20px 20px;
    box-sizing: border-box;
}

.edit2_myinfo_bigbox div {
    box-sizing: border-box;
    display: block;
}

.edit2_form_list1,
.edit2_form_list2,
.edit2_form_list4 {
    border-bottom: 1px solid rgb(146, 134, 134);
    padding: 0 20px 30px 0;
    display: block;
    margin-top: 35px;
}

.edit2_form_title {
    position: relative;
    margin-bottom: 20px;
    color: #333;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.44;
    letter-spacing: -.8px;
    display: block;
}

/* 상위요소 > display: table */
.edit2_myinfo_bigbox .edit2_form_list1 li dl,
.edit2_form_list2 li dl,
.edit2_form_list4 li dl {
    display: table;
    table-layout: fixed;
    width: 100%;
    padding-bottom: 16px;
}

/* 하위요소 > display: table-cell 시작 */
.edit2_myinfo_bigbox .edit2_form_list1 li dl dt {
    display: table-cell;
    width: 100px;
    padding-right: 10px;
    box-sizing: border-box;
    line-height: 1.37;
    color: #555;
    word-break: keep-all;
}

.edit2_form_list2 li dl dt {
    display: table-cell;
    width: 170px;
    padding-right: 10px;
    box-sizing: border-box;
    line-height: 1.37;
    color: #555;
    word-break: keep-all;
}

.edit2_form_list4 li dl dt {
    display: table-cell;
    width: 50%;
    padding-right: 10px;
    box-sizing: border-box;
    line-height: 1.37;
    color: #555;
    word-break: keep-all;
    vertical-align: middle;
}

.edit2_myinfo_bigbox .edit2_form_list1 li dl dd,
.edit2_form_list2 li dl dd {
    display: table-cell;
    color: #555;
}

.edit2_form_list4 li dl dd {
    text-align: right;
    vertical-align: middle;
    display: table-cell;
    color: #555;
}

/* 하위요소 > display: table-cell 끝 */
.edit2_form_list_button {
    width: 20%;
    text-align: right;
}

.edit2_form_list_button>a {
    width: 54px;
    background-color: #ededed;
    color: #333;
    height: 30px;
    padding: 5px 16px;
    box-sizing: border-box;
    border-radius: 18px;
    font-size: 13px;
    font-weight: 700;
    text-align: center;
    line-height: 30px;
    letter-spacing: -.5px;
    outline: none;
}

.edit2_form_list_button>a:hover {
    cursor: pointer;
}

.edit2_form_list2>li>dl:nth-child(2)>dt::before {
    content: '';
    background: url('~@/assets/edit_kakao.png') center center no-repeat;
    width: 30px;
    height: 30px;
    margin-right: 8px;
    display: inline-block;
    vertical-align: -8px;
    background-size: contain;
}

.edit2_form_list2>li>dl:nth-child(3)>dt::before {
    content: '';
    background: url('~@/assets/⁯edit_google.png') center center no-repeat;
    width: 28px;
    height: 27px;
    margin-right: 9px;
    display: inline-block;
    vertical-align: -8px;
    background-size: contain;
}


.switch_label {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 14px;
    top: .5px;
    left: 550px;
    cursor: pointer;
}

.slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ccc;
    border-radius: 7px;
}

.slide_checkbox {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 14px;
    margin-right: 0;
    background: none;
    cursor: pointer;
}

.slide_checkbox+.slider::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    left: -2px;
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 50%;
    background: #e2e2e2;
    transition: all 0.4s;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 20%);
}

.switch_label:hover>.slider::before {
    background: #00B081;
    transform: translate(14px, -50%);
    transition: all 0.4s;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 20%);
}

.withdrawal_button {
    min-width: auto;
    font-size: 12px;
    color: gray;
}

.withdrawal_button:hover {
    cursor: pointer;
}

.list_title {
    font-size: 14px;
    color: #333;
    font-weight: 700;
    line-height: 1.57;
    letter-spacing: -.6px;
    justify-content: center;
}
</style>