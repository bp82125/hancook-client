<template>
  <table class="table-auto border-collapse w-full text-base rtl:text-right text-gray-500">
    <thead class="text-sm font-normal text-gray-700 uppercase">
      <tr>
        <th scope="col" class="text-center rounded-s-lg">Số thứ tự</th>
        <th scope="col" class="px-3 py-5 text-center rounded-e-lg">Tên chi tiêu</th>
        <th scope="col" class="px-3 py-5 text-center rounded-e-lg">Người lập</th>
        <th scope="col" class="px-3 py-5 text-center">Số tiền chi</th>
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
        <td scope="row" class="px-3 py-4 text-center font-normal text-gray-900 dark:text-white">
          {{ expense.name }}
        </td>

        <td class="px-3 py-4 text-center">
          {{ expense.employee.name }}
        </td>
        <td class="px-3 py-4 text-center">
          {{ formatAmount(expense.amount) }}
        </td>

        <td class="px-3 py-4 text-center">
          {{ formatDateTime(expense.dateTime) }}
        </td>

        <!-- Edit button column -->
        <td class="py-3 text-center">
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-1 my-1">
            <button
              @click="$emit('showNoteExpense', expense)"
              class="flex justify-center text-white bg-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center"
            >
              <svg
                class="w-[18px] h-[18px]"
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
                  d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <button
              @click="$emit('updateExpense', expense)"
              class="flex justify-center text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              @click="$emit('deleteExpense', expense)"
              class="flex justify-center text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
        </td>
      </tr>
    </tbody>
  </table>
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
