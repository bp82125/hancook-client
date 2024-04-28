<template>
  <div class="p-8 rounded-lg shadow-lg bg-white my-5">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 mb-8">
      <PositionSearchBar></PositionSearchBar>
      <PositionsCreateModal></PositionsCreateModal>
    </div>

    <div>
      <template v-if="width > 768">
        <PositionsList
          @updatePosition="updatePosition"
          @deletePosition="deletePosition"
        ></PositionsList>
      </template>

      <template v-else>
        <PositionsListForMobile
          @updatePosition="updatePosition"
          @deletePosition="deletePosition"
        ></PositionsListForMobile>
      </template>

      <PositionUpdateModal ref="updateModal"></PositionUpdateModal>
      <PositionDeleteModal ref="deleteModal"></PositionDeleteModal>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PositionsCreateModal from './PositionsCreateModal.vue'
import PositionsList from './PositionsList.vue'
import PositionsListForMobile from './PositionsListForMobile.vue'
import PositionUpdateModal from './PositionUpdateModal.vue'
import PositionDeleteModal from './PositionDeleteModal.vue'
import PositionSearchBar from './PositionSearchBar.vue'

import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()

const updateModal = ref()
const deleteModal = ref()

function updatePosition(position) {
  updateModal.value.openModal(position)
}

function deletePosition(position) {
  deleteModal.value.openModal(position)
}
</script>
