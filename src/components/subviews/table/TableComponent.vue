<template>
  <div class="p-6 md:p-8 rounded-lg shadow-lg bg-white m-2">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 mb-3">
      <TableSearchBar></TableSearchBar>
      <TableCreateModal></TableCreateModal>
    </div>
    <div class="overflow-x-auto">
      <template v-if="width > 768">
        <TableList @updateTable="updateTable" @deleteTable="deleteTable"></TableList
      ></template>
      <template v-else>
        <TableListForMobile
          @updateTable="updateTable"
          @deleteTable="deleteTable"
        ></TableListForMobile>
      </template>
      <TableUpdateModal ref="updateModal"></TableUpdateModal>
      <TableDeleteModal ref="deleteModal"></TableDeleteModal>
    </div>
  </div>
</template>

<script setup>
import TableSearchBar from './TableSearchBar.vue'
import TableCreateModal from './TableCreateModal.vue'
import TableList from './TableList.vue'
import TableListForMobile from './TableListForMobile.vue'
import TableUpdateModal from './TableUpdateModal.vue'
import TableDeleteModal from './TableDeleteModal.vue'

import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()

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
