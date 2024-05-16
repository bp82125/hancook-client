<template>
  <table
    class="table-auto border-collapse w-full text-base rtl:text-right text-gray-500 dark:text-gray-400"
  >
    <thead class="text-sm font-normal text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="text-center">Số thứ tự</th>
        <th scope="col" class="px-6 py-5 text-center">Người dùng</th>
        <th scope="col" class="px-6 py-5 text-center">Tên đăng nhập</th>
        <th scope="col" class="px-6 py-5 text-center">Loại tài khoản</th>
        <th scope="col" class="px-6 py-5 text-center">Trạng thái</th>
        <th scope="col" class="px-6 py-5 text-center"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(account, index) in accounts"
        :key="account.id"
        class="border-y bg-white dark:bg-gray-800"
      >
        <td class="text-gray-900 whitespace-nowrap dark:text-white text-center">
          {{ index + 1 }}
        </td>

        <th class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <template v-if="account.employeeId">
            <div>{{ account.employeeName }}</div>
          </template>
          <template v-else>
            <div>...</div>
          </template>
        </th>
        <th class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white">
          {{ account.username }}
        </th>

        <td
          class="px-6 py-4 font-normal text-center text-gray-900 whitespace-nowrap dark:text-whiter"
        >
          {{ roleMapping(account.role) }}
        </td>

        <td class="px-6 py-4 text-center">
          <div class="inline-flex">
            <button
              v-if="account.enabled"
              @click="$emit('toggleAccount', account)"
              class="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 mx-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  d="m5 12 4.7 4.5 9.3-9"
                />
              </svg>
            </button>
            <button
              v-else
              @click="$emit('toggleAccount', account)"
              class="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 mx-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  d="M6 18 18 6m0 12L6 6"
                />
              </svg>
            </button>
          </div>
        </td>

        <td class="text-center">
          <div class="grid grid-cols-1 xl:grid-cols-3 my-1 gap-y-1">
            <button
              @click="$emit('changePassword', account)"
              class="flex justify-center text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 mx-1 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-[18px] h-[18px] text-white dark:text-white"
              >
                <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
            </button>

            <button
              @click="$emit('updateAccount', account)"
              class="flex justify-center text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mx-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              @click="$emit('deleteAccount', account)"
              class="flex justify-center text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 mx-1 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
import { useAccountStore } from '@/stores/accountStore'

const accountStore = useAccountStore()

onMounted(async () => {
  await accountStore.fetchAccounts()
})

const accounts = computed(() => {
  return accountStore.accounts
})

function roleMapping(role) {
  switch (role) {
    case 'admin':
      return 'Quản trị'
    case 'staff':
      return 'Nhân viên'
    default:
      return role
  }
}
</script>
