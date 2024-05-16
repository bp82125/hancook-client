<template>
  <ul v-for="(invoice, index) in invoices" :key="invoice.id" class="list-none p-3">
    <li class="grid grid-cols-2 gap-2 gap-y-4 items-center p-4 border rounded-lg shadow-lg text-sm">
      <h1 class="font-semibold uppercase text-lg">#{{ index + 1 }}</h1>
      <div class="flex justify-end items-center">
        <button
          @click="$emit('deleteInvoice', invoice)"
          class="text-gray-400 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-1 text-center"
        >
          <svg
            class="w-6 h-6 dark:text-white"
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
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>
      </div>

      <h1 class="font-semibold uppercase">Mã hoá đơn</h1>
      <div class="line-clamp-1">
        <h1 class="text-end">{{ invoice.id }}</h1>
      </div>

      <h1 class="font-semibold uppercase">Người lập</h1>
      <div class="line-clamp-1">
        <h1 class="text-end">{{ invoice.employee.name }}</h1>
      </div>

      <h1 class="font-semibold uppercase">Bàn</h1>
      <div class="line-clamp-1">
        <h1 class="text-end">{{ invoice.table.name }}</h1>
      </div>

      <h1 class="font-semibold uppercase">Tổng tiền</h1>
      <div class="line-clamp-1">
        <h1 class="text-end">{{ formatAmount(invoice.totalPrice) }}</h1>
      </div>

      <h1 class="font-semibold uppercase">Thời gian lập</h1>
      <div class="line-clamp-1">
        <h1 class="text-end">{{ formatDateTime(invoice.createdTime) }}</h1>
      </div>

      <div class="col-span-2">
        <button
          @click="showDetail(invoice)"
          class="text-white w-full bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
        >
          Xem chi tiết
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useInvoiceStore } from '@/stores/invoiceStore'

import { format } from 'date-fns'

const invoiceStore = useInvoiceStore()

onMounted(async () => {
  await invoiceStore.fetchInvoices()
})

const invoices = computed(() => {
  return invoiceStore.invoices
})

const formatAmount = (amount) => {
  // Convert amount to VND format
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const formatDateTime = (dateTime) => {
  // Parse the dateTime string
  const parsedDateTime = new Date(dateTime)

  // Format the parsed dateTime
  return format(parsedDateTime, 'dd/MM/yyyy - HH:mm')
}

const router = useRouter()
const showDetail = async (invoice) => {
  router.push({ name: 'invoiceDetail', params: { invoiceId: invoice.id } })
}
</script>
