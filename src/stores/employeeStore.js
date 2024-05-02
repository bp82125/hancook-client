import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'
import { signOut } from '@/services/auth'
import anyAscii from 'any-ascii'

export const useEmployeeStore = defineStore({
  id: 'employees',
  state: () => ({
    employees: [],
    temp: []
  }),
  actions: {
    async searchEmployee(name) {
      try {
        if (name === '') {
          this.employees = this.temp
          return
        }

        this.employees = this.employees.filter((employee) =>
          anyAscii(employee.name.toLowerCase()).includes(anyAscii(name.toLowerCase()))
        )
      } catch (error) {
        console.error('Failed to fetch employees:', error)
        signOut()
      }
    },
    async sortEmployee(criteria, mode) {
      if (criteria === 'defaultValue') {
        this.employees = this.temp
      } else if (criteria === 'name') {
        this.employees = this.employees.slice().sort((a, b) => a.name.localeCompare(b.name))
      } else if (criteria === 'phoneNumber') {
        this.employees = this.employees
          .slice()
          .sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber))
      } else if (criteria === 'position') {
        this.employees = this.employees
          .slice()
          .sort((a, b) => a.position.positionName.localeCompare(b.position.positionName))
      } else if (criteria === 'account') {
        console.log('hi')
        this.employees = this.employees.slice().sort((a, b) => {
          if (a.account === null && b.account === null) {
            return 0
          }
          if (a.account === null) {
            return -1
          }
          if (b.account === null) {
            return 1
          }
          // Compare by username
          if (a.account.username < b.account.username) return -1
          if (a.account.username > b.account.username) return 1
          return 0
        })
      }

      if (mode === 'desc') {
        this.employees = this.employees.slice().reverse()
      }
    },
    async fetchEmployees() {
      try {
        const response = await axiosInstance.get('/employees')
        this.employees = response.data.data
        this.temp = response.data.data
      } catch (error) {
        console.error('Failed to fetch employees:', error)
        signOut()
      }
    },
    async createEmployee(employeeData) {
      try {
        await axiosInstance.post('/employees', employeeData)
        await this.fetchEmployees()
      } catch (error) {
        console.error('Failed to create employee:', error)
        signOut()
      }
    },
    async updateEmployee(id, employeeData) {
      try {
        const response = await axiosInstance.put(`/employees/${id}`, employeeData)
        await this.fetchEmployees()
        return response
      } catch (error) {
        console.error('Failed to update employee:', error)
        signOut()
      }
    },
    async deleteEmployee(id) {
      try {
        const response = await axiosInstance.delete(`/employees/${id}`)
        console.log(response)
        await this.fetchEmployees()
      } catch (error) {
        console.error('Failed to update employee:', error)
        signOut()
      }
    }
  },
  initialize() {
    this.fetchEmployees()
  }
})
