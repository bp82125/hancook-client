<template>
  <div class="p-5 md:p-8 rounded-lg shadow-lg bg-white m-2">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-y-4 mb-3">
      <ExpenseSearchBar></ExpenseSearchBar>
      <ExpenseSort></ExpenseSort>
      <ExpenseCreateModal></ExpenseCreateModal>
    </div>
    <div class="overflow-x-auto">
      <template v-if="width > 768">
        <ExpenseList
          @updateExpense="updateExpense"
          @deleteExpense="deleteExpense"
          @showNoteExpense="showInfoExpense"
        ></ExpenseList>
      </template>
      <template v-else>
        <ExpenseListForMobile
          @updateExpense="updateExpense"
          @deleteExpense="deleteExpense"
        ></ExpenseListForMobile>
      </template>

      <ExpenseUpdateModal ref="updateModal"></ExpenseUpdateModal>
      <ExpenseDeleteModal ref="deleteModal"></ExpenseDeleteModal>
      <ExpenseInfoModal ref="infoModal"></ExpenseInfoModal>
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
import ExpenseInfoModal from './ExpenseInfoModal.vue'
import ExpenseSort from './ExpenseSort.vue'

import { ref } from 'vue'

import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()

const updateModal = ref()
const deleteModal = ref()
const infoModal = ref()

function updateExpense(expense) {
  updateModal.value.openModal(expense)
}

function deleteExpense(expense) {
  deleteModal.value.openModal(expense)
}

function showInfoExpense(expense) {
  infoModal.value.openModal(expense)
}
</script>
