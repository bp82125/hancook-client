import axios from 'axios'
import Cookies from 'vue-cookies'
import { signOut } from '@/services/auth'
import { useToast } from 'vue-toastification'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL, // Your API base URL
  timeout: 5000 // Timeout duration in milliseconds
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      const toast = useToast()
      toast.error('Phiên sử dụng đã hết hạn, hãy đăng nhập lại')
      signOut()
    } else {
      console.log('Error', error)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
