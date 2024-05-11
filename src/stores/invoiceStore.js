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
    sortInvoice(criteria, mode) {
      if (criteria === 'defaultValue') {
        this.invoices = this.temp
      } else if (criteria === 'employee') {
        this.invoices = this.invoices
          .slice()
          .sort((a, b) => a.employee.name.localeCompare(b.employee.name))
      } else if (criteria === 'table') {
        this.invoices = this.invoices
          .slice()
          .sort((a, b) => a.table.name.localeCompare(b.table.name))
      } else if (criteria === 'totalPrice') {
        this.invoices = this.invoices.slice().sort((a, b) => a.totalPrice - b.totalPrice)
      } else if (criteria === 'createdTime') {
        this.invoices = this.invoices
          .slice()
          .sort((a, b) => -a.createdTime.localeCompare(b.createdTime))
      }

      if (mode === 'desc') {
        this.invoices = this.invoices.slice().reverse()
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
    },
    async deleteInvoice(invoiceId) {
      try {
        const endpoint = `/invoices/${invoiceId}`
        const response = await axiosInstance.delete(endpoint)
        await this.fetchInvoices()
        return response
      } catch (error) {
        console.error('Error fetching invoices:', error)
      }
    }
  }
})
