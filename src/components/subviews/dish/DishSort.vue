<template>
  <div class="flex justify-start md:ms-3 shrink">
    <button
      id="sortMultiButton"
      data-dropdown-toggle="sortMultiRadio"
      data-dropdown-offset-skidding="-40"
      class="text-gray-800 w-fit hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      type="button"
    >
      Sắp xếp theo: {{ getValueDish(criteriaDish) }}, {{ getValueType(criteriaType) }}
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
    id="sortMultiRadio"
    class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
  >
    <ul
      class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="sortMultiButton"
    >
      <li>
        <div class="flex items-center">
          <button
            id="dishSortButton"
            data-dropdown-toggle="dishSortRadio"
            data-dropdown-placement="right-start"
            data-dropdown-offset-distance="20"
            type="button"
            class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Món ăn
            <svg
              class="w-2.5 h-2.5 ms-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
          <div
            id="dishSortRadio"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          >
            <ul
              class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="sortMultiButton"
            >
              <li>
                <div class="flex items-center">
                  <input
                    id="dishDefaultRadio"
                    type="radio"
                    v-model="criteriaDish"
                    value="defaultValue"
                    name="criteriaDish"
                    class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    checked
                  />
                  <label
                    for="dishDefaultRadio"
                    class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
                    >Mặc định</label
                  >
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <input
                    id="dishNameRadio"
                    type="radio"
                    v-model="criteriaDish"
                    value="name"
                    name="criteriaDish"
                    class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    for="dishNameRadio"
                    class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
                    >Tên món</label
                  >
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <input
                    id="dishPriceRadio"
                    type="radio"
                    v-model="criteriaDish"
                    value="price"
                    name="criteriaDish"
                    class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="dishPriceRadio"
                    class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
                    >Giá</label
                  >
                </div>
              </li>
            </ul>
            <ul
              class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="sortMultiButton"
            >
              <li>
                <div class="flex items-center">
                  <input
                    id="dishAscRadio"
                    type="radio"
                    v-model="modeDish"
                    value="asc"
                    name="modeDish"
                    class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    checked
                  />
                  <label
                    for="dishAscRadio"
                    class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
                    >Tăng dần</label
                  >
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <input
                    id="dishDescRadio"
                    type="radio"
                    v-model="modeDish"
                    value="desc"
                    name="modeDish"
                    class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="dishDescRadio"
                    class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
                    >Giảm dần</label
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </li>

      <li>
        <div class="flex items-center">
          <button
            id="typeSortButton"
            data-dropdown-toggle="typeSortRadio"
            data-dropdown-placement="right-start"
            data-dropdown-offset-distance="20"
            type="button"
            class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Loại món ăn
            <svg
              class="w-2.5 h-2.5 ms-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
          <div
            id="typeSortRadio"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          >
            <ul
              class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="sortMultiButton"
            >
              <li>
                <div class="flex items-center">
                  <input
                    id="typeDefaultRadio"
                    type="radio"
                    v-model="criteriaType"
                    value="defaultValue"
                    name="typeCriteria"
                    class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    checked
                  />
                  <label
                    for="typeDefaultRadio"
                    class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
                    >Mặc định</label
                  >
                </div>
              </li>

              <li>
                <div class="flex items-center">
                  <input
                    id="typeNameRadio"
                    type="radio"
                    v-model="criteriaType"
                    value="name"
                    name="typeCriteria"
                    class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="typeNameRadio"
                    class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
                    >Tên loại</label
                  >
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <input
                    id="typeNumberRadio"
                    type="radio"
                    v-model="criteriaType"
                    value="numberOfDishes"
                    name="typeCriteria"
                    class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="typeNumberRadio"
                    class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
                    >Số lượng món</label
                  >
                </div>
              </li>
            </ul>
            <ul
              class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="sortMultiButton"
            >
              <li>
                <div class="flex items-center">
                  <input
                    id="typeAscRadio"
                    type="radio"
                    v-model="modeType"
                    value="asc"
                    name="modeType"
                    class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    checked
                  />
                  <label
                    for="typeAscRadio"
                    class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
                    >Tăng dần</label
                  >
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <input
                    id="typeDescRadio"
                    type="radio"
                    v-model="modeType"
                    value="desc"
                    name="modeType"
                    class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="typeDescRadio"
                    class="ms-2 text-sm font-medium w-full text-gray-900 dark:text-gray-300"
                    >Giảm dần</label
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { useDishStore } from '@/stores/dishStore'
import { useDishTypeStore } from '@/stores/dishTypeStore'
import { initDropdowns } from 'flowbite'

onMounted(() => {
  initDropdowns()
})

const dishStore = useDishStore()
const criteriaDish = ref('defaultValue')
const modeDish = ref('asc')

const dishTypeStore = useDishTypeStore()
const criteriaType = ref('defaultValue')
const modeType = ref('asc')

const getValueDish = (criteriaDish) => {
  if (criteriaDish === 'defaultValue') {
    return 'Mặc định'
  }
  if (criteriaDish === 'name') {
    return 'Tên món'
  }
  if (criteriaDish === 'price') {
    return 'Giá'
  }
}

const getValueType = (criteriaType) => {
  if (criteriaType === 'defaultValue') {
    return 'Mặc định'
  }
  if (criteriaType === 'name') {
    return 'Tên loại'
  }
  if (criteriaType === 'numberOfDishes') {
    return 'Số lượng món'
  }
}

watchEffect(() => {
  dishStore.sortDishes(criteriaDish.value, modeDish.value)
  dishTypeStore.sortDishTypes(criteriaType.value, modeType.value)
})
</script>
