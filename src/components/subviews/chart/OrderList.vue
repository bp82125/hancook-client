<template>
  <table
    class="table-auto border-collapse w-full text-base rtl:text-right text-gray-500 dark:text-gray-400"
  >
    <thead
      class="text-sm font-normal text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-50"
    >
      <tr>
        <th scope="col" class="text-center rounded-s-lg">Số thứ tự</th>
        <th scope="col" class="px-6 py-5 text-center">Người lập</th>
        <th scope="col" class="px-6 py-5 text-center \">Bàn</th>
        <th scope="col" class="py-5 text-center rounded-e-lg">Thời gian lập</th>
        <th scope="col" class="py-5"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(order, index) in orders"
        :key="order.id"
        class="border-y bg-white hover:bg-gray-50 dark:bg-gray-800"
      >
        <td class="text-gray-900 whitespace-nowrap dark:text-white text-center">
          {{ index + 1 }}
        </td>

        <td class="px-6 py-4 text-center">
          {{ order.employee.name }}
        </td>
        <td class="px-6 py-4 text-center">
          {{ order.table.name }}
        </td>
        <td class="px-6 py-4 text-center">
          {{ formatDateTime(order.placedTime) }}
        </td>

        <!-- Edit button column -->
        <td class="py-3 text-center">
          <div class="flex justify-center items-center">
            <button
              @click="showOrder(order.table)"
              class="flex justify-center text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center"
            >
              Xem chi tiết
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderListStore } from '@/stores/orderListStore'
import { format } from 'date-fns'

const orderListStore = useOrderListStore()

onMounted(async () => {
  await orderListStore.fetchOrders()
})

const orders = computed(() => {
  return orderListStore.orderList
})

const formatDateTime = (dateTime) => {
  const parsedDateTime = new Date(dateTime)
  return format(parsedDateTime, 'dd/MM/yyyy - HH:mm')
}

const router = useRouter()
const showOrder = async (table) => {
  router.push({ name: 'order', params: { tableId: table.id } })
}
</script>
