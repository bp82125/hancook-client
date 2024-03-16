<template>
  <div class="overflow-x-auto p-6 rounded-lg shadow-lg bg-gray-50 mb-5">
    <div class="grid grid-cols-2 gap-3 mb-6 p-2 bg-white rounded-lg shadow-md">
      <CartItemsTitle></CartItemsTitle>
      <CartItemsRemoveAll></CartItemsRemoveAll>
    </div>
    <div class="grid grid-cols-2 gap-3 my-3">
      <CartItemsCustomer> </CartItemsCustomer>
      <CartItemsTable></CartItemsTable>
    </div>
    <CartItemList></CartItemList>
    <CartItemOrder></CartItemOrder>
  </div>
</template>

<script setup>
import CartItemsTitle from './CartItemsTitle.vue'
import CartItemsRemoveAll from './CartItemsRemoveAll.vue'
import CartItemList from './CartItemList.vue'
import CartItemsTable from './CartItemsTable.vue'
import CartItemsCustomer from './CartItemsCustomer.vue'
import CartItemOrder from './CartItemOrder.vue'
</script>
