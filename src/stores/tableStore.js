import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'
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
    async sortTable(criteria, mode) {
      if (criteria === 'defaultValue') {
        this.tables = this.temp
      } else if (criteria === 'name') {
        this.tables = this.tables.slice().sort((a, b) => this.customCompare(a.name, b.name))
      } else if (criteria === 'state') {
        this.tables = this.tables.slice().sort((a, b) => -a.state.localeCompare(b.state))
      }

      if (mode === 'desc') {
        this.tables = this.tables.slice().reverse()
      }
    },
    async fetchTable() {
      try {
        const response = await axiosInstance.get('/tables')
        this.tables = response.data.data
        this.temp = this.tables
      } catch (error) {
        console.error('Failed to fetch tables:', error)
      }
    },
    async createTable(data) {
      try {
        const response = await axiosInstance.post('/tables', data)
        await this.fetchTable()
        return response
      } catch (error) {
        console.error('Failed to create table:', error)
      }
    },
    async updateTable(id, data) {
      try {
        const response = await axiosInstance.put(`/tables/${id}`, data)
        await this.fetchTable()
        return response
      } catch (error) {
        console.error('Failed to update table:', error)
      }
    },
    async deleteTable(id) {
      try {
        const response = await axiosInstance.delete(`/tables/${id}`)
        await this.fetchTable()
        return response
      } catch (error) {
        console.error('Failed to delete table:', error)
      }
    },
    customCompare(a, b) {
      function extractNumber(str) {
        str = String(str)
        const numMatch = str.match(/\d+/)
        return numMatch ? parseInt(numMatch[0]) : NaN
      }

      // Extract numerical parts from both strings
      const numA = extractNumber(a)
      const numB = extractNumber(b)

      // If both strings have numbers, compare them numerically
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB
      }
      // If only one string has a number, it should come first
      else if (!isNaN(numA)) {
        return -1
      } else if (!isNaN(numB)) {
        return 1
      }
      // If neither string has a number, compare them alphabetically
      else {
        return a.localeCompare(b)
      }
    }
  }
})
