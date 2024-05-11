<template>
  <!-- Dropdown menu -->
  <div id="cart-dropdown" class="z-40 shadow-lg bg-white divide-y divide-gray-100 rounded-lg w-96">
    <div class="px-4 py-3 text-sm text-gray-900">
      <h1 class="font-medium text-lg text-center">Các món ăn đã chọn</h1>
    </div>

    <template v-if="items.length > 0">
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-64 overflow-y-auto"
        aria-labelledby="cartDropdownbutton"
      >
        <li v-for="item in items" :key="item.dish.id">
          <CartComponent :item="item"></CartComponent>
        </li>
      </ul>
    </template>

    <div class="flex justify-center items-end">
      <button
        @click="showCart"
        class="w-full rounded-lg py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
      >
        <div class="inline-flex items-center">
          <svg
            aria-hidden="true"
            class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path
              fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Xem tất cả
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import CartComponent from './CartComponent.vue'
import { useCartItemStore } from '@/stores/cartItemStore'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Dropdown } from 'flowbite'

let dropdown
onMounted(() => {
  const $targetEl = document.getElementById('cart-dropdown')
  const $triggerEl = document.getElementById('cart-button')

  dropdown = new Dropdown($targetEl, $triggerEl)
  dropdown.hide()
})

const router = useRouter()
const cartItemStore = useCartItemStore()

const items = computed(() => {
  return cartItemStore.order.details
})

const showCart = () => {
  router.push({ path: '/dashboard/cart' })
  dropdown.toggle()
}
</script>
