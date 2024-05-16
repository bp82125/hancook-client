<template>
  <div
    id="changePasswordModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-xl max-h-full">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Đổi mật khẩu</h3>
          <button
            @click="closeModal"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form @submit.prevent="submitForm">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label
                for="oldPassword"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Mật khẩu hiện tại</label
              >
              <input
                v-model="oldPassword"
                type="password"
                name="oldPassword"
                id="oldPasswordChange"
                placeholder="Nhập mật khẩu hiện tại..."
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
              <div v-show="currentPasswordIncorrect" class="mt-2 text-red-500 text-sm">
                Mật khẩu hiện tại không đúng!
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="newPassword"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Mật khẩu mới</label
              >
              <input
                v-model="newPassword"
                type="password"
                name="newPassword"
                id="newPasswordChange"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Nhập mật khẩu mới..."
                required
              />
            </div>

            <div v-show="newPasswordNotSecure" class="sm:col-span-2 text-red-500 text-sm">
              Mật khẩu phải ít nhất 8 kí tự, bao gồm chữ cái và chữ số
            </div>

            <div class="sm:col-span-2">
              <label
                for="newPasswordAgain"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nhập lại mật khẩu</label
              >
              <input
                v-model="newPasswordAgain"
                type="password"
                name="newPasswordAgain"
                id="newPasswordAgainChange"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Nhập lại mật khẩu mới..."
                required
              />
            </div>
            <div v-show="newPasswordMismatch" class="sm:col-span-2 text-red-500 text-sm">
              Mật khẩu nhập lại không khớp với mật khẩu mới!
            </div>
          </div>
          <div class="flex">
            <button
              type="submit"
              class="mt-4 w-full justify-center text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Lưu
            </button>

            <button
              @click="closeModal"
              type="button"
              class="mt-4 w-full text-gray-900 border hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mx-2 text-center"
            >
              Huỷ
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAccountStore } from '@/stores/accountStore'
import { useUserStore } from '@/stores/userStore'
import { Modal } from 'flowbite'
import { useToast } from 'vue-toastification'
import { signOut } from '@/services/auth.js'

const toast = useToast()

let modal

onMounted(async () => {
  const $modalElement = document.querySelector('#changePasswordModal')
  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }

  await userStore.fetchUser()
})

const id = ref('')
const oldPassword = ref('')
const newPassword = ref('')
const newPasswordAgain = ref('')

const newPasswordMismatch = ref(false)
const currentPasswordIncorrect = ref(false)
const newPasswordNotSecure = ref(false)

const accountStore = useAccountStore()
const userStore = useUserStore()

const account = computed(() => {
  return userStore.user.account
})

function validatePassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
  return regex.test(password)
}

const submitForm = async () => {
  if (newPassword.value != newPasswordAgain.value) {
    newPasswordMismatch.value = true
    return
  }
  newPasswordMismatch.value = false

  if (!validatePassword(newPassword.value)) {
    newPasswordNotSecure.value = true
    return
  }
  newPasswordNotSecure.value = false

  try {
    const response = await accountStore.changePassword(id.value, {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    })

    console.log(response)

    if (response.data.success) {
      toast.success(`Đặt lại mật khẩu cho tài khoản thành công`)
      resetFields()
      closeModal()
      signOut()
      toast.info('Hãy đăng nhập lại vào hệ thống')
    } else {
      currentPasswordIncorrect.value = true
    }
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

const openModal = () => {
  id.value = account.value.id
  newPasswordMismatch.value = false
  currentPasswordIncorrect.value = false
  newPasswordNotSecure.value = false
  modal.toggle()
}

const closeModal = () => {
  resetFields()
  modal.toggle()
}

const resetFields = () => {
  id.value = ''
  newPassword.value = ''
  newPasswordAgain.value = ''
  newPasswordMismatch.value = false
  currentPasswordIncorrect.value = false
  newPasswordNotSecure.value = false
}

defineExpose({ openModal })
</script>
