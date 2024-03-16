<template>
  <div class="overflow-x-auto p-8 rounded-lg shadow-lg bg-white my-5">
    <div class="flex justify-between mb-8">
      <AccountSearchBar></AccountSearchBar>
    </div>
    <div>
      <AccountList
        @updateAccount="updateAccount"
        @toggleAccount="toggleAccount"
        @changePassword="changePassword"
        @deleteAccount="deleteAccount"
      ></AccountList>
      <AccountUpdateModal ref="updateModal"></AccountUpdateModal>
      <AccountToggle ref="toggleModal"></AccountToggle>
      <AccountChangePasswordModal ref="changePasswordModal"></AccountChangePasswordModal>
      <AccountDeleteModal ref="deleteModal"></AccountDeleteModal>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AccountSearchBar from './AccountSearchBar.vue'
import AccountList from './AccountList.vue'
import AccountUpdateModal from './AccountUpdateModal.vue'
import AccountToggle from './AccountToggle.vue'
import AccountChangePasswordModal from './AccountChangePasswordModal.vue'
import AccountDeleteModal from './AccountDeleteModal.vue'

const updateModal = ref()
const toggleModal = ref()
const deleteModal = ref()
const changePasswordModal = ref()

function updateAccount(account) {
  updateModal.value.openModal(account)
}

function toggleAccount(account) {
  toggleModal.value.openModal(account)
}

function changePassword(account) {
  changePasswordModal.value.openModal(account)
}

function deleteAccount(account) {
  deleteModal.value.openModal(account)
}
</script>
