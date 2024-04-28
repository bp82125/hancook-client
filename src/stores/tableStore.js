import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'
import { signOut } from '@/services/auth'
import anyAscii from 'any-ascii'

export const useTableStore = defineStore({
  id: 'tables',
  state: () => ({
    tables: [],
    temp: []
  }),
  actions: {
    async searchTable(name) {
      try {
        if (name === '') {
          this.tables = this.temp
        } else {
          this.tables = this.tables.filter((table) =>
            anyAscii(table.name.toLowerCase()).includes(anyAscii(name.toLowerCase()))
          )
        }
      } catch (error) {
        console.error('Failed to search tables:', error)
      }
    },
    async fetchTable() {
      try {
        const response = await axiosInstance.get('/tables')
        this.tables = response.data.data
        this.tables = this.tables.sort(
          (a, b) => parseInt(a.name.split(' ').pop()) - parseInt(b.name.split(' ').pop())
        )
        this.temp = this.tables
      } catch (error) {
        console.error('Failed to fetch tables:', error)
        signOut()
      }
    },
    async createTable(data) {
      try {
        const response = await axiosInstance.post('/tables', data)
        this.fetchTable()
        return response
      } catch (error) {
        console.error('Failed to create table:', error)
        signOut()
      }
    },
    async updateTable(id, data) {
      try {
        const response = await axiosInstance.put(`/tables/${id}`, data)
        this.fetchTable()
        return response
      } catch (error) {
        console.error('Failed to update table:', error)
        signOut()
      }
    },
    async deleteTable(id) {
      try {
        const response = await axiosInstance.delete(`/tables/${id}`)
        this.fetchTable()
        return response
      } catch (error) {
        console.error('Failed to delete table:', error)
        signOut()
      }
    }
  }
})
