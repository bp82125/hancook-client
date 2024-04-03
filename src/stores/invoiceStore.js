import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const useInvoiceStore = defineStore({
  id: 'invoice',
  state: () => ({
    invoices: []
  }),
  actions: {
    async fetchInvoices() {
      try {
        const endpoint = `/invoices`
        const response = await axiosInstance.get(endpoint)
        this.invoices = response.data.data
      } catch (error) {
        console.error('Error fetching invoices:', error)
      }
    }
  }
})
