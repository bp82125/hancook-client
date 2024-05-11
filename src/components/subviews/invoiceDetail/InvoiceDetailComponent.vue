<template>
  <div class="overflow-x-auto p-4 rounded-lg shadow-lg mx-2 md:mx-16 mb-4 bg-white">
    <InvoiceDetailButtonGroup @deleteInvoiceFromDetail="deleteInvoice"></InvoiceDetailButtonGroup>
    <template v-if="isAdmin">
      <InvoiceDeleteModal ref="deleteModal"></InvoiceDeleteModal>
    </template>
  </div>
  <div
    id="currentInvoice"
    class="overflow-x-auto p-6 md:p-16 rounded-lg shadow-lg mx-2 md:mx-16 my-4 bg-white"
  >
    <div v-if="invoice">
      <div class="p-2 mb-3">
        <InvoiceDetailHeader></InvoiceDetailHeader>
      </div>

      <template v-if="width > 768">
        <InvoiceDetailTable></InvoiceDetailTable>
      </template>
      <template v-else>
        <InvoiceDetailListForMobile></InvoiceDetailListForMobile>
      </template>
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
import InvoiceDetailListForMobile from './InvoiceDetailListForMobile.vue'
import InvoiceDeleteModal from '../invoice/InvoiceDeleteModal.vue'

import { computedAsync } from '@vueuse/core'
import { useUserStore } from '@/stores/userStore'
import { useWindowSize } from '@vueuse/core'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
})

const isAdmin = computedAsync(async () => {
  return await userStore.isAdmin()
}, true)

const { width, height } = useWindowSize()

const route = useRoute()
const invoiceId = ref(route.params.invoiceId)
const invoiceDetailStore = useInvoiceDetailStore()

const invoice = computed(() => {
  return invoiceDetailStore.invoice
})

onMounted(async () => {
  await invoiceDetailStore.fetchDetails(invoiceId.value)
})

const deleteModal = ref()

function deleteInvoice(invoice) {
  deleteModal.value.openModal(invoice)
}
</script>
