<template>
  <ul v-for="(table, index) in tables" :key="table.id" class="list-none">
    <li
      class="grid grid-cols-2 gap-y-4 items-center p-4 border rounded-lg shadow-lg my-5 text-ellipsis"
    >
      <h1 class="font-semibold text-lg uppercase">#{{ index + 1 }}</h1>
      <div class="flex justify-end items-center">
        <button
          v-if="isAdmin"
          @click="$emit('updateTable', table)"
          class="text-gray-400 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2 text-center"
        >
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
            />
          </svg>
        </button>
        <button
          v-if="isAdmin"
          @click="$emit('deleteTable', table)"
          class="text-gray-400 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2 text-center"
        >
          <svg
            class="w-6 h-6"
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

      <h1 class="font-semibold uppercase">Tên bàn</h1>
      <h1 class="text-end">{{ table.name }}</h1>

      <h1 class="font-semibold uppercase">Trạng thái bàn</h1>
      <div v-if="table.state == 'available'" class="flex justify-end">
        <h1 class="text-green-500">Còn trống</h1>
      </div>

      <div v-else class="flex justify-end">
        <h1 class="text-red-500">Đã có khách</h1>
      </div>

      <h1 class="font-semibold uppercase">Đơn món</h1>
      <div class="flex justify-end">
        <button
          :disabled="table.state === 'available'"
          @click="showOrder(table)"
          class="text-white w-full truncate bg-gray-800 hover:bg-gray-600 focus:ring-4 disabled:bg-gray-300 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <h1 class="">Xem chi tiết</h1>
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTableStore } from '@/stores/tableStore'
import { useRouter } from 'vue-router'

const tableStore = useTableStore()
const router = useRouter()

onMounted(async () => {
  await tableStore.fetchTable()
})

const tables = computed(() => {
  return tableStore.tables
})

const showOrder = async (table) => {
  router.push({ name: 'order', params: { tableId: table.id } })
}

defineOptions({
  inheritAttrs: false
})

import { computedAsync } from '@vueuse/core'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
})

const isAdmin = computedAsync(async () => {
  return await userStore.isAdmin()
}, true)
</script>
