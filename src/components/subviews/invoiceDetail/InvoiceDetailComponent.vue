<template>
  <div class="overflow-x-auto p-16 rounded-lg shadow-lg mx-16 my-4 bg-white">
    <div v-if="invoice">

      <InvoiceDetailHeader></InvoiceDetailHeader>
      <InvoiceDetailTable></InvoiceDetailTable>
      <InvoiceDetailPayment></InvoiceDetailPayment>
    </div>

    <div v-else class="text-center mt-8">Loading...</div>
  </div>
</template>

<script setup>
import { useInvoiceDetailStore } from '@/stores/invoiceDetailStore'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

import InvoiceDetailHeader from './InvoiceDetailHeader.vue'
import InvoiceDetailButtonGroup from './InvoiceDetailButtonGroup.vue'
import InvoiceDetailTable from './InvoiceDetailTable.vue'
import InvoiceDetailPayment from './InvoiceDetailPayment.vue'

const route = useRoute()
const invoiceId = ref(route.params.invoiceId)
const invoiceDetailStore = useInvoiceDetailStore()

const invoice = computed(() => {
  return invoiceDetailStore.invoice
})

onMounted(() => {
  invoiceDetailStore.fetchDetails(invoiceId.value)
})
</script>
