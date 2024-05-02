<template>
  <div class="flex flex-col items-end">
    <div
      class="w-full md:w-fit my-4 p-4 md:p-8 rounded-lg border flex flex-col items-end float-end bg-white shadow-lg"
    >
      <div class="grid grid-cols-2 gap-x-16 gap-y-1">
        <p class="font-medium text-gray-500 text-md text-start">Tổng giá</p>
        <p class="font-medium text-md text-end">{{ formatPrice(getTotal()) }}</p>
        <p class="font-medium text-gray-500 text-md text-start">Thuế VAT (10%)</p>
        <p class="font-medium text-md text-end">{{ formatPrice(getTotal() * 0.1) }}</p>
        <p class="font-medium text-gray-500 text-lg text-start mt-3">Tổng cộng</p>
        <p class="font-medium text-lg text-end mt-3">{{ formatPrice(getTotal() * 1.1) }}</p>
      </div>

      <OrderBilling></OrderBilling>
      <OrderCancel></OrderCancel>
    </div>
    <div>
      <p class="font-semibold text-red-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import OrderCancel from './OrderCancel.vue'
import OrderBilling from './OrderBilling.vue'

const orderStore = useOrderStore()
const errorMessage = ref('')

onUnmounted(() => {
  errorMessage.value = ''
})

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
</script>
@/stores/cartStore
