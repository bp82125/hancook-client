<template>
  <div class="overflow-x-auto p-8 rounded-lg shadow-lg bg-white my-5">
    <div class="flex justify-between mb-8">
      <ExpenseSearchBar></ExpenseSearchBar>
    </div>
    <div>
      <ExpenseList></ExpenseList>
    </div>
  </div>
</template>

<script setup>
import ExpenseSearchBar from './ExpenseSearchBar.vue'
import ExpenseList from './ExpenseList.vue'
</script>
