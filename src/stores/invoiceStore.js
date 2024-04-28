import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'
import anyAscii from 'any-ascii'

export const useInvoiceStore = defineStore({
  id: 'invoice',
  state: () => ({
    invoices: [],
    temp: []
  }),
  actions: {
    async searchInvoice(id) {
      try {
        if (id === '') {
          this.invoices = this.temp
        } else {
          this.invoices = this.invoices.filter((invoice) =>
            anyAscii(invoice.id.toLowerCase()).includes(anyAscii(id.toLowerCase()))
          )
        }
      } catch (error) {
        console.error('Error searching invoices:', error)
      }
    },
    async fetchInvoices() {
      try {
        const endpoint = `/invoices`
        const response = await axiosInstance.get(endpoint)
        this.invoices = response.data.data
        this.temp = response.data.data
      } catch (error) {
        console.error('Error fetching invoices:', error)
      }
    }
  }
})
