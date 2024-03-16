import { defineStore } from 'pinia'

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    updateDish: false,
    deleteDish: false,
    updateDishType: false,
    deleteDishType: false,
    addOrder: false,
    data: null
  }),
  actions: {
    toggleUpdateDish(data) {
      this.updateDish = !this.updateDish
      this.data = data
    },

    toggleDeleteDish(data) {
      this.deleteDish = !this.deleteDish
      this.data = data
    },

    toggleUpdateDishType(data) {
      this.updateDishType = !this.updateDishType
      this.data = data
    },

    toggleDeleteDishType(data) {
      this.deleteDishType = !this.deleteDishType
      this.data = data
    },
    toggleAddOrder(data) {
      this.addOrder = !this.addOrder
      this.data = data
    }
  }
})
