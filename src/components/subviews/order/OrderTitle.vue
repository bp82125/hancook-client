<template>
  <div class="relative overflow-x-auto shadow-lg rounded-lg md:px-8 py-4 border bg-white">
    <div class="grid grid-cols-1 md:grid-cols-2 rounded-lg bg-white hover:bg-gray-50 items-center">
      <div class="flex flex-row gap-2 items-start p-4 rounded-lg bg-white hover:bg-gray-50">
        <div>
          <svg
            class="w-6 h-6 md:w-[36px] md:h-[36px] text-gray-800 dark:text-white"
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
              stroke-width="1"
              d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
            />
          </svg>
        </div>

        <div v-if="order.table">
          <h1 class="font-semibold text-lg md:text-xl">{{ order.table.name }}</h1>
          <h1 class="font-semibold md:text-lg text-gray-600">#{{ order.id }}</h1>
          <h1 class="font-medium text-sm md:text-md text-gray-400">
            {{ formatDateTime(order.placedTime) }}
          </h1>
        </div>
      </div>

      <div class="flex flex-row gap-2 px-4 md:justify-end">
        <div>
          <svg
            class="w-6 h-6 md:w-[36px] md:h-[36px] text-gray-800 dark:text-white"
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
              stroke-width="1"
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>

        <div v-if="order.employee">
          <h1 class="font-medium text-lg md:text-xl">Nhân viên</h1>
          <div class="flex gap-2">
            <h1 class="text-gray-400 text-base">Họ và tên:</h1>
            <h1 class="text-base">{{ order.employee.name }}</h1>
          </div>
          <div class="flex gap-2">
            <h1 class="text-gray-400 text-base">SDT:</h1>
            <h1 class="text-base">{{ order.employee.phoneNumber }}</h1>
          </div>
          <div class="flex gap-2">
            <h1 class="text-gray-400 text-base">Chức vụ:</h1>
            <h1 class="text-base">{{ order.employee.position.positionName }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useOrderStore } from '@/stores/orderStore'
import { computed } from 'vue'

const orderStore = useOrderStore()

const order = computed(() => {
  return orderStore.order
})

const formatDateTime = (dateTime) => {
  var datetime = new Date(dateTime)
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',

    hour12: false
  }

  return datetime.toLocaleDateString('vi-VN', options).replace('lúc', '')
}
</script>
