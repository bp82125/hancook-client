import axios from 'axios'
import Cookies from 'vue-cookies'
import router from '@/router/index'
import { useUserStore } from '@/stores/userStore'

export function signOut() {
  Cookies.remove('accessToken')
  Cookies.remove('employeeId')

  router.push({ name: 'main' })
  const userStore = useUserStore()
  userStore.$reset()
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

      Cookies.set('accessToken', token)

      const employeeId = accountInfo.employeeId

      Cookies.set('employeeId', employeeId)

      const role = accountInfo.role
      if (role === 'admin') {
        router.push({ name: 'home' })
      } else {
        router.push({ name: 'dish' })
      }

      return true
    }
    return false
  } catch (error) {
    console.error('Login failed:', error)
    return false
  }
}
