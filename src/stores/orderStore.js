import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const useOrderStore = defineStore({
  id: 'order',
  state: () => ({
    order: {
      id: null,
      employee: null,
      table: null,
      details: [],
      placedTime: null
    }
  }),
  actions: {
    async fetchOrder(tableId) {
      try {
        const response = await axiosInstance.get(`/tables/${tableId}/orders`)
        const order = response.data.data

        this.order.id = order.id
        this.order.employee = order.employee
        this.order.table = order.table
        this.order.details = order.details
        this.order.placedTime = order.placedTime
      } catch (error) {
        console.error('Error fetching order:', error)
      }
    },

    async deleteDetail(detail) {
      try {
        const endpoint = `/tables/orders/${this.order.id}/details/${detail.dish.id}`
        const response = await axiosInstance.delete(endpoint)
        console.log(response)
        this.fetchOrder(this.order.table.id)
      } catch (error) {
        console.error('Error deleting order detail:', error)
      }
    },

    async updateDetail(detail) {
      try {
        const endpoint = `/tables/orders/${this.order.id}/details/${detail.dish.id}`
        const request = {
          quantity: detail.quantity,
          note: detail.note
        }
        console.log(endpoint)
        const response = await axiosInstance.put(endpoint, request)
        this.fetchOrder(this.order.table.id)
      } catch (error) {
        console.error('Error deleting order detail:', error)
      }
    }
  }
})
