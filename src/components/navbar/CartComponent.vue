<script setup>
import { useOrderStore } from '@/stores/orderStore'
defineProps(['item'])

const orderStore = useOrderStore()

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
</script>

<template>
  <div class="flex py-3 px-4 bitem-b hover:bg-gray-100">
    <div class="flex-shrink-0">
      <img class="w-16 h-16 object-cover rounded-lg" :src="item.dish.imagePath" />
    </div>
    <div class="pl-3 w-full">
      <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
        <span class="font-semibold text-gray-900 dark:text-white text-base">{{
          item.dish.dishName
        }}</span>
      </div>
      <div class="flex flex-row justify-between">
        <div class="">
          <p class="text-sm text-blue-600">{{ formatPrice(item.dish.price) }}</p>
        </div>
        <div class="">
          <p class="text-sm">
            Số lượng: <span class="text-blue-600">{{ item.quantity }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="flex items center">
      <button @click="orderStore.removeItem(item.dish.id)" type="button" class="p-4 ms-6">
        <svg
          class="w-[18px] h-[18px] text-gray-400 hover:text-gray-700 dark:text-white"
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
      </button>
    </div>
  </div>
</template>
