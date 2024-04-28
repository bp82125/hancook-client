<template>
  <div class="overflow-x-auto p-6 rounded-lg shadow-lg bg-gray-50 mb-5">
    <div class="mb-6 p-2 bg-white rounded-lg shadow-md">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <CartItemsTitle></CartItemsTitle>
        <CartItemsRemoveAll></CartItemsRemoveAll>
      </div>

      <div class="px-3 py-5 grid grid-cols-1 md:grid-cols-2 gap-2 gap-y-4">
        <CartItemsTable></CartItemsTable>
        <template v-if="width > 768">
          <CartItemAddDish></CartItemAddDish>
        </template>
      </div>
    </div>

    <div class="bg-white my-8">
      <template v-if="width > 768">
        <CartItemList></CartItemList>
      </template>
      <template v-else>
        <CartItemAddDish></CartItemAddDish>
        <CartItemListForMobile></CartItemListForMobile>
      </template>
    </div>

    <CartItemOrder></CartItemOrder>
  </div>
</template>

<script setup>
import CartItemsTitle from './CartItemsTitle.vue'
import CartItemsRemoveAll from './CartItemsRemoveAll.vue'
import CartItemList from './CartItemList.vue'
import CartItemListForMobile from './CartItemListForMobile.vue'
import CartItemOrder from './CartItemOrder.vue'
import CartItemsTable from './CartItemsTable.vue'
import CartItemAddDish from './CartItemAddDish.vue'

import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()
</script>
