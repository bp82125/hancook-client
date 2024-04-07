import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const useInvoiceDetailStore = defineStore({
  id: 'invoiceDetail',
  state: () => ({
    invoice: null,
    details: []
  }),
  actions: {
    async fetchDetails(invoiceId) {
      try {
        const [invoiceResponse, detailsResponse] = await Promise.all([
          axiosInstance.get(`/invoices/${invoiceId}`),
          axiosInstance.get(`/invoices/${invoiceId}/details`)
        ])

        this.invoice = invoiceResponse.data.data
        this.details = detailsResponse.data.data
      } catch (error) {
        console.error('Error fetching invoice details:', error)
      }
    },
  }
})
