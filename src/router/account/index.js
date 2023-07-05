import Vue from 'vue'
import VueRouter from 'vue-router'

import SelectAccountTypePage from '@/views/account/SelectAccountTypePage.vue'
import NormalAccountRegisterPage from '@/views/account/NormalAccountRegisterPage.vue'

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
]

export default accountRoutes
