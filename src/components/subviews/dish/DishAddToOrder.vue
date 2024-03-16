<template>
  <div
    id="addOrderModal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-gray-50 rounded-lg shadow dark:bg-gray-700">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Thêm vào đơn món</h3>
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
        <div class="p-2 md:p-3 space-y-4">
          <form id="addOrderModal" class="p-2 md:p-3 text-center bg-white">
            <div
              class="w-full bg-gray-50 border-2 border-blue-500 rounded-lg flex items-center p-2"
            >
              <img
                :src="dishData ? dishData.imagePath : ''"
                class="w-12 h-12 object-cover rounded-lg"
                alt="Product Image"
              />
              <div class="flex flex-col justify-between items-start mx-3">
                <h1 class="text-start text-lg font-semibold">
                  {{ dishData ? dishData.dishName : '' }}
                </h1>
                <h1 class="text-gray-500 text-md">
                  {{ dishData ? formatPrice(dishData.price) : '' }}
                </h1>
              </div>
            </div>

            <div class="flex flex-row justify-between items-center mt-4 mb-3 rounded-md">
              <h1 class="block mb-1 text-lg font-medium text-gray-900 dark:text-white">Số lượng</h1>

              <div class="inline-flex" role="group">
                <button
                  @click="quantity--"
                  type="button"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-transparent hover:rounded-lg hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  <svg
                    class="w-4 h-4"
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
                      d="M5 12h14"
                    />
                  </svg>
                </button>

                <input
                  v-model="quantity"
                  type="number"
                  class="px-4 py-2 w-14 border-0 rounded-lg text-sm text-center font-medium text-gray-900 bg-transparent hover:bg-gray-900 hover:rounded-lg hover:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <button
                  @click="quantity++"
                  type="button"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-transparent hover:bg-gray-900 hover:rounded-lg hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  <svg
                    class="w-4 h-4"
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
                </button>
              </div>
            </div>

            <div class="text-start mt-2">
              <label for="note" class="block mb-3 text-lg font-medium text-gray-900 dark:text-white"
                >Ghi chú</label
              >
              <textarea
                v-model="note"
                id="note"
                rows="4"
                class="block p-2.5 w-full text-sm resize-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Yêu cầu riêng của khách hàng về món ăn..."
              ></textarea>
            </div>
          </form>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            @click="submitForm"
            type="button"
            class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Thêm
          </button>
          <button
            @click="closeModal"
            type="button"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            Huỷ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import { Modal } from 'flowbite'
import { useModalStore } from '@/stores/modalStore'
import { useOrderStore } from '@/stores/orderStore'
/**********                  data         *********** */
const quantity = ref(1)
const note = ref('')
const dishData = ref()

const orderStore = useOrderStore()

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

watch(quantity, (newValue, oldValue) => {
  const parsedValue = parseInt(newValue, 10)
  if (isNaN(parsedValue) || parsedValue < 1) {
    quantity.value = 1
  } else if (parsedValue > 999) {
    quantity.value = 999
  }
})

const resetData = () => {
  quantity.value = 1
  note.value = ''
  dishData.value = null
}
/**********                  data         *********** */

/**********                  modal        *********** */
let modal
onMounted(() => {
  const $modalElement = document.querySelector('#addOrderModal')
  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }
})

const modalStore = useModalStore()
const addOrder = computed(() => {
  return modalStore.addOrder
})

watchEffect(() => {
  if (addOrder.value) {
    modal.toggle()
    dishData.value = modalStore.data
  }
})

const closeModal = () => {
  modalStore.$reset()
  resetData()
  modal.toggle()
}
/**********             modal        *********** */

/**********             form        *********** */
const submitForm = async () => {
  const item = {
    dish: dishData.value,
    quantity: quantity.value,
    note: note.value
  }

  orderStore.addToOrder(item)
  closeModal()
}
/**********             form        *********** */
</script>
