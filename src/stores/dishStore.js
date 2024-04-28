import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'
import { signOut } from '@/services/auth'
import anyAscii from 'any-ascii'

export const useDishStore = defineStore({
  id: 'dishes',
  state: () => ({
    dishes: [],
    temp: []
  }),
  actions: {
    async searchDish(name) {
      try {
        console.log('hi')
        if (name === '') {
          this.dishes = this.temp
        } else {
          this.dishes = this.dishes.filter((dish) =>
            anyAscii(dish.dishName.toLowerCase()).includes(anyAscii(name.toLowerCase()))
          )
        }
      } catch (error) {
        console.error('Failed to search dishes:', error)
      }
    },

    async fetchDishes() {
      try {
        const response = await axiosInstance.get('/dishes')
        this.dishes = response.data.data
        this.temp = response.data.data
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
