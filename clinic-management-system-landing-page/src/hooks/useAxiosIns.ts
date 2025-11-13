import axios from 'axios'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_GATEWAY_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

// Initialize FingerprintJS and add request interceptor
const fpPromise = FingerprintJS.load()

axiosInstance.interceptors.request.use(
    async config => {
        const fp = await fpPromise
        const result = await fp.get()
        config.headers.Fingerprint = result.visitorId
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
