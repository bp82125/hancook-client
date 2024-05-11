<template>
  <div class="flex md:justify-end md:ms-3 shrink">
    <button
      id="sortPositionButton"
      data-dropdown-toggle="sortPositionRadio"
      class="text-gray-800 w-fit hover:bg-gray-100 font-medium rounded-lg text-sm ps-1 pe-5 md:px-5 py-2.5 text-center inline-flex items-center"
      type="button"
    >
      Sắp xếp theo: {{ getValue(criteria) }}
      <svg
        class="w-2.5 h-2.5 ms-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
  </div>

  <!-- Dropdown menu -->
  <div
    id="sortPositionRadio"
    class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
  >
    <ul
      class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="sortPositionButton"
    >
      <li>
        <div class="flex items-center">
          <input
            id="positionDefaultRadio"
            type="radio"
            v-model="criteria"
            value="defaultValue"
            name="default-radio"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            checked
          />
          <label
            for="positionDefaultRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Mặc định</label
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <input
            id="accountEmployeeRadio"
            type="radio"
            v-model="criteria"
            value="employee"
            name="default-radio"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <label
            for="accountEmployeeRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Người dùng</label
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <input
            id="accountUsernameRadio"
            type="radio"
            v-model="criteria"
            value="username"
            name="default-radio"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="accountUsernameRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Tên đăng nhập</label
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <input
            id="accountRoleRadio"
            type="radio"
            v-model="criteria"
            value="role"
            name="default-radio"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="accountRoleRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Loại</label
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <input
            id="accountEnabled"
            type="radio"
            v-model="criteria"
            value="enabled"
            name="default-radio"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="accountEnabled"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Trạng thái</label
          >
        </div>
      </li>
    </ul>
    <ul
      class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="sortExpenseModeButton"
    >
      <li>
        <div class="flex items-center">
          <input
            id="expenseAscRadio"
            type="radio"
            v-model="mode"
            value="asc"
            name="default-radio2"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            checked
          />
          <label
            for="expenseAscRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Tăng dần</label
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <input
            id="expenseDescRadio"
            type="radio"
            v-model="mode"
            value="desc"
            name="default-radio2"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="expenseDescRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Giảm dần</label
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { useAccountStore } from '@/stores/accountStore'
import { initDropdowns } from 'flowbite'

onMounted(() => {
  initDropdowns()
})

const accountStore = useAccountStore()
const criteria = ref('defaultValue')
const mode = ref('asc')

const getValue = (criteria) => {
  if (criteria === 'defaultValue') {
    return 'Mặc định'
  }
  if (criteria === 'employee') {
    return 'Người dùng'
  }
  if (criteria === 'username') {
    return 'Tên đăng nhập'
  }
  if (criteria === 'role') {
    return 'Loại'
  }
  if (criteria === 'enabled') {
    return 'Trạng thái'
  }
}

watchEffect(() => {
  accountStore.sortAccounts(criteria.value, mode.value)
})
</script>
