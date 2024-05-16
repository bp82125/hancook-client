import { defineStore } from 'pinia'
import Cookies from 'vue-cookies'
import axiosInstance from '@/plugins/axios'
export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser(force = false) {
      if (this.user == null || force) {
        try {
          const employeeId = Cookies.get('employeeId')
          if (employeeId) {
            const response = await axiosInstance.get(`/employees/${employeeId}`)
            const employeeInfo = response.data.data
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
    },
    async isAdmin() {
      await this.fetchUser()
      if (this.user == null) {
        return false
      }
      return this.user.account.role === 'admin'
    }
  }
})
