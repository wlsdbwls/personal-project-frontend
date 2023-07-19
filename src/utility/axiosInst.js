import axios from "axios";
import env from '@/env'

const springAxiosInst = axios.create({
    // baseURL: 'http://localhost:7777',
    baseURL: env.api.MAIN_API_URL,
    timeout: 2500,
    // withCredentials: true
})

const fastApiAxiosInst = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 2500
})

export default {
    springAxiosInst,
    fastApiAxiosInst,
}