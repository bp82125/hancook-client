import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import axiosInstance from '@/plugins/axios'

const userStore = useUserStore()

export const useOrderStore = defineStore({
  id: 'order',
  state: () => ({
    order: {
      employeeId: null,
      tableId: null,
      details: []
    }
  }),
  actions: {
    async createOrder() {
      try {
        const { employeeId, tableId } = this.order
        const orderData = {
          employeeId,
          tableId
        }
        const orderResponse = await axiosInstance.post('/orders', orderData)
        console.log('Order created:', orderResponse.data)

        const orderId = orderResponse.data.data.id
        const orderDetailsData = this.order.details.map((detail) => ({
          orderId,
          dishId: detail.dish.id,
          quantity: detail.quantity,
          note: detail.note
        }))

        for (const detailData of orderDetailsData) {
          const detailResponse = await axiosInstance.post(
            `/orders/${orderId}/details/${detailData.dishId}`,
            detailData
          )
          console.log('Order detail created:', detailResponse.data.data)
        }

        this.clearAll()
      } catch (error) {
        console.error('Error creating order:', error)
        throw error
      }
    },

    async addToOrder(orderDetail) {
      const existingItemIndex = this.order.details.findIndex(
        (item) => item.dish.id === orderDetail.dish.id
      )

      if (existingItemIndex !== -1) {
        this.order.details[existingItemIndex].quantity += orderDetail.quantity
        this.order.details[existingItemIndex].note += ' ' + orderDetail.note
      } else {
        this.order.details.push(orderDetail)
      }
    },
    async clearAll() {
      this.$reset()
    },
    async removeItem(id) {
      const indexToRemove = this.order.details.findIndex((item) => item.dish.id === id)
      if (indexToRemove !== -1) {
        this.order.details.splice(indexToRemove, 1)
      }
    },

    async getOrder(tableId) {
      try {
        const response = await axiosInstance.get(`/tables/${tableId}/orders`)
        return response.data.data
      } catch (error) {
        console.error('Error creating order:', error)
        throw error
      }
    }
  },
  initialize() {
    userStore.fetchUser()
  }
})
