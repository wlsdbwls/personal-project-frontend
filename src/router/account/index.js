import Vue from 'vue'
import VueRouter from 'vue-router'

import SelectAccountTypePage from '@/views/account/SelectAccountTypePage.vue'
import NormalAccountRegisterPage from '@/views/account/NormalAccountRegisterPage.vue'
import BusinessAccountRegisterPage from '@/views/account/BusinessAccountRegisterPage.vue'
import AccountLoginPage from '@/views/account/AccountLoginPage.vue'

Vue.use(VueRouter)

const accountRoutes = [
    {
        path: '/select-account-type',
        name: 'SelectAccountTypePage',
        component: SelectAccountTypePage
    },
    {
        path: '/signup-normal-account',
        name: 'NormalAccountRegisterPage',
        component: NormalAccountRegisterPage
    },
    {
        path: '/signup-business-account',
        name: 'BusinessAccountRegisterPage',
        component: BusinessAccountRegisterPage
    },
    {
        path: '/signin',
        name: 'AccountLoginPage',
        component: AccountLoginPage
    },
]

export default accountRoutes
