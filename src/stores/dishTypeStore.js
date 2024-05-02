import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const useDishTypeStore = defineStore({
  id: 'dishTypes',
  state: () => ({
    dishTypes: [],
    temp: []
  }),
  actions: {
    async fetchDishTypes() {
      try {
        const response = await axiosInstance.get('/dishTypes')
        this.dishTypes = response.data.data
        this.temp = response.data.data
      } catch (error) {
        console.error('Failed to fetch dish types:', error)
      }
    },
    sortDishTypes(criteria, mode) {
      if (criteria === 'defaultValue') {
        this.dishTypes = this.temp.slice()
      } else if (criteria === 'name') {
        this.dishTypes = this.dishTypes
          .slice()
          .sort((a, b) => a.dishTypeName.localeCompare(b.dishTypeName))
      } else if (criteria === 'numberOfDishes') {
        this.dishTypes = this.dishTypes.slice().sort((a, b) => a.numberOfDishes - b.numberOfDishes)
      }

      if (mode === 'desc') {
        this.dishTypes = this.dishTypes.slice().reverse()
      }
    },
    async createDishType(data) {
      try {
        const response = await axiosInstance.post('/dishTypes', data)
        await this.fetchDishTypes()
        return response
      } catch (error) {
        console.error('Failed to create dish types:', error)
      }
    },

    async updateDishType(id, data) {
      try {
        const response = await axiosInstance.put(`/dishTypes/${id}`, data)
        await this.fetchDishTypes()
        return response
      } catch (error) {
        console.error('Failed to update dish types:', error)
      }
    },

    async deleteDishType(id) {
      try {
        const response = await axiosInstance.delete(`/dishTypes/${id}`)
        await this.fetchDishTypes()
        return response.data.success
      } catch (error) {
        console.error('Failed to delete dish types:', error)
        return error.response.data.success
      }
    }
  }
})
