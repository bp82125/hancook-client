import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'
import { signOut } from '@/services/auth'

export const useDishTypeStore = defineStore({
  id: 'dishTypes',
  state: () => ({
    dishTypes: []
  }),
  actions: {
    async fetchDishTypes() {
      try {
        const response = await axiosInstance.get('/dishTypes')
        this.dishTypes = response.data.data
      } catch (error) {
        console.error('Failed to fetch dish types:', error)
        signOut()
      }
    },
    async createDishType(data) {
      try {
        const response = await axiosInstance.post('/dishTypes', data)
        this.fetchDishTypes()
        return response
      } catch (error) {
        console.error('Failed to create dish types:', error)
        signOut()
      }
    },

    async updateDishType(id, data) {
      try {
        const response = await axiosInstance.put(`/dishTypes/${id}`, data)
        this.fetchDishTypes()
        return response
      } catch (error) {
        console.error('Failed to update dish types:', error)
        signOut()
      }
    },

    async deleteDishType(id) {
      try {
        const response = await axiosInstance.delete(`/dishTypes/${id}`)
        this.fetchDishTypes()
        return response.data.success
      } catch (error) {
        console.error('Failed to delete dish types:', error)
        return error.response.data.success
      }
    }
  }
})
