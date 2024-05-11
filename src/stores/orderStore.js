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
      temp: [],
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
        this.order.temp = order.details
        this.order.placedTime = order.placedTime
      } catch (error) {
        console.error('Error fetching order:', error)
      }
    },

    sortOrders(criteria, mode) {
      if (criteria === 'defaultValue') {
        this.order.details = this.order.temp.slice()
      } else if (criteria === 'dish') {
        this.order.details = this.order.details.sort((a, b) =>
          a.dish.dishName.localeCompare(b.dish.dishName)
        )
      } else if (criteria === 'type') {
        this.order.details = this.order.details.sort((a, b) =>
          a.dish.dishType.dishTypeName.localeCompare(b.dish.dishType.dishTypeName)
        )
      } else if (criteria === 'price') {
        this.order.details = this.order.details.sort(
          (a, b) => a.dish.price * a.quantity - b.dish.price * b.quantity
        )
      } else if (criteria === 'quantity') {
        this.order.details = this.order.details.sort((a, b) => a.quantity - b.quantity)
      }

      if (mode === 'desc') {
        this.order.details = this.order.details.slice().reverse()
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
        this.fetchOrder(this.order.table.id)
        return response
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

        await this.fetchOrder(this.order.table.id)
        return true
      } catch (error) {
        console.error('Error updating all order details:', error)
        return false
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
        this.$reset()
        return response
      } catch (error) {
        console.error('Error creating invoice from order:', error)
      }
    }
  }
})
