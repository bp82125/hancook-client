<script setup>
import { defineProps } from 'vue'
import { useModalStore } from '@/stores/modalStore'

defineProps({
  dish: Object
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

const modalStore = useModalStore()
</script>

<template>
  <div class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden border">
    <img :src="dish.imagePath" class="w-72 h-72 object-cover grow" alt="Product Image" />
    <div class="p-4 max-w-72">
      <!-- Adjust the max width here according to your needs -->
      <h5 class="text-lg font-semibold truncate">{{ dish.dishName }}</h5>
      <p class="text-gray-700">{{ formatPrice(dish.price) }}</p>
      <div class="flex flex-row">
        <button
          @click="modalStore.toggleAddOrder(dish)"
          class="grow bg-gray-900 text-white w-full p-2 flex justify-center hover:bg-slate-700 mt-3 rounded-lg"
          type="button"
        >
          <svg
            class="w-[18px] h-[18px] dark:text-white"
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
        <button
          @click="modalStore.toggleUpdateDish(dish)"
          class="bg-blue-500 text-white flex justify-center p-2 hover:bg-blue-700 mt-3 ms-1 rounded-lg"
          type="button"
        >
          <svg
            class="w-[18px] h-[18px] text-white dark:text-white"
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
              d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
            />
          </svg>
        </button>

        <button
          @click="modalStore.toggleDeleteDish(dish)"
          class="bg-red-500 text-white flex justify-center p-2 hover:bg-red-700 mt-3 ms-1 rounded-lg"
          type="button"
        >
          <svg
            class="w-[18px] h-[18px] text-white dark:text-white"
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
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
