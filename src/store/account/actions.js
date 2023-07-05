import router from '@/router'
import axiosInst from '@/utility/axiosInst'

export default {
    requestNormalRegisterAccountToSpring({ }, payload) {
        const roleType = 'NORMAL'; // roleType 값을 'NORMAL'로 설정
        payload.roleType = roleType; // payload에 roleType 추가

        return axiosInst.springAxiosInst.post('/account/normal-register', payload)
            .then((resNormalRegister) => {
                if(resNormalRegister.data == true) {
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
            .then((res) => {
                if (res.data) {
                    alert('사용 가능한 이메일입니다!')
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
}