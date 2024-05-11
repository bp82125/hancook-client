<template>
  <div>
    <div
      id="createAccountModal"
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
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Thêm tài khoản</h3>
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
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Tên đăng nhập</label
                >
                <input
                  v-model="username"
                  type="text"
                  name="name"
                  id="usernameInput"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Vd: theotteryears"
                  required
                />

                <div v-show="existedUsername" class="sm:col-span-2 text-red-500 text-sm">
                  Tên đăng nhập {{ username }} đã được sử dụng
                </div>
              </div>

              <div class="sm:col-span-2">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Mật khẩu</label
                >
                <input
                  v-model="password"
                  type="password"
                  name="password"
                  id="passwordInput"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Mặc định nếu để trống: staff123"
                />
              </div>

              <div v-show="passwordNotStrong" class="sm:col-span-2 text-red-500 text-sm">
                Mật khẩu phải ít nhất 8 kí tự, bao gồm chữ cái và chữ số
              </div>

              <div class="sm:col-span-2">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Nhập lại mật khẩu</label
                >
                <input
                  v-model="passwordAgain"
                  type="password"
                  name="password"
                  id="passwordAgainInput"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nhập lại mật khẩu bạn vừa nhập..."
                />
              </div>

              <div v-show="passwordAgainNotCorrected" class="sm:col-span-2 text-red-500 text-sm">
                Mật khẩu nhập lại không đúng
              </div>

              <div class="sm:col-span-2">
                <label
                  for="roleSelect"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Loại tài khoản*</label
                >
                <select
                  v-model="role"
                  id="roleSelect"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                  <option value="admin">Quản trị</option>
                  <option value="staff">Nhân viên</option>
                </select>
              </div>

              <div class="sm:col-span-2 flex items-center">
                <input
                  v-model="enabled"
                  id="enabledCheckbox"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="enabledCheckbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Kích hoạt tài khoản</label
                >
              </div>
            </div>

            <button
              type="submit"
              class="mt-4 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Thêm
            </button>

            <button
              @click="closeModal"
              type="button"
              class="mt-4 text-gray-900 border hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mx-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:gray-blue-800"
            >
              Huỷ
            </button>
          </form>
        </div>
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
  const $modalElement = document.querySelector('#createAccountModal')
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
const password = ref('')
const passwordAgain = ref('')
const enabled = ref(false)
const role = ref('')

const accountStore = useAccountStore()

const existedUsername = ref(false)
const passwordNotStrong = ref(false)
const passwordAgainNotCorrected = ref(false)

function validatePassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
  return regex.test(password)
}

const submitForm = async () => {
  try {
    if (password.value === '' && passwordAgain.value === '') {
      password.value = 'staff123'
      passwordAgain.value = 'staff123'
    }

    if (password.value !== passwordAgain.value) {
      passwordAgainNotCorrected.value = true
      return
    }
    passwordAgainNotCorrected.value = false

    if (!validatePassword(password.value)) {
      passwordNotStrong.value = true
      return
    }
    passwordNotStrong.value = false

    const accountData = {
      username: username.value,
      password: password.value,
      role: role.value,
      enabled: enabled.value,
      employeeId: id.value
    }

    const response = await accountStore.createAccount(accountData)

    if (response != undefined) {
      toast.success('Tạo tài khoản thành công')
      closeModal()
    } else {
      existedUsername.value = true
    }
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

const openModal = (employee) => {
  id.value = employee.id
  username.value = getUsername(employee.name, employee.phoneNumber)

  modal.toggle()
}

const closeModal = () => {
  resetFields()
  modal.toggle()
}

const resetFields = () => {
  id.value = ''
  username.value = ''
  password.value = ''
  passwordAgain.value = ''
  role.value = ''
  enabled.value = false
  existedUsername.value = false
  passwordAgainNotCorrected.value = false
  passwordNotStrong.value = false
}

import anyAscii from 'any-ascii'

const getUsername = (name, phoneNumber) => {
  const lastName = anyAscii(name.split(' ').pop().toLowerCase())
  const lastFourDigits = phoneNumber.slice(-4)
  return `${lastName}${lastFourDigits}`
}

defineExpose({ openModal })
</script>
