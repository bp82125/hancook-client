<template>
  <div class="overflow-x-auto p-4 md:p-8 rounded-lg shadow-lg bg-gray-50 m-2">
    <ChartRevenue></ChartRevenue>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      <ChartEmployee></ChartEmployee>
      <ChartDish></ChartDish>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-5 mt-5">
      <ChartTable></ChartTable>
      <ChartTopDish></ChartTopDish>
    </div>
    <div class="bg-white shadow-lg p-4 md:p-8 rounded-lg mt-5 flex flex-col gap-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 items-center pt-3">
        <OrderTitle></OrderTitle>
        <OrderSort></OrderSort>
      </div>
      <template v-if="width > 768">
        <OrderList></OrderList>
      </template>

      <template v-else>
        <OrderListForMobile></OrderListForMobile>
      </template>
    </div>
  </div>
</template>

<script setup>
import ChartRevenue from './ChartRevenue.vue'
import ChartDish from './ChartDish.vue'
import ChartTable from './ChartTable.vue'
import ChartEmployee from './ChartEmployee.vue'
import ChartTopDish from './ChartTopDish.vue'
import OrderList from './OrderList.vue'
import OrderTitle from './OrderTitle.vue'
import OrderSort from './OrderSort.vue'
import OrderListForMobile from './OrderListForMobile.vue'

import { useWindowSize } from '@vueuse/core'
const width = useWindowSize().width
</script>
