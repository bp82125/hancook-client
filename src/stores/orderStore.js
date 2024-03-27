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

    async deleteDetail(tableId, dishId) {
      try {
        console.log(`/tables/orders/${this.order.id}/details/${dishId}`)
        // const response = await axiosInstance.delete(
        //   `/tables/orders/${this.order.id}/details/${dishId}`
        // )
        // this.fetchOrder(this.order.table.id)
      } catch (error) {
        console.error('Error deleting order detail:', error)
      }
    },

    async updateDetail(tableId, detail) {
      try {
        const endpoint = `/tables/orders/${this.order.id}/details/${detail.dish.id}`
        const request = {
          quantity: detail.quantity,
          note: detail.quantity
        }
        const response = await axiosInstance.put(
          `/tables/orders/${this.order.id}/details/${detail.dish.id}`,
          request
        )
        this.fetchOrder(this.order.table.id)

        console.log(test)
      } catch (error) {
        console.error('Error deleting order detail:', error)
      }
    }
  }
})
