<template>
  <div class="flex justify-start md:ms-3 shrink">
    <button
      id="sortEmployeeButton"
      data-dropdown-toggle="sortEmployeeRadio"
      data-dropdown-placement="bottom"
      class="text-gray-800 w-fit hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
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
    id="sortEmployeeRadio"
    class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
  >
    <ul
      class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="sortEmployeeButton"
    >
      <li>
        <div class="flex items-center">
          <input
            id="employeeDefaultRadio"
            type="radio"
            v-model="criteria"
            value="defaultValue"
            name="default-radio"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            checked
          />
          <label
            for="employeeDefaultRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Mặc định</label
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <input
            id="employeeNameRadio"
            type="radio"
            v-model="criteria"
            value="name"
            name="default-radio"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <label
            for="employeeNameRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Tên</label
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <input
            id="employeePhoneNumRadio"
            type="radio"
            v-model="criteria"
            value="phoneNumber"
            name="default-radio"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="employeePhoneNumRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Số điện thoại</label
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <input
            id="employeePostionRadio"
            type="radio"
            v-model="criteria"
            value="position"
            name="default-radio"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="employeePostionRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Chức vụ</label
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <input
            id="employeeAccountRadio"
            type="radio"
            v-model="criteria"
            value="account"
            name="default-radio"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="employeeAccountRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Tài khoản</label
          >
        </div>
      </li>
    </ul>
    <ul
      class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="sortEmployeeModeButton"
    >
      <li>
        <div class="flex items-center">
          <input
            id="employeeAscRadio"
            type="radio"
            v-model="mode"
            value="asc"
            name="default-radio2"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            checked
          />
          <label
            for="employeeAscRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Tăng dần</label
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <input
            id="employeeDescRadio"
            type="radio"
            v-model="mode"
            value="desc"
            name="default-radio2"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="employeeDescRadio"
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
import { useEmployeeStore } from '@/stores/employeeStore'
import { initDropdowns } from 'flowbite'

onMounted(() => {
  initDropdowns()
})

const employeeStore = useEmployeeStore()
const criteria = ref('defaultValue')
const mode = ref('asc')

const getValue = (criteria) => {
  if (criteria === 'defaultValue') {
    return 'Mặc định'
  }
  if (criteria === 'name') {
    return 'Tên'
  }
  if (criteria === 'phoneNumber') {
    return 'Số điện thoại'
  }
  if (criteria === 'position') {
    return 'Chức vụ'
  }
  if (criteria === 'account') {
    return 'Tài khoản'
  }
}

watchEffect(async () => {
  await employeeStore.sortEmployee(criteria.value, mode.value)
})
</script>
