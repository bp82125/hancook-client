import axios from 'axios'
import Cookies from 'vue-cookies'
import router from '@/router/index'
import axiosInstance from '@/plugins/axios'

export function signOut() {
  Cookies.remove('accessToken')
  Cookies.remove('employeeInfo')

  router.push({ name: 'dashboard' })
}

export async function login(username, password) {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v1/accounts/login',
      {
        username,
        password
      },
      {
        auth: {
          username,
          password
        }
      }
    )

    if (response.data.success) {
      const { accountInfo, token } = response.data.data

      Cookies.set('accessToken', token, {
        expires: '2h',
        secure: true,
        httpOnly: true
      })

      const employeeId = accountInfo.employeeId
      const employeeResponse = await axiosInstance.get(`/employees/${employeeId}`)
      const employeeInfo = employeeResponse.data.data

      Cookies.set('employeeInfo', employeeInfo, {
        expires: '2h',
        secure: true,
        httpOnly: true
      })

      router.push({ name: 'dashboard' })
      return true
    }
    return false
  } catch (error) {
    console.error('Login failed:', error)
    return false // Login failed
  }
}
