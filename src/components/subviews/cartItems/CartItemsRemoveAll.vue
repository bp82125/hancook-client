<template>
  <div class="flex items-center justify-end rounded-lg my-2 md:my-0">
    <button
      @click="showModal"
      type="button"
      class="flex justify-center items-center w-full md:w-fit gap-2 hover:bg-red-500 hover:md:bg-gray-100 p-2 rounded-lg bg-red-600 md:bg-transparent focus:ring-4 focus:outline-none focus:ring-red-300"
    >
      <svg
        class="w-[18px] h-[18px] md:w-6 md:h-6 text-white md:text-red-600 dark:text-white"
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
          d="M6 18 18 6m0 12L6 6"
        />
      </svg>
      <h1 class="text-white md:text-red-600">Xoá tất cả</h1>
    </button>
  </div>

  <!-- Main modal -->
  <div
    id="removeAllItemsModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-lg max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Xoá tất cả</h3>
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
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-8 text-center">
          <svg
            class="mx-auto my-4 text-gray-400 w-12 h-12 dark:text-gray-200"
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
          <p class="my-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Bạn có muốn xoá tất cả các món đã chọn không?
          </p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            @click="submitForm"
            type="button"
            class="text-white w-full justify-center bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Xoá
          </button>
          <button
            @click="closeModal"
            type="button"
            class="py-2.5 px-5 ms-3 w-full text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4"
          >
            Huỷ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Modal } from 'flowbite'
import { useCartItemStore } from '@/stores/cartItemStore'

const cartItemStore = useCartItemStore()

let modal
onMounted(() => {
  const $modalElement = document.querySelector('#removeAllItemsModal')
  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }
})

const showModal = () => {
  modal.toggle()
}

const closeModal = () => {
  modal.toggle()
}

const submitForm = () => {
  cartItemStore.clearAll()
  closeModal()
}
</script>
@/stores/cartStore
