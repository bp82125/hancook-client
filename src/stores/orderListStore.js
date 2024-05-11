import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const useOrderListStore = defineStore({
  id: 'orderList',
  state: () => ({ orderList: [], temp: [] }),
  actions: {
    async fetchOrders() {
      try {
        const endpoint = '/tables/orders'
        const response = await axiosInstance.get(endpoint)
        this.orderList = response.data.data
        this.temp = response.data.data
        return response
      } catch (error) {
        console.log('Error fetching orders', error)
      }
    },
    sortOrders(criteria, mode) {
      if (criteria === 'defaultValue') {
        this.orderList = this.temp.slice()
      } else if (criteria === 'employee') {
        this.orderList = this.orderList
          .slice()
          .sort((a, b) => a.employee.name.localeCompare(b.employee.name))
      } else if (criteria === 'table') {
        this.orderList = this.orderList
          .slice()
          .sort((a, b) => a.table.name.localeCompare(b.table.name))
      } else if (criteria === 'time') {
        this.orderList = this.orderList
          .slice()
          .sort((a, b) => a.placedTime.localeCompare(b.placedTime))
      }

      if (mode === 'desc') {
        this.orderList = this.orderList.slice().reverse()
      }
    }
  }
})
