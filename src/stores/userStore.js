import { defineStore } from 'pinia'
import Cookies from 'vue-cookies'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser() {
      try {
        const employeeInfo = Cookies.get('employeeInfo')
        if (employeeInfo) {
          this.user = employeeInfo
          return employeeInfo
        } else {
          throw new Error('User info not found in cookies')
        }
      } catch (error) {
        console.error('Error fetching user:', error.message)
        throw error
      }
    }
  }
})
