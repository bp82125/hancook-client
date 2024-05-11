import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const useChartStore = defineStore({
  id: 'chart',
  state: () => ({
    profits: null,
    tableStates: null,
    dishCounts: null
  }),
  actions: {
    async fetchProfits(params) {
      try {
        const response = await axiosInstance.get('/charts/profits', { params: params })
        this.profits = response.data.data
        return response
      } catch (error) {
        console.log('Error fetching profits', error)
      }
    },
    async fetchTableStates() {
      try {
        const response = await axiosInstance.get('/charts/tables')
        this.tableStates = response.data.data
        return response
      } catch (error) {
        console.log('Error fetching table states', error)
      }
    },
    async fetchDishCounts(timeRange = 'allTime') {
      try {
        const response = await axiosInstance.get('/charts/dishes', {
          params: { timeRange: timeRange }
        })
        console.log(response)
        this.dishCounts = response.data.data
        return response
      } catch (error) {
        console.log('Error fetching dishes', error)
      }
    }
  }
})
