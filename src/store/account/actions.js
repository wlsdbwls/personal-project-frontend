import router from '@/router'
import axiosInst from '@/utility/axiosInst'

import {
    LOGIN_COMPLETE,
    REQUEST_ACCOUNT_TO_SPRING,
    SET_ACCOUNT_ID,
} from './mutation-types'

export default {
    requestNormalRegisterAccountToSpring({ }, payload) {
        const roleType = 'NORMAL'; // roleType 값을 'NORMAL'로 설정
        payload.roleType = roleType; // payload에 roleType 추가

        return axiosInst.springAxiosInst.post('/account/normal-register', payload)
            .then((resNormalRegister) => {
                if (resNormalRegister.data == true) {
                    alert('개인 회원 가입 성공')
                    router.push('/signin')
                } else {
                    alert('개인 회원 가입 실패!')
                }
            })
    },
    requestSpringToCheckEmailDuplication({ }, payload) {
        const { email } = payload
        console.log('email: ' + email)

        return axiosInst.springAxiosInst.get(`/account/check-email/${email}`)
            .then((resCheckedEmail) => {
                if (resCheckedEmail.data) {
                    alert('사용 가능한 이메일입니다! 이메일을 확인하여 인증코드를 작성해주세요!')
                    return true
                } else {
                    alert('중복된 이메일입니다!')
                    return false
                }
            })
            .catch((res) => {
                alert("문제 발생!")
            })
    },
    requestCheckBusinessNumberToSpring({ }, payload) {
        const { businessNumber } = payload
        console.log('businessNumber: ' + businessNumber)

        return axiosInst.springAxiosInst.get(`/account/check-businessNumber/${businessNumber}`)
            .then((resCheckedBusinessNumber) => {
                if (resCheckedBusinessNumber.data) {
                    alert('사용 가능한 사업자 번호입니다!')
                    return true
                } else {
                    alert('중복된 사업자 번호입니다!')
                    return false
                }
            })
            .catch((res) => {
                alert("문제 발생!")
            })
    },
    requestCheckNicknameToSpring({ }, payload) {
        const { nickName } = payload
        console.log('nickName: ' + nickName)

        return axiosInst.springAxiosInst.get(`/account/check-nickname/${nickName}`)
            .then((resCheckedNickname) => {
                if (resCheckedNickname.data) {
                    alert('사용 가능한 닉네임입니다!')
                    return true
                } else {
                    alert('중복된 닉네임입니다!')
                    return false
                }
            })
            .catch((res) => {
                alert("문제 발생!")
            })
    },
    requestBusinessRegisterAccountToSpring({ }, payload) {
        const roleType = 'BUSINESS';
        payload.roleType = roleType;

        return axiosInst.springAxiosInst.post('/account/business-register', payload)
            .then((resBusinessRegister) => {
                if (resBusinessRegister.data == true) {
                    alert('사업자 회원 가입 성공')
                    router.push('/signin')
                } else {
                    alert('사업자 회원 가입 실패!')
                }
            })
    },
    requestLoginAccountToSpring({ commit }, payload) {

        return axiosInst.springAxiosInst.post('/account/login', payload)
            .then((resLogin) => {
                if (resLogin.data !== "") {
                    // alert('로그인 성공!');
                    router.push('/').catch(() => { });
                    commit(LOGIN_COMPLETE, true)
                    return localStorage.setItem("userToken", resLogin.data);
                } else {
                    alert('이메일과 비밀번호를 다시 확인해주세요!');
                }
            })
    },
    requestEmailToSpring({ }, payload) {
        const { userToken } = payload

        return axiosInst.springAxiosInst.post('/account/return-email', { userToken })
            .then((resEmail) => {
                if (resEmail.data !== "") {
                    // alert('이메일 반환 성공!');
                    return this.email = resEmail.data;
                }
            })
    },
    requestAccountIdToSpring({ commit }, payload) {
        const { userToken } = payload

        return axiosInst.springAxiosInst.post('/account/return-accountId', { userToken })
            .then((resAccountId) => {
                if (resAccountId.data !== "") {
                    console.log('accountId: ' + resAccountId.data)
                    // this.accountId = resAccountId.data
                    commit(SET_ACCOUNT_ID, resAccountId.data)
                    return localStorage.setItem("accountId", resAccountId.data);
                }
            })
            .catch(() => {
                alert("통신이 불가합니다")
            })
    },
    requestEmailCodeToSpring({ }, payload) {
        const { email } = payload

        return axiosInst.springAxiosInst.post(`/account/mail-confirm/${email}`)
            .then((resEmailCode) => {
                console.log('emailCode: ' + resEmailCode.data)
                return resEmailCode.data
            })
            .catch(() => {
                alert("이메일 코드 통신이 불가합니다")
            })
    },
    requestAccountToSpring({ commit }, payload) {
        const { userToken } = payload
        return axiosInst.springAxiosInst.post('account/give-info', { userToken })
            .then((resAccountRead) => {
                console.log("회원 정보: " + JSON.stringify(resAccountRead.data));
                commit(REQUEST_ACCOUNT_TO_SPRING, resAccountRead.data);
            })
        // .catch(() => {
        //     alert("회원이 존재하지 않습니다.");
        // });
    },
    requestVerifyPasswordToSpring({ }, payload) {
        const { email } = payload

        return axiosInst.springAxiosInst.post("/account/check-password", { email })
            .then((resCheckPassword) => {
                console.log('올바른 password:' + resCheckPassword.data)
                return resCheckPassword.data
            })
            .catch(() => {
                alert("비밀번호 확인 통신이 불가합니다")
            })
    },
    requestChangeNicknameToSpring({ }, payload) {
        const { id, newNickname } = payload

        return axiosInst.springAxiosInst.put(`/account/change-nickname/${id}`, { id, nickName: newNickname })
            .then((resNewNickname) => {
                if (resNewNickname.data) {
                    alert("닉네임이 수정되었습니다.");
                    return resNewNickname.data;
                }
            })
            .catch(() => {
                alert("닉네임 수정 통신 실패");
            });
    },
    requestChangeAddressToSpring({ }, payload) {
        const { id, newAddress } = payload

        return axiosInst.springAxiosInst.put(`/account/change-address/${id}`, { id, address: newAddress })
            .then((resNewAddress) => {
                if (resNewAddress.data) {
                    alert("주소가 수정되었습니다.");
                    return resNewAddress.data;
                }
            })
            .catch(() => {
                alert("주소 수정 통신 실패");
            });
    },
    requestChangePasswordToSpring({ }, payload) {
        const { id, newPassword } = payload

        return axiosInst.springAxiosInst.put(`/account/change-password/${id}`, { id, password: newPassword })
            .then((resNewPassword) => {
                if (resNewPassword.data) {
                    alert("비밀번호가 수정되었습니다.");
                    return resNewPassword.data;
                }
            })
            .catch(() => {
                alert("비밀번호 수정 통신 실패");
            });
    },
    requestDeleteAccountToSpring({ }, payload) {
        const { id } = payload

        return axiosInst.springAxiosInst.delete(`/account/${id}`, { id })
            .then((resAccountDelete) => {
            })
            .catch(() => {
                alert("회원 탈퇴 실패");
            });
    },
    requestNicknameToSpring({ }, id) {

        return axiosInst.springAxiosInst.get(`/account/return-nickname/${id}`)
            .then((resNickname) => {
                console.log('닉네임: ' + resNickname.data)
                return resNickname.data
            })
            .catch(() => {
                alert("닉네임을 받아올 수 없습니다")
            })
    },
    requestAccountRoleToSpring({ }, payload) {
        const { id } = payload

        return axiosInst.springAxiosInst.get(`/account/return-roleType/${id}`)
            .then((resAccountRole) => {
                console.log('회원 유형: ' + resAccountRole.data)
                return resAccountRole.data
            })
        // .catch(() => {
        //     alert("회원 유형을 받아올 수 없습니다")
        // })
    },
}