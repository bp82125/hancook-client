import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'
import { signOut } from '@/services/auth'
import { useEmployeeStore } from './employeeStore'
import anyAscii from 'any-ascii'

const employeeStore = useEmployeeStore()

export const useAccountStore = defineStore({
  id: 'accounts',
  state: () => ({
    accounts: [],
    temp: []
  }),
  actions: {
    async searchAccount(username) {
      try {
        if (username === '') {
          this.accounts = this.temp
          return
        }
        this.accounts = this.accounts.filter((account) =>
          anyAscii(account.username.toLowerCase()).includes(anyAscii(username.toLowerCase()))
        )
      } catch (error) {
        console.error('Failed to fetch accounts:', error)
      }
    },
    async sortAccounts(criteria, mode) {
      if (criteria === 'defaultValue') {
        this.accounts = this.temp.slice()
      } else if (criteria === 'employee') {
        this.accounts = this.temp
          .slice()
          .sort((a, b) => a.employeeName.localeCompare(b.employeeName))
      } else if (criteria === 'username') {
        this.accounts = this.temp.slice().sort((a, b) => a.username.localeCompare(b.username))
      } else if (criteria === 'role') {
        this.accounts = this.temp.slice().sort((a, b) => a.role.localeCompare(b.role))
      } else if (criteria === 'enabled') {
        this.accounts = this.temp.slice().sort((a, b) => -a.enabled + b.enabled)
      }

      if (mode === 'desc') {
        this.accounts = this.accounts.slice().reverse()
      }
    },
    async fetchAccounts() {
      try {
        const response = await axiosInstance.get('/accounts')
        this.accounts = response.data.data
        this.temp = response.data.data
        return response
      } catch (error) {
        console.error('Failed to fetch accounts:', error)
        signOut()
      }
    },
    async updateAccount(id, accountData) {
      try {
        const response = await axiosInstance.put(`/accounts/${id}`, accountData)
        await this.fetchAccounts()
        return response
      } catch (error) {
        console.error('Failed to update accounts:', error)
        signOut()
      }
    },
    async toggleAccount(id) {
      try {
        await axiosInstance.put(`/accounts/toggle/${id}`)
        await this.fetchAccounts()
      } catch (error) {
        console.error('Failed to toggle account:', error)
        signOut()
      }
    },
    async resetPassword(id, passwordData) {
      try {
        const response = await axiosInstance.patch(`/accounts/resetPassword/${id}`, passwordData)
        await this.fetchAccounts()
        return response
      } catch (error) {
        console.error('Failed to reset password:', error)
      }
    },
    async changePassword(id, passwordData) {
      try {
        const response = await axiosInstance.patch(`/accounts/changePassword/${id}`, passwordData)
        await this.fetchAccounts()
        return response
      } catch (error) {
        console.error('Failed to change password:', error)
        return error.response
      }
    },
    async createAccount(accountData) {
      try {
        const response = await axiosInstance.post('/accounts', accountData)
        await this.fetchAccounts()
        await employeeStore.fetchEmployees()
        return response
      } catch (error) {
        console.error('Failed to create accounts:', error)
      }
    },
    async deleteAccount(id) {
      try {
        const response = await axiosInstance.delete(`accounts/${id}`)
        await this.fetchAccounts()
        return response
      } catch (error) {
        console.error('Failed to delete accounts:', error)
      }
    }
  }
})
