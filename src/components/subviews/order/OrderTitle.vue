<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-8 py-4 border bg-white">
    <div class="grid grid-cols-2 items-start rounded-lg bg-white hover:bg-gray-50 items-center">
      <div class="flex flex-row gap-2 items-start p-4 rounded-lg bg-white hover:bg-gray-50">
        <svg
          class="w-[36px] h-[36px] text-gray-800 dark:text-white"
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
            d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
          />
        </svg>

        <div>
          <h1 class="font-semibold text-xl">{{ orderStore.order.table.name }}</h1>
          <h1 class="font-semibold text-lg text-gray-600">Đơn món #{{ orderStore.order.id }}</h1>
          <h1 class="font-medium text-md text-gray-400">
            {{ formatDateTime(orderStore.order.placedTime) }}
          </h1>
        </div>
      </div>

      <div class="flex flex-row gap-2 justify-center">
        <div>
          <svg
            class="w-[36px] h-[36px] text-gray-800 dark:text-white"
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

        <div>
          <h1 class="font-medium text-lg">Nhân viên</h1>
          <div class="flex gap-2">
            <h1 class="text-gray-400 text-md">Họ tên:</h1>
            <h1 class="text-md">{{ orderStore.order.employee.name }}</h1>
          </div>
          <div class="flex gap-2">
            <h1 class="text-gray-400 text-md">SDT:</h1>
            <h1 class="text-md">{{ orderStore.order.employee.phoneNumber }}</h1>
          </div>
          <div class="flex gap-2">
            <h1 class="text-gray-400 text-md">Chức vụ:</h1>
            <h1 class="text-md">{{ orderStore.order.employee.position.positionName }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useOrderStore } from '@/stores/orderStore'
const orderStore = useOrderStore()

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
