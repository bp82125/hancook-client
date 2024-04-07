<template>
  <div class="overflow-x-auto p-8 rounded-lg shadow-lg bg-white m-2">
    <div class="flex justify-between mb-3">
      <ExpenseSearchBar></ExpenseSearchBar>
      <ExpenseCreateModal></ExpenseCreateModal>
    </div>
    <div>
      <ExpenseList @updateExpense="updateExpense" @deleteExpense="deleteExpense"></ExpenseList>
      <ExpenseUpdateModal ref="updateModal"></ExpenseUpdateModal>
      <ExpenseDeleteModal ref="deleteModal"></ExpenseDeleteModal>
    </div>
  </div>
</template>

<script setup>
import ExpenseSearchBar from './ExpenseSearchBar.vue'
import ExpenseList from './ExpenseList.vue'
import ExpenseCreateModal from './ExpenseCreateModal.vue'
import ExpenseUpdateModal from './ExpenseUpdateModal.vue'
import ExpenseDeleteModal from './ExpenseDeleteModal.vue'

import { ref } from 'vue'

const updateModal = ref()
const deleteModal = ref()

function updateExpense(expense) {
  updateModal.value.openModal(expense)
}

function deleteExpense(expense) {
  deleteModal.value.openModal(expense)
}
</script>
