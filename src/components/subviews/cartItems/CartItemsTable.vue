<template>
  <div class="z-10">
    <vue-select
      class="style-table"
      label="name"
      :options="sortedTables"
      placeholder="Chọn bàn..."
      v-model="cartItemStore.order.table"
    ></vue-select>
  </div>
</template>

<script setup>
import { onMounted, computed, onUnmounted } from 'vue'
import { useTableStore } from '@/stores/tableStore'
import { useCartItemStore } from '@/stores/cartItemStore'
import VueSelect from 'vue-select'

onMounted(() => {
  tableStore.fetchTable()
})

onUnmounted(() => {
  cartItemStore.order.table = ''
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
    // Extract numeric part from table names
    const numA = parseInt(a.name.match(/\d+/)[0])
    const numB = parseInt(b.name.match(/\d+/)[0])

    // Compare the numeric parts
    if (numA === numB) {
      // If numeric parts are equal, compare the whole string
      return a.name.localeCompare(b.name)
    } else {
      return numA - numB
    }
  })
})
</script>

<style>
.style-table .vs__search::placeholder,
.style-table .vs__dropdown-toggle,
.style-table .vs__dropdown-menu {
  @apply p-1.5 font-light;
}

.style-table .vs__dropdown-menu {
  @apply h-48 overflow-y-scroll;
}

.style-table .vs__dropdown-option {
  @apply py-2;
}

.style-table .vs__clear,
.style-table .vs__open-indicator {
  fill: #394066;
}
</style>

@/stores/cartStore
