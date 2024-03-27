<template>
  <div class="overflow-x-auto p-8 rounded-lg shadow-lg bg-white m-2">
    <div class="flex justify-between">
      <TableSearchBar></TableSearchBar>
      <TableCreateModal></TableCreateModal>
    </div>
    <div>
      <TableList @updateTable="updateTable" @deleteTable="deleteTable"></TableList>
      <TableUpdateModal ref="updateModal"></TableUpdateModal>
      <TableDeleteModal ref="deleteModal"></TableDeleteModal>
    </div>
  </div>
</template>

<script setup>
import TableSearchBar from './TableSearchBar.vue'
import TableCreateModal from './TableCreateModal.vue'
import TableList from './TableList.vue'
import TableUpdateModal from './TableUpdateModal.vue'
import TableDeleteModal from './TableDeleteModal.vue'
import { ref } from 'vue'

const updateModal = ref()
const deleteModal = ref()

function updateTable(table) {
  updateModal.value.openModal(table)
}

function deleteTable(table) {
  deleteModal.value.openModal(table)
}
</script>
