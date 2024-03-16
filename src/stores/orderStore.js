import { defineStore } from 'pinia'

export const useOrderStore = defineStore({
  id: 'order',
  state: () => ({
    order: {
      employeeId: null,
      customerId: null,
      tableId: null,
      details: []
    }
  }),
  actions: {
    async createOrder(employeeId, customerId, tableId) {
      this.order.employeeId = employeeId
      this.order.customerId = customerId
      this.order.tableId = tableId

      console.log(this.order)
    },

    async addToOrder(orderDetail) {
      console.log(orderDetail)
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
      const indexToRemove = this.items.findIndex((item) => item.dish.id === id)
      if (indexToRemove !== -1) {
        this.items.splice(indexToRemove, 1)
      }
    }
  }
})
