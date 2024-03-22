<template>
  <div class="z-50">
    <model-list-select
      :list="sortedTables"
      v-model="orderStore.order.tableId"
      option-value="id"
      option-text="name"
      placeholder="Chọn bàn"
    >
    </model-list-select>
  </div>
</template>

<script setup>
import { ModelListSelect } from 'vue-search-select'
import { onMounted, computed, onUnmounted } from 'vue'
import { useTableStore } from '@/stores/tableStore'
import { useOrderStore } from '@/stores/orderStore'

onMounted(() => {
  tableStore.fetchTable()
})

onUnmounted(() => {
  orderStore.order.tableId = null
})

const tableStore = useTableStore()
const orderStore = useOrderStore()

const tables = computed(() => {
  return tableStore.tables
})

const sortedTables = computed(() => {
  return [...tables.value].sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
})
</script>
