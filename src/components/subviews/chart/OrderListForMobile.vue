<template>
  <ul v-for="(order, index) in orders" :key="order.id" class="list-none">
    <li class="grid grid-cols-2 gap-2 gap-y-4 items-center p-4 border rounded-lg shadow-lg text-sm">
      <h1 class="font-semibold uppercase col-span-2 text-lg">#{{ index + 1 }}</h1>

      <h1 class="font-semibold uppercase">Mã đơn món</h1>
      <div class="line-clamp-1">
        <h1 class="text-end">{{ order.id }}</h1>
      </div>

      <h1 class="font-semibold uppercase">Người lập</h1>
      <div class="line-clamp-1">
        <h1 class="text-end">{{ order.employee.name }}</h1>
      </div>

      <h1 class="font-semibold uppercase">Bàn</h1>
      <div class="line-clamp-1">
        <h1 class="text-end">{{ order.table.name }}</h1>
      </div>

      <h1 class="font-semibold uppercase">Thời gian lập</h1>
      <div class="line-clamp-1">
        <h1 class="text-end">{{ formatDateTime(order.placedTime) }}</h1>
      </div>

      <div class="col-span-2">
        <button
          @click="showOrder(order.table)"
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
