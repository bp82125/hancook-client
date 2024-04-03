<template>
  <!-- Modal toggle -->
  <button
    @click="showModal"
    class="block text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full py-2.5 text-center"
    type="button"
  >
    Thêm món ăn
  </button>

  <!-- Main modal -->
  <div
    id="addDishOrderModal"
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
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Thêm món ăn</h3>
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
        <div class="p-4 md:p-5 space-y-4 font-normal">
          <h1 class="block text-lg font-medium text-gray-900 text-left">Món ăn</h1>
          <model-list-select
            :list="dishes"
            v-model="dishId"
            option-value="id"
            option-text="dishName"
            placeholder="Chọn món ăn"
            class="!mt-1"
          >
          </model-list-select>

          <p v-if="notSelectedDish" class="text-left text-red-500 text-md !mt-1">
            Bạn phải chọn một món ăn để thêm vào đơn món
          </p>

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
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            @click="submitForm"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Thêm
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
import { ModelListSelect } from 'vue-search-select'
import { useDishStore } from '@/stores/dishStore'
import { useOrderStore } from '@/stores/orderStore'
import { ref, onMounted, computed, watch } from 'vue'
import { Modal } from 'flowbite'

/**********************Modal***********************/

let modal
onMounted(() => {
  const $modalElement = document.querySelector('#addDishOrderModal')
  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
  }

  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions)
  }

  dishStore.fetchDishes()
})

const showModal = () => {
  modal.toggle()
}

const closeModal = () => {
  reset()
  modal.toggle()
}

/**********************Modal***********************/

const dishStore = useDishStore()
const orderStore = useOrderStore()

const dishId = ref('')
const quantity = ref(1)
const note = ref('')

const notSelectedDish = ref(false)

const order = computed(() => {
  return orderStore.order
})

const dishes = computed(() => {
  return dishStore.dishes.filter(
    (dish) => !order.value.details.some((detail) => detail.dish.id === dish.id)
  )
})

watch(quantity, (newValue, oldValue) => {
  const parsedValue = parseInt(newValue, 10)
  if (isNaN(parsedValue) || parsedValue < 1) {
    quantity.value = 1
  } else if (parsedValue > 999) {
    quantity.value = 999
  }
})

const reset = () => {
  dishId.value = ref('')
  quantity.value = 1
  note.value = ''
  notSelectedDish.value = false
}

const submitForm = async () => {
  if (dishId.value == '') {
    notSelectedDish.value = true
    return
  }

  notSelectedDish.value = false

  try {
    const detail = {
      quantity: quantity.value,
      note: note.value
    }
    await orderStore.createDetail(orderStore.order.id, dishId.value, detail)
    closeModal()
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
</script>
