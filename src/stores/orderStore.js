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

    async createDetail(orderId, dishId, detail) {
      try {
        const response = await axiosInstance.post(
          `tables/orders/${orderId}/details/${dishId}`,
          detail
        )
        console.log(response)
        this.fetchOrder(this.order.table.id)
      } catch (error) {
        console.error('Error creating order detail:', error)
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
        const response = await axiosInstance.put(endpoint, request)
        console.log(response)
        this.fetchOrder(this.order.table.id)
      } catch (error) {
        console.error('Error deleting order detail:', error)
      }
    },

    async updateAllDetails() {
      try {
        const updatePromises = this.order.details.map(async (detail) => {
          const endpoint = `/tables/orders/${this.order.id}/details/${detail.dish.id}`
          const request = {
            quantity: detail.quantity,
            note: detail.note
          }
          await axiosInstance.put(endpoint, request)
        })

        await Promise.all(updatePromises)

        // After updating all details, fetch the updated order
        await this.fetchOrder(this.order.table.id)
      } catch (error) {
        console.error('Error updating all order details:', error)
      }
    },

    async deleteOrder() {
      try {
        const endpoint = `tables/${this.order.table.id}/orders/`
        await axiosInstance.delete(endpoint)
        this.$reset()
      } catch (error) {
        console.error('Error deleting order:', error)
      }
    },
    calculateTotalPrice() {
      const totalPrice =
        this.order.details.reduce((acc, item) => acc + item.quantity * item.dish.price, 0) * 1.1
      return Math.floor(totalPrice)
    },

    async payOrder(data) {
      try {
        const endpoint = `/orders/${this.order.id}/invoices`
        const response = await axiosInstance.post(endpoint, data)
        console.log(response)
        this.$reset()
      } catch (error) {
        console.error('Error creating invoice from order:', error)
      }
    }
  }
})
