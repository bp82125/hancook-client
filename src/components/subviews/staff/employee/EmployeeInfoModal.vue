<template>
  <div
    id="employeeInfoModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div class="flex justify-between items-center pb-4 rounded-t border-b dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Chi tiết nhân viên</h3>
          <button
            @click="() => modal.toggle()"
            id="closeModal"
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
        <div class="py-3">
          <div class="my-2">
            <h6 class="text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              Mã nhân viên
            </h6>
            <p>{{ employeeInfo.id }}</p>
          </div>
          <div class="my-2">
            <h6 class="text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              Họ và tên
            </h6>
            <p>{{ employeeInfo.name }}</p>
          </div>

          <div class="my-2">
            <h6 class="text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              Giới tính
            </h6>
            <p>{{ getGender(employeeInfo.gender) }}</p>
          </div>

          <div class="my-2">
            <h6 class="text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              Số điện thoại
            </h6>
            <p>{{ employeeInfo.phoneNumber }}</p>
          </div>

          <div class="my-2">
            <h6 class="text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              Địa chỉ
            </h6>
            <p>{{ employeeInfo.address }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'flowbite'

let modal

onMounted(() => {
  const $modalElement = document.querySelector('#employeeInfoModal')
  const modalOptions = {
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }
})

const employeeInfo = ref({
  id: '',
  name: '',
  gender: '',
  phoneNumber: '',
  address: '',
  position: {
    id: '',
    positionName: '',
    salaryCoefficient: '',
    numberOfEmployees: ''
  },
  account: ''
})

const getGender = (gender) => {
  switch (gender) {
    case 'male':
      return 'Nam'
    case 'female':
      return 'Nữ'
    default:
      return 'Khác' // for any other gender, return the same value
  }
}

const openModal = (employee) => {
  employeeInfo.value = employee
  modal.toggle()
}

defineExpose({ openModal })
</script>
