<template>
  <ul v-for="(detail, index) in details" :key="detail.dish.id" class="list-none my-3">
    <li class="p-4 border rounded-lg shadow-lg my-5 text-sm">
      <div class="grid grid-cols-2 items-center">
        <h1 class="font-semibold text-lg">#{{ index }}</h1>
        <div class="flex justify-end">
          <button
            @click="saveDetail(detail)"
            type="button"
            class="text-gray-400 hover:text-gray-800 font-medium rounded-lg text-sm p-2 text-center"
          >
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm3 11a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6H8v-6Zm1-7V5h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
                clip-rule="evenodd"
              />
              <path fill-rule="evenodd" d="M14 17h-4v-2h4v2Z" clip-rule="evenodd" />
            </svg>
          </button>
          <button
            @click="$emit('deleteDetailMobile', detail)"
            class="text-gray-400 hover:text-gray-800 font-medium rounded-lg text-sm p-2 text-center"
          >
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex my-3 gap-x-4">
        <img :src="detail.dish.imagePath" class="w-20 h-20 rounded-lg object-cover" />
        <div class="flex flex-col justify-center line-clamp-2">
          <h1 class="text-lg font-semibold">{{ detail.dish.dishName }}</h1>
          <h1 class="text-sm font-light">{{ detail.dish.dishType.dishTypeName }}</h1>
        </div>
      </div>

      <div class="flex justify-between items-center mt-3">
        <div class="flex flex-row space-x-1 items-center justify-center" role="group">
          <button
            @click="decreaseQuantity(detail)"
            type="button"
            class="inline-flex items-center p-3 text-sm font-medium text-gray-900 bg-transparent hover:rounded-lg hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
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
            v-model="detail.quantity"
            type="number"
            class="p-3 w-14 border-0 text-sm text-center font-medium text-gray-900 bg-transparent hover:bg-gray-900 rounded-lg hover:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />

          <button
            @click="increaseQuantity(detail)"
            type="button"
            class="inline-flex items-center p-3 text-sm font-medium text-gray-900 bg-transparent hover:bg-gray-900 hover:rounded-lg hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
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
        <h1 class="text-sm font-semibold uppercase">{{ formatPrice(getTotalPrice(detail)) }}</h1>
      </div>

      <div class="flex flex-col w-full my-2">
        <textarea
          v-model="detail.note"
          rows="2"
          placeholder="Nhập ghi chú..."
          class="align-text-top w-full text-sm resize-none py-2 border border-gray-200 text-gray-700 bg-transparent hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </li>
  </ul>
  <div class="my-3">
    <button
      @click="saveAllDetails()"
      class="block w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
    >
      Lưu tất cả
    </button>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import OrderAddDish from './OrderAddDish.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const quantity = ref(1)
const orderStore = useOrderStore()

const details = computed(() => {
  return orderStore.order.details
})

watch(quantity, (newValue, oldValue) => {
  const parsedValue = parseInt(newValue, 10)
  if (isNaN(parsedValue) || parsedValue < 1) {
    quantity.value = 1
  } else if (parsedValue > 999) {
    quantity.value = 999
  }
})

const increaseQuantity = (detail) => {
  if (detail.quantity < 999) {
    detail.quantity++
  }
}

const decreaseQuantity = (detail) => {
  if (detail.quantity > 1) {
    detail.quantity--
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

const getTotalPrice = (detail) => {
  return detail.dish.price * detail.quantity
}

const saveDetail = async (detail) => {
  const response = await orderStore.updateDetail(detail)
  if (response.data.success) {
    toast.success('Chi tiết đơn món đã được lưu thành công')
  } else {
    toast.error('Chi tiết đơn món lưu thất bại')
  }
}

const saveAllDetails = async () => {
  const success = await orderStore.updateAllDetails()
  if (success) {
    toast.success('Tất cả chi tiết đơn món đã được lưu thành công')
  } else {
    toast.error('Chi tiết đơn món lưu thất bại')
  }
}

defineOptions({
  inheritAttrs: false
})
</script>
