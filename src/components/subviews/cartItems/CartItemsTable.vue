<template>
  <div class="z-50">
    <model-list-select
      :list="sortedTables"
      v-model="cartItemStore.order.tableId"
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
import { useCartItemStore } from '@/stores/cartItemStore'

onMounted(() => {
  tableStore.fetchTable()
})

onUnmounted(() => {
  cartItemStore.order.tableId = null
})

const tableStore = useTableStore()
const cartItemStore = useCartItemStore()

const tables = computed(() => {
  return tableStore.tables
})

const sortedTables = computed(() => {
  const filteredTables = tables.value.filter((table) => {
    return table.state === 'available'
  })

  // Sort the filtered tables by name
  return [...filteredTables].sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
})
</script>
@/stores/cartStore
