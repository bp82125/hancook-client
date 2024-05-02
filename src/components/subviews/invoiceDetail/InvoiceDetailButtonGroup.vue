<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useInvoiceDetailStore } from '@/stores/invoiceDetailStore'
import html2canvas from 'html2canvas'

const invoiceDetailStore = useInvoiceDetailStore()

const invoice = computed(() => {
  return invoiceDetailStore.invoice
})

const route = useRoute()
const invoiceId = ref(route.params.invoiceId)

const downloadInvoice = async () => {
  const invoiceElement = document.getElementById('currentInvoice')
  if (!invoiceElement) return

  try {
    const scale = 5 // Set scale factor here
    const canvas = await html2canvas(invoiceElement, { scale: scale })
    const imageData = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = imageData
    a.download = `invoice_${invoiceId.value}.png`
    a.click()
  } catch (error) {
    console.error('Error generating invoice:', error)
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:flex md:justify-end gap-2">
    <button
      @click="downloadInvoice"
      class="inline-flex items-center justify-center gap-x-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
    >
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
          d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
        /></svg
      >Tải xuống
    </button>
    <button
      @click="$emit('deleteInvoiceFromDetail', invoice)"
      class="inline-flex items-center justify-center gap-x-2 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
    >
      <svg
        class="w-[18px] h-[18px]text-white"
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
          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
        />
      </svg>
      Xóa hóa đơn
    </button>
  </div>
</template>
