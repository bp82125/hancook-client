<template>
  <div class="p-8 rounded-lg shadow-lg bg-white m-2">
    <div class="grid grid-cols-1 md:grid-cols-2 mb-5">
      <InvoiceSearch></InvoiceSearch>
    </div>
    <template v-if="width > 768">
      <InvoiceList></InvoiceList>
    </template>
    <template v-else>
      <InvoiceListForMobile></InvoiceListForMobile>
    </template>
  </div>
</template>

<script setup>
import InvoiceList from './InvoiceList.vue'
import InvoiceListForMobile from './InvoiceListForMobile.vue'
import InvoiceSearch from './InvoiceSearch.vue'

import { useWindowSize } from '@vueuse/core'
const width = useWindowSize().width
</script>
