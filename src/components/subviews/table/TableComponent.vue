<template>
  <div class="p-3 md:p-8 rounded-lg shadow-lg bg-white m-2">
    <div :class="isAdmin ? 'md:grid-cols-3' : 'md:grid-cols-2'" class="grid grid-cols-1 gap-y-4">
      <TableSearchBar></TableSearchBar>
      <div :class="isAdmin ? '' : 'flex justify-end'">
        <TableSort></TableSort>
      </div>

      <TableCreateModal v-if="isAdmin"></TableCreateModal>
    </div>
    <div class="overflow-x-auto">
      <template v-if="width > 768">
        <TableList @updateTable="updateTable" @deleteTable="deleteTable"></TableList>
      </template>
      <template v-else>
        <TableListForMobile
          @updateTable="updateTable"
          @deleteTable="deleteTable"
        ></TableListForMobile>
      </template>
      <TableUpdateModal v-if="isAdmin" ref="updateModal"></TableUpdateModal>
      <TableDeleteModal v-if="isAdmin" ref="deleteModal"></TableDeleteModal>
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
import TableSort from './TableSort.vue'

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

import { computedAsync } from '@vueuse/core'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
})

const isAdmin = computedAsync(async () => {
  return await userStore.isAdmin()
}, true)
</script>
