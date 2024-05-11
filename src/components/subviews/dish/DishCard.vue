<template>
  <div class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden border">
    <div class="relative">
      <img
        @click="modalStore.toggleAddOrder(dish)"
        :src="dish.imagePath"
        class="aspect-square object-cover grow hover:opacity-75"
        alt="Product Image"
        loading="lazy"
      />
      <button
        :id="createButtonId(dish)"
        class="absolute top-0 right-0 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:bg-opacity-30 p-2 md:p-4 rounded-lg text-center inline-flex items-center"
        type="button"
        v-if="isAdmin"
      >
        <svg
          class="w-6 h-6 text-white bg-transparent group-hover:text-gray-800"
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
            stroke-width="3"
            d="M12 6h.01M12 12h.01M12 18h.01"
          />
        </svg>
      </button>
      <div
        :id="createDropdownId(dish)"
        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        v-if="isAdmin"
      >
        <ul class="py-2 text-sm text-gray-500 dark:text-gray-200">
          <li>
            <button
              class="block w-full text-start px-4 py-2 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600"
              @click="
                () => {
                  modalStore.toggleUpdateDish(dish)
                  dropdown.toggle()
                }
              "
            >
              Chỉnh sửa
            </button>
          </li>
          <li>
            <button
              class="block w-full text-start px-4 py-2 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600"
              @click="
                () => {
                  modalStore.toggleDeleteDish(dish)
                  dropdown.toggle()
                }
              "
            >
              Xóa
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div @click="modalStore.toggleAddOrder(dish)" class="flex justify-between p-2.5 pe-0 md:p-4">
      <!-- Adjust the max width here according to your needs -->
      <div>
        <h5 class="text-sm md:text-base lg:text-lg font-semibold line-clamp-1">
          {{ dish.dishName }}
        </h5>
        <p class="text-xs md:text-sm lg:text-base text-gray-700 font-thin">
          {{ formatPrice(dish.price) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'
import { useModalStore } from '@/stores/modalStore'
import { Dropdown } from 'flowbite'
import { initDropdowns } from 'flowbite'

const props = defineProps({
  dish: Object
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

const modalStore = useModalStore()

const createButtonId = (dish) => {
  return dish.id + '_button'
}

const createDropdownId = (dish) => {
  return dish.id + '_dropdown'
}

let dropdown
onMounted(() => {
  initDropdowns()

  const $targetEl = document.getElementById(createDropdownId(props.dish))
  const $triggerEl = document.getElementById(createButtonId(props.dish))

  const options = {
    placement: 'bottom',
    offsetSkidding: 0,
    offsetDistance: 10,
    ignoreClickOutsideClass: false
  }

  dropdown = new Dropdown($targetEl, $triggerEl, options)
})

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
