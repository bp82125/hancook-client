<template>
  <div class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden border">
    <img :src="dish.imagePath" class="aspect-square object-cover grow" alt="Product Image" />
    <div class="p-4">
      <!-- Adjust the max width here according to your needs -->
      <h5 class="text-sm lg:text-lg font-semibold truncate">{{ dish.dishName }}</h5>
      <p class="text-xs lg:text-base text-gray-700">{{ formatPrice(dish.price) }}</p>
      <div class="flex flex-row mt-3">
        <button
          @click="modalStore.toggleAddOrder(dish)"
          class="grow bg-gray-900 text-white w-full p-2 focus:ring-2 focus:ring-gray-300 flex justify-center hover:bg-slate-700 rounded-lg"
          type="button"
        >
          <svg
            class="w-[18px] h-[18px] dark:text-white"
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
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </button>

        <button
          :id="createButtonId(dish)"
          class="text-sm font-medium text-gray-500 px-1 focus:ring-2 focus:ring-gray-300 hover:text-gray-400 hover:bg-gray-100 rounded-lg text-center inline-flex items-center"
          type="button"
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
              stroke-width="3"
              d="M12 6h.01M12 12h.01M12 18h.01"
            />
          </svg>
        </button>
        <div
          :id="createDropdownId(dish)"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
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
    placement: 'right',
    offsetSkidding: 0,
    offsetDistance: 10,
    ignoreClickOutsideClass: false
  }

  dropdown = new Dropdown($targetEl, $triggerEl, options)
})
</script>
