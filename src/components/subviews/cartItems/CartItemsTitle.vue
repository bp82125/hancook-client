<template>
  <div
    class="grid grid-cols-2 md:grid-cols-1 items-center p-2 md:p-4 rounded-lg bg-white hover:bg-gray-50"
  >
    <h1 class="font-medium text-2xl">Đơn món</h1>
    <h1 class="font-light text-lg text-gray-600">({{ orderDetails.length }} món đã chọn)</h1>
  </div>
</template>

<script setup>
import { useCartItemStore } from '@/stores/cartItemStore'
import { computed } from 'vue'

const cartItemStore = useCartItemStore()
const orderDetails = computed(() => {
  return cartItemStore.order.details
})
</script>
@/stores/cartStore
