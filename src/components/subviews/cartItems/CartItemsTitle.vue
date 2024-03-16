<template>
  <div class="flex gap-2 items-end p-4 rounded-lg bg-white hover:bg-gray-50">
    <h1 class="font-medium text-2xl">Đơn món</h1>
    <h1 class="font-light text-lg text-gray-600">({{ orderDetails.length }} món đã chọn)</h1>
  </div>
</template>

<script setup>
import { useOrderStore } from '@/stores/orderStore'
import { computed } from 'vue'

const orderStore = useOrderStore()
const orderDetails = computed(() => {
  return orderStore.order.details
})
</script>
