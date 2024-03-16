<template>
  <table
    class="table-auto border-collapse w-full text-base rtl:text-right text-gray-500 dark:text-gray-400"
  >
    <thead class="text-sm font-normal text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="text-center rounded-s-lg">Số thứ tự</th>
        <th scope="col" class="px-6 py-5 text-center rounded-e-lg">Tên chi tiêu</th>
        <th scope="col" class="pe-6 py-5 text-center">Số tiền chi</th>
        <th scope="col" class="px-6 py-5 text-center rounded-e-lg">Chi tiết</th>
        <th scope="col" class="py-5 text-center rounded-e-lg">Thời gian lập</th>
        <th scope="col" class="py-5"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(expense, index) in expenses"
        :key="expense.id"
        class="border-y bg-white dark:bg-gray-800"
      >
        <td class="text-gray-900 whitespace-nowrap dark:text-white text-center">
          {{ index + 1 }}
        </td>
        <th
          scope="row"
          class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white"
        >
          {{ expense.name }}
        </th>
        <td class="pe-6 py-4 text-center">
          {{ formatAmount(expense.amount) }}
        </td>
        <td class="px-6 py-4 text-center">
          {{ expense.note }}
        </td>
        <td class="px-6 py-4 text-center">
          {{ formatDateTime(expense.dateTime) }}
        </td>

        <!-- Edit button column -->
        <td class="py-3 text-center">
          <button
            @click="$emit('updatePosition', position)"
            class="text-white mx-1 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            @click="$emit('deletePosition', position)"
            class="text-white mx-1 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useExpenseStore } from '@/stores/expenseStore'
import { initFlowbite } from 'flowbite'
import { format } from 'date-fns'

const expenseStore = useExpenseStore()

onMounted(() => {
  expenseStore.fetchExpenses()
  initFlowbite()
})

const expenses = computed(() => {
  return expenseStore.expenses
})

const formatAmount = (amount) => {
  // Convert amount to VND format
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const formatDateTime = (dateTime) => {
  // Parse the dateTime string
  const parsedDateTime = new Date(dateTime)

  // Format the parsed dateTime
  return format(parsedDateTime, 'dd/MM/yyyy - HH:mm')
}
</script>
