<template>
  <div
    id="updatePositionModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-xl max-h-full">
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div
          class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Chỉnh sửa chức vụ</h3>
          <button
            @click="closeModal"
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
        <form @submit.prevent="submitForm">
          <div class="text-start">
            <div>
              <label
                for="idPosition"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >ID chức vụ</label
              >
              <input
                v-model="id"
                type="text"
                name="idPosition"
                id="idPosition"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                readonly
              />
            </div>
            <div class="mt-4">
              <label
                for="namePosition"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Tên chức vụ</label
              >
              <input
                v-model="name"
                type="text"
                name="namePosition"
                id="namePosition"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Vd: Nhân viên phòng bếp"
                required
              />
            </div>
            <div class="mt-4">
              <label
                for="salaryPosition"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Hệ số lương</label
              >
              <input
                v-model="salary"
                type="number"
                min="0.0"
                step="any"
                name="salaryPosition"
                id="salaryPosition"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Vd: 1.0"
                required
              />
            </div>
          </div>

          <button
            @click="submitForm"
            type="button"
            class="mt-4 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-start dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Lưu
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePositionStore } from '@/stores/positionStore'
import { Modal } from 'flowbite'

let modal

onMounted(() => {
  const $modalElement = document.querySelector('#updatePositionModal')
  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }
})

const id = ref('')
const name = ref('')
const salary = ref('')
const positionStore = usePositionStore()

const submitForm = async () => {
  try {
    const response = await positionStore.updatePosition(id.value, {
      positionName: name.value,
      salaryCoefficient: salary.value
    })

    id.value = ''
    name.value = ''
    salary.value = ''

    closeModal()
    console.log(response)
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

const openModal = (position) => {
  id.value = position.id
  name.value = position.positionName
  salary.value = position.salaryCoefficient
  closeModal()
}

const closeModal = () => {
  modal.toggle()
}

defineExpose({ openModal })
</script>
