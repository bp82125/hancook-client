<template>
  <div
    id="resetPasswordModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-xl max-h-full">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <!-- Modal header -->
        <div
          class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Đặt lại mật khẩu</h3>
          <button
            @click="closeModal"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >ID tài khoản</label
              >
              <input
                v-model="id"
                type="text"
                name="id"
                id="idInputShowcase"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                readonly
              />
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
                id="newPassword"
                placeholder="Nhập mật khẩu mới..."
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                id="newPasswordAgain"
                placeholder="Nhập lại mật khẩu mới..."
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>
          </div>

          <div v-show="newPasswordMismatch" class="sm:col-span-2 text-red-500 text-sm">
            Mật khẩu nhập lại không khớp với mật khẩu mới!
          </div>
          <div class="flex">
            <button
              type="submit"
              class="mt-4 w-full justify-center text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Lưu
            </button>

            <button
              @click="closeModal"
              type="button"
              class="mt-4 w-full text-gray-900 border hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mx-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:gray-blue-800"
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
import { ref, onMounted } from 'vue'
import { useAccountStore } from '@/stores/accountStore'
import { Modal } from 'flowbite'
import { useToast } from 'vue-toastification'

const toast = useToast()

let modal

onMounted(() => {
  const $modalElement = document.querySelector('#resetPasswordModal')
  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }
})

const id = ref('')
const username = ref('')
const newPassword = ref('')
const newPasswordAgain = ref('')

const newPasswordMismatch = ref(false)
const newPasswordNotSecure = ref(false)

const accountStore = useAccountStore()

function validatePassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
  return regex.test(password)
}

const submitForm = async () => {
  if (newPassword.value !== newPasswordAgain.value) {
    newPasswordMismatch.value = true
    return
  }
  newPasswordMismatch.value = false

  if (!validatePassword(newPassword.value)) {
    newPasswordNotSecure.value = true
    return
  }
  newPasswordNotSecure.value = false

  if (username.value === 'admin') {
    toast.info('Thay vào đó, hãy đăng nhập vào tài khoản admin và tiến hành đổi mật khẩu')
    toast.error('Không thể đặt lại mật khẩu cho tài khoản admin')
    return
  }

  try {
    const response = await accountStore.resetPassword(id.value, {
      newPassword: newPassword.value
    })

    if (response.data.success) {
      toast.success(`Đặt lại mật khẩu cho tài khoản thành công`)
      resetFields()
      closeModal()
    } else {
      toast.error(`Đặt lại mật khẩu cho tài khoản thất bại`)
    }
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

const openModal = (account) => {
  id.value = account.id
  username.value = account.username
  modal.toggle()
}

const closeModal = () => {
  resetFields()
  modal.toggle()
}

const resetFields = () => {
  id.value = ''
  username.value = ''
  newPassword.value = ''
  newPasswordAgain.value = ''
  newPasswordMismatch.value = false
  newPasswordNotSecure.value = false
}

defineExpose({ openModal })
</script>
