<template>
  <ul v-for="(employee, index) in employees" :key="employee.id" class="list-none">
    <li class="grid grid-cols-2 gap-x-2 gap-y-3 items-center p-4 border rounded-lg shadow-lg my-5">
      <h1 class="font-semibold uppercase text-lg">#{{ index + 1 }}</h1>

      <div class="flex justify-end">
        <button
          @click="$emit('updateEmployee', employee)"
          class="text-gray-400 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2 text-center"
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
          @click="$emit('deleteEmployee', employee)"
          class="text-gray-400 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm py-2 text-center"
        >
          <svg
            class="w-6 h-6"
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

      <div class="flex items-start h-full">
        <h1 class="font-semibold uppercase items-start text-xs">Họ tên</h1>
      </div>
      <h1 class="text-end text-sm">{{ employee.name }}</h1>

      <div class="flex items-start h-full">
        <h1 class="font-semibold uppercase items-start text-xs">Chức vụ</h1>
      </div>

      <h1 class="text-end text-sm">{{ employee.position.positionName }}</h1>

      <h1 class="font-semibold uppercase items-start text-xs">Tài khoản</h1>
      <template v-if="employee.account">
        <h1 class="text-end text-sm">{{ employee.account.username }}</h1>
      </template>
      <template v-else>
        <button
          @click="$emit('createAccount', employee)"
          class="bg-blue-500 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
        >
          <p>Tạo</p>
        </button>
      </template>

      <div class="col-span-2">
        <button
          @click="$emit('showEmployee', employee)"
          class="text-white w-full bg-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Xem chi tiết
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'

const employeeStore = useEmployeeStore()

onMounted(async () => {
  await employeeStore.fetchEmployees()
})

const employees = computed(() => {
  return employeeStore.employees
})
</script>
