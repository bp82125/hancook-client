<template>
  <div class="overflow-x-auto p-6 rounded-lg shadow-lg bg-gray-50 mb-5">
    <div class="mb-6 p-2 bg-white rounded-lg shadow-md">
      <div class="grid grid-cols-2 gap-3">
        <CartItemsTitle></CartItemsTitle>
        <CartItemsRemoveAll></CartItemsRemoveAll>
      </div>

      <div class="px-3 py-5">
        <CartItemsTable></CartItemsTable>
      </div>
    </div>
    <div class=""></div>
    <CartItemList></CartItemList>
    <CartItemOrder></CartItemOrder>
  </div>
</template>

<script setup>
import CartItemsTitle from './CartItemsTitle.vue'
import CartItemsRemoveAll from './CartItemsRemoveAll.vue'
import CartItemList from './CartItemList.vue'
import CartItemOrder from './CartItemOrder.vue'
import CartItemsTable from './CartItemsTable.vue'
</script>
