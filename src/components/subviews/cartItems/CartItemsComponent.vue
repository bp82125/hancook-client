<template>
  <div class="overflow-x-auto m-2 p-3 md:p-6 rounded-lg shadow-lg bg-gray-50 mb-5">
    <div class="mb-6 p-2 bg-white rounded-lg shadow-md">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4">
        <CartItemsTitle></CartItemsTitle>
        <template v-if="width > 768">
          <CartItemsRemoveAll></CartItemsRemoveAll>
        </template>
      </div>

      <div class="px-2 py-5 grid grid-cols-1 md:grid-cols-2 gap-2 gap-y-4">
        <CartItemsTable></CartItemsTable>
        <template v-if="width > 768">
          <CartItemAddDish></CartItemAddDish>
        </template>
      </div>
    </div>

    <div class="bg-white my-4 md:my-8">
      <template v-if="width > 768">
        <CartItemList></CartItemList>
      </template>
      <template v-else>
        <div>
          <CartItemAddDish></CartItemAddDish>
          <CartItemsRemoveAll></CartItemsRemoveAll>
          <CartItemListForMobile></CartItemListForMobile>
        </div>
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
