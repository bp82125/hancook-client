<template>
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-semibold">HÓA ĐƠN #{{ invoice.id }}</h1>
    <img src="/logo.png" class="w-[72px] h-[72px]" alt="Flowbite Logo" />
  </div>
  <div class="flex flex-col items-end justify-end">
    <h1 class="text-xl font-semibold">Hancook Cần Thơ</h1>
    <h1 class="text-md font-normal text-gray-700">
      Hẻm 290/27, Đ. Lê Bình, Hưng Lợi, Ninh Kiều, TP. Cần Thơ
    </h1>
    <h1 class="text-sm font-normal mt-2 text-gray-500">
      {{ formatDateTime(invoice.createdTime) }}
    </h1>
  </div>
  <div class="flex flex-col format">
    <h1 class="font-bold text-md text-gray-700 mb-3">LẬP BỞI</h1>
    <h1 class="font-normal text-md text-gray-500">{{ invoice.employee.name }}</h1>
    <h1 class="font-normal text-md text-gray-500">
      {{ invoice.employee.position.positionName }}
    </h1>
  </div>
</template>

<script setup>
import { useInvoiceDetailStore } from '@/stores/invoiceDetailStore'
import { computed } from 'vue'

const invoiceDetailStore = useInvoiceDetailStore()
const invoice = computed(() => {
  return invoiceDetailStore.invoice
})

const formatDateTime = (dateTime) => {
  const [datePart, timePart] = dateTime.split('T')
  const [year, month, day] = datePart.split('-')
  const [hour, minute, second] = timePart.split(':')
  const formattedDateTime = `lúc ${parseInt(hour)} giờ ${parseInt(minute)} phút ngày ${parseInt(day)} tháng ${parseInt(month)}, ${year}`
  return formattedDateTime
}
</script>
