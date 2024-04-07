<template>
  <div class="flex flex-col items-end">
    <div class="w-fit p-4 rounded-lg flex flex-col items-end float-end bg-white">
      <div class="grid grid-cols-2 gap-y-1 p-4">
        <p class="font-normal text-gray-500 text-lg text-start">TỔNG CÁC MÓN</p>
        <p class="font-medium text-lg text-end text-gray-600">
          {{ formatPrice(invoice.totalPrice / 1.1) }}
        </p>
        <p class="font-normal text-gray-500 text-lg text-start">THUẾ VAT (10%)</p>
        <p class="font-medium text-lg text-end text-gray-600">
          {{ formatPrice(invoice.totalPrice * (1 - 1 / 1.1)) }}
        </p>
        <p class="font-medium text-gray-800 text-lg text-start border-b">TỔNG CỘNG</p>
        <p class="font-bold text-lg text-end border-b text-gray-800">
          {{ formatPrice(invoice.totalPrice) }}
        </p>
        <p class="font-normal text-gray-500 text-lg text-start mt-3">KHÁCH HÀNG THANH TOÁN</p>
        <p class="font-medium text-lg text-end text-gray-600 mt-3">
          {{ formatPrice(invoice.customerPayment) }}
        </p>

        <p class="font-medium text-gray-800 text-lg text-start">TIỀN HOÀN LẠI</p>
        <p class="font-bold text-lg text-end">
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
