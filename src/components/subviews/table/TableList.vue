<template>
  <table
    class="table-auto border-collapse w-full text-base rtl:text-right text-gray-500 mt-5 p-8 dark:text-gray-400"
  >
    <thead class="text-sm font-normal text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="text-center rounded-s-lg">Số thứ tự</th>
        <th scope="col" class="px-6 py-5 text-center rounded-e-lg">Tên bàn</th>
        <th scope="col" class="px-6 py-5 text-center rounded-e-lg">Trạng thái bàn</th>
        <th scope="col" class="px-6 py-5 text-center rounded-e-lg">Đơn món</th>
        <th v-if="isAdmin" scope="col" class="py-5"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(table, index) in tables"
        :key="table.id"
        class="border-y bg-white dark:bg-gray-800"
      >
        <th class="text-gray-800 font-normal whitespace-nowrap dark:text-white text-center">
          {{ index + 1 }}
        </th>
        <td
          scope="row"
          class="px-6 py-4 font-normal text-center text-gray-900 whitespace-nowrap dark:text-white"
        >
          {{ table.name }}
        </td>

        <td scope="row" class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap">
          <div class="flex justify-center">
            <template v-if="table.state === 'occupied'">
              <svg
                class="w-6 h-6 text-red-500 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            <template v-else>
              <svg
                class="w-6 h-6 text-green-500 text-center dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
          </div>
        </td>

        <th
          scope="row"
          class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white"
        >
          <button
            :disabled="table.state === 'available'"
            @click="showOrder(table)"
            class="text-white mx-1 bg-gray-800 hover:bg-gray-600 focus:ring-4 disabled:bg-gray-300 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <h1 class="text-sm">Xem chi tiết</h1>
          </button>
        </th>

        <!-- Edit button column -->
        <td v-if="isAdmin" class="py-3 text-center">
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="$emit('updateTable', table)"
              class="flex justify-center text-white w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              @click="$emit('deleteTable', table)"
              class="flex justify-center text-white w-full bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
import { useTableStore } from '@/stores/tableStore'
import { useRouter } from 'vue-router'

const tableStore = useTableStore()
const router = useRouter()

onMounted(async () => {
  await tableStore.fetchTable()
})

const tables = computed(() => {
  return tableStore.tables
})

const showOrder = async (table) => {
  router.push({ name: 'order', params: { tableId: table.id } })
}

import { computedAsync } from '@vueuse/core'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
})

const isAdmin = computedAsync(async () => {
  return await userStore.isAdmin()
}, true)
</script>
