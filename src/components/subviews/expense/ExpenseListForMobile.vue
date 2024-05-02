<template>
  <ul v-for="(expense, index) in expenses" :key="expense.id" class="list-none">
    <li
      class="grid grid-cols-2 gap-x-2 gap-y-4 items-center p-4 border rounded-lg shadow-lg my-5 text-sm"
    >
      <div class="">
        <h1 class="font-semibold uppercase text-xl">#{{ index + 1 }}</h1>
      </div>

      <div class="w-full flex justify-end items-center">
        <button
          @click="$emit('updateExpense', expense)"
          class="text-gray-400 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-1 text-center"
        >
          <svg
            class="w-6 h-6"
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
          @click="$emit('deleteExpense', expense)"
          class="text-gray-400 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-1 text-center"
        >
          <svg
            class="w-6 h-6 dark:text-white"
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

      <h1 class="font-semibold uppercase">Mã chi tiêu</h1>
      <div class="line-clamp-1">
        <h1 class="text-end">{{ expense.id }}</h1>
      </div>

      <div class="h-full">
        <h1 class="font-semibold uppercase">Tên chi tiêu</h1>
      </div>
      <h1 class="text-end">{{ expense.name }}</h1>

      <h1 class="font-semibold uppercase">Số tiền chi</h1>
      <h1 class="text-end">{{ formatAmount(expense.amount) }}</h1>

      <div class="h-full">
        <h1 class="font-semibold uppercase">Ghi chú</h1>
      </div>
      <h1 class="text-end">{{ expense.note }}</h1>

      <h1 class="font-semibold uppercase">Người lập</h1>
      <h1 class="text-end">{{ expense.employee.name }}</h1>

      <h1 class="font-semibold uppercase">Thời gian lập</h1>
      <h1 class="text-end">{{ formatDateTime(expense.dateTime) }}</h1>
    </li>
  </ul>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useExpenseStore } from '@/stores/expenseStore'
import { format } from 'date-fns'

const expenseStore = useExpenseStore()

onMounted(async () => {
  await expenseStore.fetchExpenses()
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
