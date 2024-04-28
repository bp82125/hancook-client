<template>
  <div class="flex flex-col items-end">
    <div class="w-full md:w-fit p-2 md:p-4 rounded-lg flex flex-col items-end float-end bg-white">
      <div class="w-full md:w-fit grid grid-cols-2 gap-y-1 md:p-4">
        <p class="font-normal text-gray-500 text-start">TỔNG CÁC MÓN</p>
        <p class="font-medium text-end text-gray-600">
          {{ formatPrice(invoice.totalPrice / 1.1) }}
        </p>
        <p class="font-normal text-gray-500 text-start">THUẾ VAT (10%)</p>
        <p class="font-medium text-end text-gray-600">
          {{ formatPrice(invoice.totalPrice * (1 - 1 / 1.1)) }}
        </p>
        <p class="font-medium text-gray-800 text-start border-b">TỔNG CỘNG</p>
        <p class="font-bold text-end border-b text-gray-800">
          {{ formatPrice(invoice.totalPrice) }}
        </p>
        <p class="font-normal text-gray-500 text-start mt-3">KHÁCH HÀNG THANH TOÁN</p>
        <p class="font-medium text-end text-gray-600 mt-3">
          {{ formatPrice(invoice.customerPayment) }}
        </p>

        <p class="font-medium text-gray-800 text-start">TIỀN HOÀN LẠI</p>
        <p class="font-bold text-end">
          {{ formatPrice(invoice.customerPayment - invoice.totalPrice) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useInvoiceDetailStore } from '@/stores/invoiceDetailStore'
import { computed } from 'vue'

const invoiceDetailStore = useInvoiceDetailStore()
const invoice = computed(() => {
  return invoiceDetailStore.invoice
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
</script>
