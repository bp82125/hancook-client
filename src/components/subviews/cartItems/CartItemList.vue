<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 px-8 py-4 border bg-white">
    <table class="table-auto w-full text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase">
        <tr>
          <th scope="col" class="px-6 py-3 w-36"></th>
          <th scope="col" class="px-6 py-3 text-center w-auto">Món ăn</th>
          <th scope="col" class="px-6 py-3">Số lượng</th>
          <th scope="col" class="px-6 py-3 min-w-36 text-end">Giá</th>
          <th scope="col" class="px-9 py-3 w-32 text-start">Ghi chú</th>
          <th scope="col" class="px-6 py-3 w-8"></th>
        </tr>
      </thead>
      <tbody class="divide-y-2">
        <tr
          v-for="item in items"
          :key="item.dish.id"
          class="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th scope="row" class="px-6 py-4">
            <img :src="item.dish.imagePath" class="w-24 h-24 rounded-lg object-cover" />
          </th>
          <td class="px-6 py-4">
            <div>
              <h2 class="font-semibold text-xl text-gray-900">
                {{ item.dish.dishName }}
              </h2>
              <h2 class="font-thin text-md text-gray-600">
                {{ item.dish.dishType.dishTypeName }}
              </h2>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex flex-row space-x-1 items-center justify-center" role="group">
              <button
                @click="decreaseQuantity(item)"
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
                v-model="item.quantity"
                type="number"
                class="px-4 py-2 w-14 border-0 text-sm text-center font-medium text-gray-900 bg-transparent hover:bg-gray-900 rounded-lg hover:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />

              <button
                @click="increaseQuantity(item)"
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
          </td>
          <td class="px-6 py-4 text-end font-semibold text-gray-900">
            {{ formatPrice(getTotalPrice(item)) }}
          </td>

          <td class="px-6 py-4">
            <textarea
              v-model="item.note"
              rows="3"
              placeholder="
              ..."
              class="align-text-top resize-none py-2 border-0 text-sm text-gray-700 bg-transparent hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </td>
          <td class="px-6 py-4 text-center">
            <button
              @click="orderStore.removeItem(item.dish.id)"
              type="button"
              class="px-6 py-2 text-sm font-medium text-red-500 bg-transparent rounded-lg hover:bg-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              Xoá
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'

const quantity = ref(1)
const orderStore = useOrderStore()

const items = computed(() => {
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
