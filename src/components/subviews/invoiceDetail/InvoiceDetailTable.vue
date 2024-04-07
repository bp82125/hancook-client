<template>
  <table
    class="mt-5 table-auto border-collapse border-b w-full text-base rtl:text-right text-gray-500"
  >
    <thead class="text-xs font-normal text-gray-700 uppercase bg-gray-100">
      <th scope="col" class="px-6 py-3 text-start rounded-s-lg">Món ăn</th>
      <th scope="col" class="px-6 py-3 text-start">Giá</th>
      <th scope="col" class="px-6 py-3 text-start">Số lượng</th>
      <th scope="col" class="px-6 py-3 text-start rounded-e-lg">Tổng</th>
    </thead>
    <tbody>
      <tr v-for="detail in details" :key="detail.dish.id" class="bg-white">
        <th scope="row" class="px-6 py-4 text-start font-normal text-gray-900 whitespace-nowrap">
          <div>
            <h1 class="text-lg font-semibold">{{ detail.dish.dishName }}</h1>
            <h1 class="text-sm text-gray-500">{{ detail.dish.dishType.dishTypeName }}</h1>
          </div>
        </th>

        <th
          scope="row"
          class="px-6 py-4 text-start text-md font-normal text-gray-600 whitespace-nowrap"
        >
          {{ formatPrice(detail.unitPrice) }}
        </th>

        <th
          scope="row"
          class="px-6 py-4 text-md text-start font-bold text-gray-900 whitespace-nowrap"
        >
          {{ detail.quantity }}
        </th>

        <th
          scope="row"
          class="px-6 py-4 text-lg text-start font-semibold text-gray-900 whitespace-nowrap"
        >
          {{ formatPrice(detail.unitPrice * detail.quantity) }}
        </th>
      </tr>
    </tbody>
  </table>
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
