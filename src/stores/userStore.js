import { defineStore } from 'pinia'
import Cookies from 'vue-cookies'
import axiosInstance from '@/plugins/axios'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      name: 'Administrator',
      position: {
        positionName: 'Quản trị'
      },
      phoneNumber: '0123456789'
    }
  }),
  actions: {
    async fetchUser() {
      const accountInfo = Cookies.get('accountInfo')

      if (accountInfo.employeeId) {
        const response = await axiosInstance.get(`/employees/${accountInfo.employeeId}`)
        this.user = response.data.data
      }
    }
  }
})
