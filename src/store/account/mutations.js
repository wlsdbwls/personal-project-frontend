import {
    LOGIN_COMPLETE,
    REQUEST_ACCOUNT_TO_SPRING,
    SET_ACCOUNT_ID,
} from './mutation-types'

export default {
    [LOGIN_COMPLETE](state, receivedData) {
        state.isAuthenticated = receivedData
    },
    [REQUEST_ACCOUNT_TO_SPRING](state, receivedData) {
        state.account = receivedData
    },
    [SET_ACCOUNT_ID](state, receivedData) {
        state.accountId = receivedData
    },
}