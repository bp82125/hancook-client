<template>
  <div class="overflow-x-auto p-8 rounded-lg shadow-lg bg-gray-50 m-2">
    <ChartRevenue></ChartRevenue>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      <ChartDish></ChartDish>
      <ChartEmployee></ChartEmployee>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-5 mt-5">
      <ChartTable></ChartTable>
      <ChartTopDish></ChartTopDish>
    </div>
  </div>
</template>

<script setup>
import ChartRevenue from './ChartRevenue.vue'
import ChartDish from './ChartDish.vue'
import ChartTable from './ChartTable.vue'
import ChartEmployee from './ChartEmployee.vue'
import ChartTopDish from './ChartTopDish.vue'
</script>
