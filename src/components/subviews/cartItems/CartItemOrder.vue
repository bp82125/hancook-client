<template>
  <div class="w-fit my-5 mx-3 flex flex-col items-end float-end gap-2">
    <p class="font-medium text-2xl text-end">Tổng cộng: {{ formatPrice(getTotal()) }}</p>
    <button
      @click="submitForm"
      class="w-full bg-gray-900 text-white inline-block py-2 px-4 hover:bg-slate-700 mt-3 rounded-lg"
      type="button"
    >
      Đặt món
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
const orderStore = useOrderStore()

const details = computed(() => {
  return orderStore.order.details
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

const getTotalPrice = (item) => {
  return item.dish.price * item.quantity
}

const getTotal = () => {
  if (details.value.length <= 0) {
    return 0
  } else {
    return details.value.reduce((acc, item) => acc + getTotalPrice(item), 0)
  }
}

const submitForm = () => {
  console.log(orderStore.order)
}
</script>
