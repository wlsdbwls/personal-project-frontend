import Vue from 'vue'
import VueRouter from 'vue-router'

import SelectAccountTypePage from '@/views/account/SelectAccountTypePage.vue'

Vue.use(VueRouter)

const accountRoutes = [
    {
        path: '/select-account-type',
        name: 'SelectAccountTypePage',
        component: SelectAccountTypePage
    },
]

export default accountRoutes
