<template>
  <div class="hidden md:flex justify-between items-center">
    <h1 class="text-2xl font-semibold">HÓA ĐƠN #{{ invoice.id }}</h1>
    <img src="/logo.png" class="w-[72px] h-[72px]" alt="Flowbite Logo" />
  </div>

  <div class="flex justify-center md:hidden mb-2">
    <img src="/logo.png" class="w-[36px] h-[36px]" alt="Flowbite Logo" />
  </div>
  <div class="flex flex-col gap-1 items-center md:items-end justify-end">
    <h1 class="text-sm md:text-xl font-semibold uppercase">Hancook Cần Thơ</h1>
    <h1 class="text-sm md:text-md font-normal text-center text-gray-700">
      Hẻm 290/27, Đ. Lê Bình, Hưng Lợi, Ninh Kiều, TP. Cần Thơ
    </h1>

    <h1 class="text-sm text-center md:text-sm font-normal mt-1 md:mt-2 text-gray-500">
      {{ formatDateTime(invoice.createdTime) }}
    </h1>
  </div>

  <div class="md:hidden my-10 line-clamp-2">
    <h1 class="text-sm text-center md:text-sm font-semibold text-gray-800">#{{ invoice.id }}</h1>
  </div>

  <div class="grid grid-cols-2 gap-1 line-clamp-1 mt-3">
    <h1 class="font-bold text-sm md:text-base text-gray-700 md:mb-3">LẬP BỞI</h1>
    <h1 class="font-bold text-end text-sm md:text-base text-gray-700 md:mb-3">LẬP TẠI</h1>
    <h1 class="font-normal text-sm md:text-base text-gray-500">{{ invoice.employee.name }}</h1>
    <h1 class="font-normal text-end text-sm md:text-base text-gray-500">
      {{ invoice.table.name }}
    </h1>
    <h1 class="font-normal text-sm md:text-base text-gray-500">
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
