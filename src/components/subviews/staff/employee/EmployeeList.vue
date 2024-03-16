<template>
  <table
    class="table-auto border-collapse w-full text-base rtl:text-right text-gray-500 dark:text-gray-400"
  >
    <thead class="text-sm font-normal text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="text-center">Số thứ tự</th>
        <th scope="col" class="px-6 py-5 text-center">Họ và tên</th>
        <th scope="col" class="px-6 py-5 text-center">Số điện thoại</th>
        <th scope="col" class="px-6 py-5 text-center">Chức vụ</th>
        <th scope="col" class="px-6 py-5 text-center">Tài khoản</th>
        <th scope="col" class="px-6 py-5 text-center"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(employee, index) in employees"
        :key="employee.id"
        class="border-y bg-white dark:bg-gray-800"
      >
        <td class="text-gray-900 whitespace-nowrap dark:text-white text-center">
          {{ index + 1 }}
        </td>
        <th
          scope="row"
          class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white"
        >
          {{ employee.name }}
        </th>

        <td class="px-6 py-4 text-center">
          {{ employee.phoneNumber }}
        </td>

        <td class="px-6 py-4 text-center">
          {{ employee.position.positionName }}
        </td>

        <td class="px-6 py-3 text-center">
          <template v-if="employee.account">
            <div>{{ employee.account.username }}</div>
          </template>
          <template v-else>
            <button
              @click="$emit('createAccount', employee)"
              class="text-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mx-1 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <p>Tạo</p>
            </button>
          </template>
        </td>

        <td class="text-center">
          <button
            @click="$emit('showEmployee', employee)"
            class="text-white bg-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 mx-1 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <svg
              class="w-[18px] h-[18px] text-white-800 dark:text-white"
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
                d="M10 11h2v5m-2 0h4m-2.6-8.5h0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <button
            @click="$emit('updateEmployee', employee)"
            class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mx-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            @click="$emit('deleteEmployee', employee)"
            class="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 mx-1 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
import { useEmployeeStore } from '@/stores/employeeStore'
import { initFlowbite } from 'flowbite'

const employeeStore = useEmployeeStore()

onMounted(() => {
  employeeStore.fetchEmployees()
  initFlowbite()
})

const employees = computed(() => {
  return employeeStore.employees
})
</script>
