<template>
  <div class="flex justify-start md:ms-3 shrink">
    <button
      id="sortPositionButton"
      data-dropdown-toggle="sortPositionRadio"
      data-dropdown-placement="bottom"
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
            id="positionNameRadio"
            type="radio"
            v-model="criteria"
            value="name"
            name="default-radio"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <label
            for="positionNameRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Tên</label
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <input
            id="positionSalaryRadio"
            type="radio"
            v-model="criteria"
            value="salary"
            name="default-radio"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="positionSalaryRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Hệ số lương</label
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <input
            id="positionEmployee"
            type="radio"
            v-model="criteria"
            value="employee"
            name="default-radio"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="positionEmployee"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Số lượng nhân viên</label
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
            id="positionAscRadio"
            type="radio"
            v-model="mode"
            value="asc"
            name="default-radio2"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            checked
          />
          <label
            for="positionAscRadio"
            class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
            >Tăng dần</label
          >
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <input
            id="positionDescRadio"
            type="radio"
            v-model="mode"
            value="desc"
            name="default-radio2"
            class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="positionDescRadio"
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
import { usePositionStore } from '@/stores/positionStore'
import { initDropdowns } from 'flowbite'

onMounted(() => {
  initDropdowns()
})

const positionStore = usePositionStore()
const criteria = ref('defaultValue')
const mode = ref('asc')

const getValue = (criteria) => {
  if (criteria === 'defaultValue') {
    return 'Mặc định'
  }
  if (criteria === 'name') {
    return 'Tên'
  }
  if (criteria === 'salary') {
    return 'Hệ số lương'
  }
  if (criteria === 'employee') {
    return 'Số lượng nhân viên'
  }
}

watchEffect(() => {
  positionStore.sortPositions(criteria.value, mode.value)
})
</script>
