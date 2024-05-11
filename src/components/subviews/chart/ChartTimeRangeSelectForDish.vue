<template>
  <div>
    <button
      id="dishTimeRangeButton"
      class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center"
      type="button"
    >
      <p>{{ selectedTime }}</p>
      <svg
        class="w-2.5 m-2.5 ms-1.5"
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
    <!-- Dropdown menu -->
    <div
      id="dishTimeRangeDropdown"
      class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <ul class="py-2 text-sm text-gray-500 dark:text-gray-200">
        <li>
          <button
            class="block w-full text-start px-4 py-2 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600"
            @click="updateSelectedTime('Hôm nay')"
          >
            Hôm nay
          </button>
        </li>
        <li>
          <button
            class="block w-full text-start px-4 py-2 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600"
            @click="updateSelectedTime('Hôm qua')"
          >
            Hôm qua
          </button>
        </li>
        <li>
          <button
            class="block w-full text-start px-4 py-2 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600"
            @click="updateSelectedTime('Tuần qua')"
          >
            Tuần qua
          </button>
        </li>
        <li>
          <button
            class="block w-full text-start px-4 py-2 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600"
            @click="updateSelectedTime('Tháng qua')"
          >
            Tháng qua
          </button>
        </li>
        <li>
          <button
            class="block w-full text-start px-4 py-2 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600"
            @click="updateSelectedTime('Quý qua')"
          >
            Quý qua
          </button>
        </li>
        <li>
          <button
            class="block w-full text-start px-4 py-2 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600"
            @click="updateSelectedTime('Năm qua')"
          >
            Năm qua
          </button>
        </li>

        <!-- Add other list items -->
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Dropdown } from 'flowbite'
import { initDropdowns } from 'flowbite'

let dropdown

const selectedTime = ref('Từ trước đến giờ')
const emits = defineEmits(['timeSelectedDish'])

onMounted(() => {
  initDropdowns()

  const $targetEl = document.getElementById('dishTimeRangeDropdown')
  const $triggerEl = document.getElementById('dishTimeRangeButton')

  const options = {
    placement: 'bottom',
    offsetSkidding: 0,
    offsetDistance: 10,
    ignoreClickOutsideClass: false
  }

  dropdown = new Dropdown($targetEl, $triggerEl, options)
})

const hideDropdown = () => {
  dropdown.hide()
}

const getTimeRange = (time) => {
  switch (time) {
    case 'Hôm nay':
      return 'today'
    case 'Hôm qua':
      return 'yesterday'
    case 'Tuần qua':
      return 'week'
    case 'Tháng qua':
      return 'month'
    case 'Quý qua':
      return 'quarter'
    case 'Năm qua':
      return 'year'
    default:
      return 'year'
  }
}

const updateSelectedTime = (time) => {
  selectedTime.value = time
  emits('timeSelectedDish', getTimeRange(time))
  hideDropdown()
}
</script>
