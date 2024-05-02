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

    sortDishes(criteria, mode) {
      if (criteria === 'defaultValue') {
        this.dishes = this.temp.slice()
      } else if (criteria === 'name') {
        this.dishes = this.dishes.slice().sort((a, b) => a.dishName.localeCompare(b.dishName))
      } else if (criteria === 'price') {
        this.dishes = this.dishes.slice().sort((a, b) => a.price - b.price)
      }

      if (mode === 'desc') {
        this.dishes = this.dishes.slice().reverse()
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
        await this.fetchDishes()
        return response
      } catch (error) {
        console.error('Failed to create a dish:', error)
        signOut()
      }
    },

    async updateDish(id, data) {
      try {
        const response = await axiosInstance.put(`/dishes/${id}`, data)
        await this.fetchDishes()
        return response
      } catch (error) {
        console.error('Failed to create a dish:', error)
        signOut()
      }
    },

    async deleteDish(id) {
      try {
        const response = await axiosInstance.delete(`/dishes/${id}`)
        await this.fetchDishes()
        return response
      } catch (error) {
        console.error('Failed to delete a dish:', error)
        signOut()
      }
    }
  }
})
