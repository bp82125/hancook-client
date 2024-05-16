<template>
  <ul v-for="(item, index) in items" :key="item.dish.id" class="list-none">
    <li class="p-4 border rounded-lg shadow-lg my-5 text-sm">
      <div class="grid grid-cols-2 items-center">
        <h1 class="font-semibold uppercase text-lg">#{{ index + 1 }}</h1>
        <div class="flex justify-end">
          <button
            @click="cartItemStore.removeItem(item.dish.id)"
            class="text-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2 text-center"
          >
            <svg
              class="w-[18px] h-[18px] text-gray-800 dark:text-white"
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
        <img :src="item.dish.imagePath" class="w-16 h-16 rounded-lg object-cover" />
        <div class="flex flex-col line-clamp-">
          <h1 class="text-lg font-semibold">{{ item.dish.dishName }}</h1>
          <h1 class="text-sm font-light">{{ item.dish.dishType.dishTypeName }}</h1>
        </div>
      </div>

      <div class="flex justify-between items-center mt-3">
        <div class="flex flex-row space-x-1 items-center justify-center" role="group">
          <button
            @click="decreaseQuantity(item)"
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
            v-model="item.quantity"
            type="number"
            class="p-3 w-14 border-0 text-sm text-center font-medium text-gray-900 bg-transparent hover:bg-gray-900 rounded-lg hover:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />

          <button
            @click="increaseQuantity(item)"
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
        <h1 class="text-sm font-semibold uppercase">{{ formatPrice(getTotalPrice(item)) }}</h1>
      </div>

      <div class="flex flex-col w-full py-1 gap-1">
        <textarea
          v-model="item.note"
          rows="2"
          placeholder="Nhập ghi chú..."
          class="align-text-top w-full text-sm resize-none py-2 border border-gray-200 text-gray-700 bg-transparent hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useCartItemStore } from '@/stores/cartItemStore'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite()
})

const quantity = ref(1)
const cartItemStore = useCartItemStore()

const items = computed(() => {
  return cartItemStore.order.details
})

watch(quantity, (newValue, oldValue) => {
  const parsedValue = parseInt(newValue, 10)
  if (isNaN(parsedValue) || parsedValue < 1) {
    quantity.value = 1
  } else if (parsedValue > 999) {
    quantity.value = 999
  }
})

const increaseQuantity = (item) => {
  if (item.quantity < 999) {
    item.quantity++
  }
}

// Function to decrease quantity
const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

const getTotalPrice = (item) => {
  return item.dish.price * item.quantity
}
</script>
