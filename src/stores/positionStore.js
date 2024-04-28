import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'
import { signOut } from '@/services/auth'
import anyAscii from 'any-ascii'

export const usePositionStore = defineStore({
  id: 'positions',
  state: () => ({
    positions: [],
    temp: []
  }),
  actions: {
    async searchPosition(name) {
      try {
        if (name === '') {
          this.positions = this.temp
          return
        } else {
          this.positions = this.positions.filter((position) =>
            anyAscii(position.positionName.toLowerCase()).includes(anyAscii(name.toLowerCase()))
          )
        }
      } catch (error) {
        console.log('Error searching positions', error)
      }
    },
    async fetchPositions() {
      try {
        const response = await axiosInstance.get('/positions')
        this.positions = response.data.data
        this.temp = response.data.data
      } catch (error) {
        console.error('Failed to fetch positions:', error)
        signOut()
      }
    },
    async createPosition(positionData) {
      try {
        await axiosInstance.post('/positions', positionData)
        await this.fetchPositions() // Refresh positions data
      } catch (error) {
        console.error('Error creating position:', error)
        signOut()
      }
    },
    async updatePosition(id, positionData) {
      try {
        await axiosInstance.put(`/positions/${id}`, positionData)
        await this.fetchPositions()
      } catch (error) {
        console.error('Error creating position:', error)
        signOut()
      }
    },
    async deletePosition(id) {
      try {
        await axiosInstance.delete(`/positions/${id}`)
        await this.fetchPositions()
      } catch (error) {
        console.error('Error deleting position:', error)
        signOut()
      }
    }
  }
})
