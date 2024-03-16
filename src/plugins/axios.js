import axios from 'axios';
import Cookies from 'vue-cookies';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Your API base URL
  timeout: 5000, // Timeout duration in milliseconds
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;