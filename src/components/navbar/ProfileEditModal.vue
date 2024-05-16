<template>
  <div
    id="updateProfileModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <!-- Modal header -->
        <div
          class="flex justify-between items-center pb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Chỉnh sửa thông tin cá nhân
          </h3>
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
        <form @submit.prevent="submitForm" id="updateProfileForm">
          <div class="grid gap-4 grid-cols-1 md:grid-cols-2 sm:gap-6">
            <div class="w-full md:col-span-2">
              <label
                for="idInputProfile"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >ID người dùng</label
              >
              <input
                readonly
                v-model="id"
                type="text"
                name="id"
                id="idInputProfile"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>

            <div class="w-full md:col-span-2">
              <label
                for="nameInputProfile"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Tên nhân viên</label
              >
              <input
                v-model="name"
                type="text"
                name="name"
                id="nameInputProfile"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Vd: Nguyễn Văn A"
                required
              />
            </div>
            <div class="w-full">
              <label
                for="genderSelectProfile"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Giới tính</label
              >
              <select
                v-model="gender"
                id="genderSelectProfile"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div class="w-full">
              <label
                for="phoneNumberProfile"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Số điện thoại</label
              >
              <input
                v-model="phoneNumber"
                type="text"
                name="phoneNumber"
                id="phoneNumberProfile"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Vd: 0123456789"
                required
              />
            </div>

            <div class="w-full md:col-span-2">
              <label
                for="addressInputProfile"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Địa chỉ</label
              >
              <input
                v-model="address"
                type="text"
                name="address"
                id="addressInputProfile"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Vd: 79 Trần Duy Hưng"
                required
              />
            </div>
          </div>
        </form>
        <div class="grid grid-cols-1 md:flex gap-x-2 mt-5 w-full">
          <button
            form="updateProfileForm"
            type="submit"
            class="mt-4 w-full col-span-1 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Lưu
          </button>

          <button
            @click="closeModal"
            type="button"
            class="mt-4 w-full col-span-1 text-gray-900 border hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:gray-blue-800"
          >
            Huỷ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'
import { useUserStore } from '@/stores/userStore'
import { Modal } from 'flowbite'
import { useToast } from 'vue-toastification'

const toast = useToast()

let modal
const employeeStore = useEmployeeStore()
const userStore = useUserStore()

onMounted(async () => {
  const $modalElement = document.querySelector('#updateProfileModal')
  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }
  await userStore.fetchUser(true)
})

const user = computed(() => {
  return userStore.user
})

const id = ref('')
const name = ref('')
const gender = ref('')
const phoneNumber = ref('')
const address = ref('')
const position = ref('')
const account = ref('')

const resetValue = () => {
  id.value = ''
  name.value = ''
  gender.value = ''
  phoneNumber.value = ''
  address.value = ''
  position.value = ''
  account.value = ''
}

const submitForm = async () => {
  try {
    const requestBody = {
      name: name.value,
      gender: gender.value,
      address: address.value,
      phoneNumber: phoneNumber.value,
      positionId: position.value,
      accountId: account.value
    }

    const response = await employeeStore.updateEmployee(id.value, requestBody)

    if (response.data.success) {
      await userStore.fetchUser(true)
      toast.success('Cập nhật thông tin cá nhân thành công')
      resetValue()
    } else {
      toast.error('Cập nhật thông tin cá nhân thất bại')
    }

    modal.toggle()
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

const openModal = () => {
  id.value = user.value.id
  name.value = user.value.name
  gender.value = user.value.gender
  phoneNumber.value = user.value.phoneNumber
  address.value = user.value.address
  position.value = user.value.position.id
  account.value = user.value.account.id

  modal.toggle()
}

const closeModal = () => {
  modal.toggle()
}

defineExpose({ openModal })
</script>
