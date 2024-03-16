import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'
import { signOut } from '@/services/auth'

export const useExpenseStore = defineStore({
  id: 'expenses',
  state: () => ({
    expenses: []
  }),
  actions: {
    async fetchExpenses() {
      try {
        const response = await axiosInstance.get('/expenses')
        this.expenses = response.data.data
        return response
      } catch (error) {
        console.log('Failed to fetch expenses')
        signOut()
      }
    }
  }
})
