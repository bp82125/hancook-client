<template>
  <table
    class="table-auto border-collapse w-full text-base rtl:text-right text-gray-500 dark:text-gray-400"
  >
    <thead class="text-sm font-normal text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="text-center rounded-s-lg">Số thứ tự</th>
        <th scope="col" class="px-6 py-5 text-center rounded-e-lg">Mã hóa đơn</th>
        <th scope="col" class="pe-6 py-5 text-center">Nhân viên lập</th>
        <th scope="col" class="px-6 py-5 text-center rounded-e-lg">Bàn</th>
        <th scope="col" class="pe-6 py-5 text-center">Tổng tiền</th>
        <th scope="col" class="py-5 text-center rounded-e-lg">Thời gian lập</th>
        <th scope="col" class="py-5"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(invoice, index) in invoices"
        :key="invoice.id"
        class="border-y bg-white dark:bg-gray-800"
      >
        <td class="text-gray-900 whitespace-nowrap dark:text-white text-center">
          {{ index + 1 }}
        </td>
        <th
          scope="row"
          class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white"
        >
          {{ invoice.id }}
        </th>
        <td class="pe-6 py-4 text-center">
          {{ invoice.employee.name }}
        </td>
        <td class="px-6 py-4 text-center">
          {{ invoice.table.name }}
        </td>
        <td class="pe-6 py-4 text-center">
          {{ formatAmount(invoice.totalPrice) }}
        </td>
        <td class="px-6 py-4 text-center">
          {{ formatDateTime(invoice.createdTime) }}
        </td>

        <!-- Edit button column -->
        <td class="py-3 text-center">
          <button
            @click="$emit('deletePosition', position)"
            class="text-white mx-1 bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
          >
            Xem chi tiết
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useInvoiceStore } from '@/stores/invoiceStore'
import { initFlowbite } from 'flowbite'
import { format } from 'date-fns'

const invoiceStore = useInvoiceStore()

onMounted(() => {
  invoiceStore.fetchInvoices()
  initFlowbite()
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
</script>
