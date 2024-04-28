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
        await axiosInstance.put(`/employees/${id}`, employeeData)
        await this.fetchEmployees()
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
