<template>
  <div class="p-4 md:p-8 rounded-lg shadow-lg bg-white my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-y-2 md:mb-8">
      <EmployeeSearchBar></EmployeeSearchBar>
      <EmployeeSort></EmployeeSort>
      <EmployeeCreateModal></EmployeeCreateModal>
    </div>
    <div>
      <template v-if="width > 768">
        <EmployeeList
          @showEmployee="showInfo"
          @updateEmployee="updateEmployee"
          @deleteEmployee="deleteEmployee"
          @createAccount="createAccount"
        ></EmployeeList>
      </template>

      <template v-else>
        <EmployeeListForMobile
          @showEmployee="showInfo"
          @updateEmployee="updateEmployee"
          @deleteEmployee="deleteEmployee"
          @createAccount="createAccount"
        ></EmployeeListForMobile>
      </template>

      <EmployeeInfoModal ref="infoModal"></EmployeeInfoModal>
      <EmployeeUpdateModal ref="updateModal"></EmployeeUpdateModal>
      <EmployeeDeleteModal ref="deleteModal"></EmployeeDeleteModal>
      <AccountCreateModal ref="createAccountModal"></AccountCreateModal>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EmployeeList from './EmployeeList.vue'
import EmployeeListForMobile from './EmployeeListForMobile.vue'
import EmployeeInfoModal from './EmployeeInfoModal.vue'
import EmployeeSearchBar from './EmployeeSearchBar.vue'
import EmployeeCreateModal from './EmployeeCreateModal.vue'
import EmployeeUpdateModal from './EmployeeUpdateModal.vue'
import EmployeeDeleteModal from './EmployeeDeleteModal.vue'
import AccountCreateModal from '../account/AccountCreateModal.vue'
import EmployeeSort from './EmployeeSort.vue'

import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()

const infoModal = ref()
const updateModal = ref()
const deleteModal = ref()
const createAccountModal = ref()

function showInfo(employee) {
  infoModal.value.openModal(employee)
}

function updateEmployee(employee) {
  updateModal.value.openModal(employee)
}

function deleteEmployee(employee) {
  deleteModal.value.openModal(employee)
}

function createAccount(employee) {
  createAccountModal.value.openModal(employee)
}
</script>
