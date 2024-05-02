<template>
  <div class="flex justify-end order-first md:order-none">
    <button
      id="createEmployeeButton"
      data-modal-target="createEmployeeModal"
      data-modal-toggle="createEmployeeModal"
      type="button"
      class="flex w-full md:w-fit justify-center items-center gap-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <svg
        class="w-[18px] h-[18px] text-white dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h14m-7 7V5"
        />
      </svg>
      <h1 class="text-white text-center">Thêm nhân viên</h1>
    </button>

    <div
      id="createEmployeeModal"
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
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Thêm nhân viên</h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="createEmployeeModal"
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
                  >Tên nhân viên</label
                >
                <input
                  v-model="name"
                  type="text"
                  name="name"
                  id="nameInputCreate"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Vd: Nguyễn Văn A"
                  required
                />
              </div>
              <div class="w-full">
                <label
                  for="genderSelectCreate"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Giới tính</label
                >
                <select
                  v-model="gender"
                  id="genderSelectCreate"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div class="w-full">
                <label
                  for="phoneNumber"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Số điện thoại</label
                >
                <input
                  v-model="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  id="phoneNumberInputCreate"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Vd: 0123456789"
                  required
                />
              </div>

              <div class="w-full">
                <label
                  for="address"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Địa chỉ</label
                >
                <input
                  v-model="address"
                  type="text"
                  name="address"
                  id="addressInputCreate"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Vd: 79 Trần Duy Hưng"
                  required
                />
              </div>

              <div class="w-full">
                <label
                  for="positionSelectCreate"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Chức vụ</label
                >
                <select
                  v-model="position"
                  id="positionSelectCreate"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                  <option v-for="position in positions" :key="position.id" :value="position.id">
                    {{ position.positionName }}
                  </option>
                </select>
              </div>
            </div>

            <button
              data-modal-toggle="createEmployeeModal"
              class="mt-4 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Thêm
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'
import { usePositionStore } from '@/stores/positionStore'

const name = ref('')
const gender = ref('')
const phoneNumber = ref('')
const address = ref('')
const position = ref('')

const employeeStore = useEmployeeStore()
const positionStore = usePositionStore()

const positions = computed(() => {
  return positionStore.positions
})

const submitForm = async () => {
  try {
    const response = await employeeStore.createEmployee({
      name: name.value,
      gender: gender.value,
      address: address.value,
      phoneNumber: phoneNumber.value,
      positionId: position.value
    })

    document.getElementById('createEmployeeModal').hidden = true

    name.value = ''
    gender.value = ''
    phoneNumber.value = ''
    address.value = ''
    position.value = ''

    console.log(response)
  } catch (error) {
    console.error('Error submitting form:', error)
  }
  console.log(employeeStore)
}
</script>
