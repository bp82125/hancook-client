import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

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
      }
    },

    async createExpense(data) {
      try {
        const response = await axiosInstance.post('/expenses', data)
        this.fetchExpenses()
        return response
      } catch (error) {
        console.log('Failed to create expense')
      }
    },

    async updateExpense(id, data) {
      try {
        const endpont = `/expenses/${id}`
        const response = await axiosInstance.put(endpont, data)
        this.fetchExpenses()
        return response
      } catch (error) {
        console.log('Failed to update expense')
      }
    },
    async deleteExpense(id) {
      try {
        const endpont = `/expenses/${id}`
        const response = await axiosInstance.delete(endpont)
        this.fetchExpenses()
        return response
      } catch (error) {
        console.log('Failed to delete expense')
      }
    }
  }
})
