<template>
  <div class="overflow-x-auto p-6 rounded-lg shadow-lg bg-gray-50 mb-5">
    <OrderTitle></OrderTitle>
    <template v-if="width > 768">
      <OrderDetailList></OrderDetailList>
    </template>

    <template v-else>
      <OrderDetailListForMobile></OrderDetailListForMobile>
    </template>

    <OrderPayment></OrderPayment>
  </div>
</template>

<script setup>
import OrderDetailList from './OrderDetailList.vue'
import OrderDetailListForMobile from './OrderDetailListForMobile.vue'
import OrderTitle from './OrderTitle.vue'
import OrderPayment from './OrderPayment.vue'
import { useOrderStore } from '@/stores/orderStore'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { initModals } from 'flowbite'

import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()

const route = useRoute()
const tableId = ref(route.params.tableId)
const orderStore = useOrderStore()

onMounted(() => {
  orderStore.fetchOrder(tableId.value)
  initModals()
})
</script>
