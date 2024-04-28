<template>
  <ul v-for="(detail, index) in details" :key="detail.dish.id" class="list-none">
    <li
      class="grid grid-cols-2 gap-x-2 gap-y-3 items-center p-4 border rounded-lg shadow-lg my-5 text-sm"
    >
      <div class="col-span-2">
        <h1 class="font-semibold uppercase text-sm">#{{ index + 1 }}</h1>
      </div>

      <h1 class="text-sm text-start">{{ detail.dish.dishName }}</h1>
      <h1 class="text-end font-thin">{{ formatPrice(detail.unitPrice) }}</h1>
      <h1 class="text-start">
        Số lượng: <b>{{ detail.quantity }}</b>
      </h1>
      <h1 class="text-end text-base font-semibold">
        {{ formatPrice(detail.unitPrice * detail.quantity) }}
      </h1>
    </li>
  </ul>
</template>

<script setup>
import { useInvoiceDetailStore } from '@/stores/invoiceDetailStore'
import { computed } from 'vue'

const invoiceDetailStore = useInvoiceDetailStore()

const details = computed(() => {
  return invoiceDetailStore.details
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
</script>
