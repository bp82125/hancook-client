<template>
  <div class="flex items-center justify-end rounded-lg">
    <button
      data-modal-target="removeAllModal"
      data-modal-toggle="removeAllModal"
      class="flex gap-2 hover:bg-gray-100 p-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300"
    >
      <svg
        class="w-6 h-6 text-red-600 dark:text-white"
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
      <h1 class="text-red-600">Xoá tất cả</h1>
    </button>
  </div>

  <!-- Main modal -->
  <div
    id="removeAllModal"
    data-modal-backdrop="static"
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
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="removeAllModal"
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
            @click="cartItemStore.clearAll()"
            data-modal-hide="removeAllModal"
            type="button"
            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Xoá
          </button>
          <button
            data-modal-hide="removeAllModal"
            type="button"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4"
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
import { initModals } from 'flowbite'
import { useCartItemStore } from '@/stores/cartItemStore'

const cartItemStore = useCartItemStore()

onMounted(() => {
  initModals()
})
</script>
@/stores/cartStore
