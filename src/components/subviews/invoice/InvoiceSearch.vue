<template>
  <div class="flex flex-row gap-2 justify-center items-center">
    <fwb-input
      v-model="query"
      @input="search"
      placeholder="Nhập mã hóa đơn cần tìm..."
      size="md"
      class="grow shrink truncate"
    >
      <template #prefix>
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </template>
    </fwb-input>

    <template v-if="width > 768">
      <fwb-button size="sm" color="dark" @click="reset">
        <h1 class="p-1">Đặt lại</h1>
      </fwb-button>
    </template>

    <template v-else>
      <fwb-button size="sm" color="dark" @click="reset">
        <div class="p-1">
          <svg
            class="w-[18px] h-[18px] text-white dark:text-white"
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
              d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
            />
          </svg>
        </div>
      </fwb-button>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FwbButton, FwbInput } from 'flowbite-vue'
import { useInvoiceStore } from '@/stores/invoiceStore'

import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()

const invoiceStore = useInvoiceStore()

const query = ref('')

let timeout

const search = async () => {
  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(async () => {
    await invoiceStore.searchInvoice(query.value)
  }, 300)
}

const reset = () => {
  query.value = ''
  invoiceStore.fetchInvoices()
}
</script>
