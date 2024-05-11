<template>
  <div class="p-d md:p-8 rounded-lg shadow-lg bg-white m-2">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 items-center md:mb-3 p-4 pb-0 md:p-0">
      <InvoiceSearch></InvoiceSearch>
      <InvoiceSort></InvoiceSort>
    </div>
    <template v-if="width > 768">
      <InvoiceList @deleteInvoice="deleteInvoice"></InvoiceList>
    </template>
    <template v-else>
      <div>
        <InvoiceListForMobile @deleteInvoice="deleteInvoice"></InvoiceListForMobile>
      </div>
    </template>
    <InvoiceDeleteModal ref="deleteModal"></InvoiceDeleteModal>
  </div>
</template>

<script setup>
import InvoiceList from './InvoiceList.vue'
import InvoiceListForMobile from './InvoiceListForMobile.vue'
import InvoiceSearch from './InvoiceSearch.vue'
import InvoiceDeleteModal from './InvoiceDeleteModal.vue'
import InvoiceSort from './InvoiceSort.vue'

import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'

const width = useWindowSize().width

const deleteModal = ref()

function deleteInvoice(invoice) {
  deleteModal.value.openModal(invoice)
}
</script>
