<template>
  <ul v-for="(account, index) in accounts" :key="account.id" class="list-none">
    <li
      class="grid grid-cols-2 gap-x-2 gap-y-2 items-center p-4 border rounded-lg shadow-lg text-sm my-5"
    >
      <h1 class="font-semibold uppercase text-lg">#{{ index + 1 }}</h1>
      <div class="flex justify-end">
        <button
          @click="$emit('updateAccount', account)"
          class="text-gray-800 hover:bg-gray-100 hover:text-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2 text-center"
        >
          <svg
            class="w-[18px] h-[18px]"
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
          class="text-gray-800 hover:bg-gray-100 hover:text-gray-5 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm py-2 text-center"
        >
          <svg
            class="w-[18px] h-[18px] text-gray-800 dark:text-white"
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

      <div class="flex items-start h-full text-xs">
        <h1 class="font-semibold uppercase">Tên đăng nhập</h1>
      </div>

      <div class="flex items-start justify-end h-full">
        <h1 class="text-end">{{ account.username }}</h1>
      </div>

      <div class="flex items-start h-full text-xs">
        <h1 class="font-semibold uppercase">Người dùng</h1>
      </div>

      <div class="flex items-start justify-end h-full">
        <template v-if="account.employeeId">
          <h1>{{ account.employeeName }}</h1>
        </template>
        <template v-else>
          <h1>...</h1>
        </template>
      </div>

      <div class="flex items-start h-full text-xs">
        <h1 class="font-semibold uppercase">Loại tài khoản</h1>
      </div>

      <div class="flex items-start justify-end h-full">
        <h1 class="text-end">{{ roleMapping(account.role) }}</h1>
      </div>

      <div class="flex items-start h-full text-xs">
        <h1 class="font-semibold uppercase">Trạng thái tài khoản</h1>
      </div>

      <div class="inline-flex justify-end">
        <button
          v-if="account.enabled"
          @click="$emit('toggleAccount', account)"
          class="text-white flex justify-center bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2 text-center"
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
          class="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 text-center"
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

      <div class="col-span-2">
        <button
          @click="$emit('changePassword', account)"
          class="text-white w-full bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
        >
          Đặt lại mật khẩu
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAccountStore } from '@/stores/accountStore'

const accountStore = useAccountStore()

onMounted(() => {
  accountStore.fetchAccounts()
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
