<template>
  <div
    id="deleteDishTypeModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Xoá món ăn</h3>
          <button
            @click="closeModal"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4">
          <form @submit.prevent="submitForm" id="deleteDishTypeForm" class="p-4 md:p-5 text-center">
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
            <h3 class="text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có muốn xoá {{ name }} không?
            </h3>
          </form>
          <template v-if="hasDishes">
            <div class="text-red-500 text-justify">
              Không thể xoá {{ name }} vì còn chứa các món ăn bên trong!
            </div>
          </template>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            form="deleteDishTypeForm"
            type="submit"
            class="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Xoá
          </button>
          <button
            @click="closeModal"
            type="button"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Huỷ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { Modal } from 'flowbite'
import { useModalStore } from '@/stores/modalStore'
import { useDishTypeStore } from '@/stores/dishTypeStore'
import { useToast } from 'vue-toastification'

const toast = useToast()
/**********                  data         *********** */
const dishTypeStore = useDishTypeStore()
const name = ref('')

/**********                  data         *********** */

/**********                  modal        *********** */
let modal
onMounted(() => {
  const $modalElement = document.querySelector('#deleteDishTypeModal')
  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }
})

const modalStore = useModalStore()
const deleteDishType = computed(() => {
  return modalStore.deleteDishType
})

watchEffect(() => {
  if (deleteDishType.value) {
    modal.toggle()
    name.value = modalStore.data.dishTypeName
  }
})

const closeModal = () => {
  modalStore.$reset()
  name.value = ''
  hasDishes.value = false
  modal.toggle()
}
/**********             modal        *********** */

/**********             form        *********** */
const hasDishes = ref(false)
const submitForm = async () => {
  const response = await dishTypeStore.deleteDishType(modalStore.data.id)
  if (response) {
    toast.error('Xóa loại món ăn thành công')
    closeModal()
  } else {
    hasDishes.value = true
  }
}
/**********             form        *********** */
</script>
