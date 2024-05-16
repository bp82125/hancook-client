<template>
  <table
    class="table-auto border-collapse w-full text-base rtl:text-right text-gray-500 dark:text-gray-400"
  >
    <thead class="text-sm font-normal text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="text-center rounded-s-lg">Số thứ tự</th>
        <th scope="col" class="px-6 py-5 text-center">Người lập</th>
        <th scope="col" class="px-6 py-5 text-center \">Bàn</th>
        <th scope="col" class="px-6 py-5 text-center">Tổng tiền</th>
        <th scope="col" class="py-5 text-center rounded-e-lg">Thời gian lập</th>
        <th scope="col" class="px-6 py-5"></th>
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

        <td class="px-6 py-4 text-center">
          {{ invoice.employee.name }}
        </td>
        <td class="px-6 py-4 text-center">
          {{ invoice.table.name }}
        </td>
        <td class="px-6 py-4 text-center">
          {{ formatAmount(invoice.totalPrice) }}
        </td>
        <td class="px-6 py-4 text-center">
          {{ formatDateTime(invoice.createdTime) }}
        </td>

        <!-- Edit button column -->
        <td class="px-6 py-3 text-center">
          <div class="grid gap-2" :class="isAdmin ? 'grid-cols-2' : 'grid-cols-1'">
            <button
              @click="showDetail(invoice)"
              class="flex justify-center text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center"
            >
              <svg
                class="w-[18px] h-[18px] text-white"
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
                  d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <template v-if="isAdmin">
              <button
                @click="$emit('deleteInvoice', invoice)"
                class="flex justify-center text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center"
              >
                <svg
                  class="w-[18px] h-[18px]"
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
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </button>
            </template>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useInvoiceStore } from '@/stores/invoiceStore'
import { format } from 'date-fns'
import { computedAsync } from '@vueuse/core'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
})

const isAdmin = computedAsync(async () => {
  return await userStore.isAdmin()
}, true)

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
  const parsedDateTime = new Date(dateTime)
  return format(parsedDateTime, 'dd/MM/yyyy - HH:mm')
}

const router = useRouter()
const showDetail = async (invoice) => {
  router.push({ name: 'invoiceDetail', params: { invoiceId: invoice.id } })
}
</script>
