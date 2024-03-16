<template>
  <div class="overflow-x-auto p-8 rounded-lg shadow-lg bg-white my-5">
    <div class="flex justify-between mb-8">
      <EmployeeSearchBar></EmployeeSearchBar>
      <EmployeeCreateModal></EmployeeCreateModal>
    </div>
    <div>
      <EmployeeList
        @showEmployee="showInfo"
        @updateEmployee="updateEmployee"
        @deleteEmployee="deleteEmployee"
        @createAccount="createAccount"
      ></EmployeeList>
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
import EmployeeInfoModal from './EmployeeInfoModal.vue'
import EmployeeSearchBar from './EmployeeSearchBar.vue'
import EmployeeCreateModal from './EmployeeCreateModal.vue'
import EmployeeUpdateModal from './EmployeeUpdateModal.vue'
import EmployeeDeleteModal from './EmployeeDeleteModal.vue'
import AccountCreateModal from '../account/AccountCreateModal.vue'

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
