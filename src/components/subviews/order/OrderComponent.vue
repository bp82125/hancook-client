<template>
  <div class="overflow-x-auto p-6 rounded-lg shadow-lg bg-gray-50 mb-5">
    <OrderTitle></OrderTitle>
    <OrderDetailList></OrderDetailList>
  </div>
</template>

<script setup>
import OrderDetailList from './OrderDetailList.vue'
import OrderTitle from './OrderTitle.vue'
import { useOrderStore } from '@/stores/orderStore'

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tableId = ref(route.params.tableId)
const orderStore = useOrderStore()

onMounted(() => {
  orderStore.fetchOrder(tableId.value)
})
</script>
