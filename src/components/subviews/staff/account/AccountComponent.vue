<template>
  <div class="p-8 rounded-lg shadow-lg bg-white my-5">
    <div class="grid grid-cols-1 md:grid-cols-2 mb-4">
      <AccountSearchBar></AccountSearchBar>
    </div>
    <div class="overflow-x-auto">
      <template v-if="width > 768">
        <AccountList
          @updateAccount="updateAccount"
          @toggleAccount="toggleAccount"
          @changePassword="changePassword"
          @deleteAccount="deleteAccount"
        ></AccountList>
      </template>

      <template v-else>
        <AccountListForMobile
          @updateAccount="updateAccount"
          @toggleAccount="toggleAccount"
          @changePassword="changePassword"
          @deleteAccount="deleteAccount"
        ></AccountListForMobile>
      </template>

      <AccountUpdateModal ref="updateModal"></AccountUpdateModal>
      <AccountToggle ref="toggleModal"></AccountToggle>
      <AccountResetPasswordModal ref="changePasswordModal"></AccountResetPasswordModal>
      <AccountDeleteModal ref="deleteModal"></AccountDeleteModal>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AccountSearchBar from './AccountSearchBar.vue'
import AccountList from './AccountList.vue'
import AccountListForMobile from './AccountListForMobile.vue'
import AccountUpdateModal from './AccountUpdateModal.vue'
import AccountToggle from './AccountToggle.vue'
import AccountResetPasswordModal from './AccountResetPasswordModal.vue'
import AccountDeleteModal from './AccountDeleteModal.vue'

import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()

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
