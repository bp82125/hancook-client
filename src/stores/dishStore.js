import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'
import { signOut } from '@/services/auth'

export const useDishStore = defineStore({
  id: 'dishes',
  state: () => ({
    dishes: []
  }),
  actions: {
    async fetchDishes() {
      try {
        const response = await axiosInstance.get('/dishes')
        this.dishes = response.data.data
      } catch (error) {
        console.error('Failed to fetch dishes:', error)
        signOut()
      }
    },
    async createDish(data) {
      try {
        const response = await axiosInstance.post('/dishes', data)
        this.fetchDishes()
        return response
      } catch (error) {
        console.error('Failed to create a dish:', error)
        signOut()
      }
    },

    async updateDish(id, data) {
      try {
        const response = await axiosInstance.put(`/dishes/${id}`, data)
        this.fetchDishes()
        return response
      } catch (error) {
        console.error('Failed to create a dish:', error)
        signOut()
      }
    },

    async deleteDish(id) {
      try {
        const response = await axiosInstance.delete(`/dishes/${id}`)
        this.fetchDishes()
        return response
      } catch (error) {
        console.error('Failed to delete a dish:', error)
        signOut()
      }
    }
  }
})
