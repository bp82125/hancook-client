<template>
  <div class="p-6 md:p-8 rounded-lg shadow-lg bg-white m-2">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 mb-3">
      <ExpenseSearchBar></ExpenseSearchBar>
      <ExpenseCreateModal></ExpenseCreateModal>
    </div>
    <div class="overflow-x-auto">
      <template v-if="width > 768">
        <ExpenseList @updateExpense="updateExpense" @deleteExpense="deleteExpense"></ExpenseList>
      </template>
      <template v-else>
        <ExpenseListForMobile
          @updateExpense="updateExpense"
          @deleteExpense="deleteExpense"
        ></ExpenseListForMobile>
      </template>

      <ExpenseUpdateModal ref="updateModal"></ExpenseUpdateModal>
      <ExpenseDeleteModal ref="deleteModal"></ExpenseDeleteModal>
    </div>
  </div>
</template>

<script setup>
import ExpenseSearchBar from './ExpenseSearchBar.vue'
import ExpenseList from './ExpenseList.vue'
import ExpenseListForMobile from './ExpenseListForMobile.vue'
import ExpenseCreateModal from './ExpenseCreateModal.vue'
import ExpenseUpdateModal from './ExpenseUpdateModal.vue'
import ExpenseDeleteModal from './ExpenseDeleteModal.vue'

import { ref } from 'vue'

import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()

const updateModal = ref()
const deleteModal = ref()

function updateExpense(expense) {
  updateModal.value.openModal(expense)
}

function deleteExpense(expense) {
  deleteModal.value.openModal(expense)
}
</script>
