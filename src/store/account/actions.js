import router from '@/router'
import axiosInst from '@/utility/axiosInst'

import {
    LOGIN_COMPLETE,
    REQUEST_ACCOUNT_TO_SPRING,
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
                    alert('로그인 성공!');
                    router.push('/').catch(() => { });
                    commit(LOGIN_COMPLETE, true)
                    return localStorage.setItem("userToken", resLogin.data);
                } else {
                    alert('이메일과 비밀번호를 다시 확인해주세요!');
                    location.reload();
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
            .catch(() => {
                alert("통신이 불가합니다")
            })
    },
    requestAccountIdToSpring({ }, payload) {
        const { userToken } = payload

        return axiosInst.springAxiosInst.post('/account/return-accountId', { userToken })
            .then((resAccountId) => {
                if (resAccountId.data !== "") {
                    console.log('accountId: ' + resAccountId.data)
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
            .catch(() => {
                alert("회원이 존재하지 않습니다.");
            });
    },
}