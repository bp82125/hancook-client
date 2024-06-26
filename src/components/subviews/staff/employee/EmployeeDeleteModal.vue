<template>
  <div
    id="deleteEmployeeModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div
          class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Xoá nhân viên</h3>
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
        <div class="p-4 md:p-5 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Bạn có muốn xoá nhân viên {{ name }} không?
          </h3>
          <div class="flex">
            <button
              @click="deleteEmployee"
              type="button"
              class="text-white w-full bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 justify-center"
            >
              Có
            </button>
            <button
              @click="closeModal"
              type="button"
              class="py-2.5 px-5 ms-3 w-full text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Huỷ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'
import { Modal } from 'flowbite'
import { useToast } from 'vue-toastification'
const toast = useToast()

let modal

onMounted(() => {
  const $modalElement = document.querySelector('#deleteEmployeeModal')
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
const account = ref(null)

const employeeStore = useEmployeeStore()

const deleteEmployee = async () => {
  try {
    if (account.value != null && account.value.username === 'admin') {
      toast.error('Không thể xóa nhân viên có tài khoản admin')
      closeModal()
      return
    }
    const response = await employeeStore.deleteEmployee(id.value)
    toast.success('Xóa nhân viên thành công')
    closeModal()
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.success('Xóa nhân viên thất bại')
    closeModal()
  }
}

const openModal = (employee) => {
  console.log(employee)
  id.value = employee.id
  name.value = employee.name
  account.value = employee.account
  modal.toggle()
}

const closeModal = () => {
  id.value = ''
  name.value = ''
  account.value = null
  modal.toggle()
}

defineExpose({ openModal })
</script>
