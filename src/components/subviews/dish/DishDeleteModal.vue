<template>
  <div
    id="deleteDishModal"
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
          <form @submit.prevent="submitForm" id="deleteDishForm" class="p-4 md:p-5 text-center">
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
              Bạn có muốn xoá món ăn {{ name }} không?
            </h3>
          </form>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            form="deleteDishForm"
            type="submit"
            class="text-white w-full bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Xoá
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
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { Modal } from 'flowbite'
import { useModalStore } from '@/stores/modalStore'
import { useDishStore } from '@/stores/dishStore'
import { deleteImage } from '@/services/image'
import { useToast } from 'vue-toastification'

const toast = useToast()
/**********                  data         *********** */
const dishStore = useDishStore()
const name = ref('')

/**********                  data         *********** */

/**********                  modal        *********** */
let modal
onMounted(() => {
  const $modalElement = document.querySelector('#deleteDishModal')
  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }
})

const modalStore = useModalStore()
const deleteDish = computed(() => {
  return modalStore.deleteDish
})

watchEffect(() => {
  if (deleteDish.value) {
    modal.toggle()
    name.value = modalStore.data.dishName
  }
})

const closeModal = () => {
  modalStore.$reset()
  name.value = ''
  modal.toggle()
}
/**********             modal        *********** */

/**********             form        *********** */
const submitForm = async () => {
  // const imagePath = modalStore.data.imagePath
  // await deleteImage(imagePath)

  const response = await dishStore.deleteDish(modalStore.data.id)

  if (response.data.success) {
    toast.success(`"${name.value}" đã được xóa thành công`)
  } else {
    toast.error(`Xóa món ăn "${name.value}" thất bại`)
  }

  closeModal()
}
/**********             form        *********** */
</script>
