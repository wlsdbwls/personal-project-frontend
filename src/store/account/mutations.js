import {
    LOGIN_COMPLETE,
    REQUEST_ACCOUNT_TO_SPRING,
} from './mutation-types'

export default {
    [LOGIN_COMPLETE](state, receivedData) {
        state.isAuthenticated = receivedData
    },
    [REQUEST_ACCOUNT_TO_SPRING](state, receivedData) {
        state.account = receivedData
    },
}