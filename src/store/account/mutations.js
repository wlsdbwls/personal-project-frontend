import {
    LOGIN_COMPLETE,
} from './mutation-types'

export default {
    [LOGIN_COMPLETE](state, receivedData) {
        state.isAuthenticated = receivedData
    },
}