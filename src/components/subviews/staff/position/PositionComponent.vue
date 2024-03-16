<template>
  <div class="overflow-x-auto p-8 rounded-lg shadow-lg bg-white my-5">
    <div class="flex justify-between mb-8">
      <PositionSearchBar></PositionSearchBar>
      <PositionsCreateModal></PositionsCreateModal>
    </div>

    <div>
      <PositionsList
        @updatePosition="updatePosition"
        @deletePosition="deletePosition"
      ></PositionsList>
      <PositionUpdateModal ref="updateModal"></PositionUpdateModal>
      <PositionDeleteModal ref="deleteModal"></PositionDeleteModal>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PositionsCreateModal from './PositionsCreateModal.vue'
import PositionsList from './PositionsList.vue'
import PositionUpdateModal from './PositionUpdateModal.vue'
import PositionDeleteModal from './PositionDeleteModal.vue'
import PositionSearchBar from './PositionSearchBar.vue'

const updateModal = ref()
const deleteModal = ref()

function updatePosition(position) {
  updateModal.value.openModal(position)
}

function deletePosition(position) {
  deleteModal.value.openModal(position)
}
</script>
