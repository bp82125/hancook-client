<template>
  <div class="overflow-x-auto p-6 rounded-lg shadow-lg bg-gray-50 mb-5">
    <OrderTitle></OrderTitle>
    <OrderDetailList></OrderDetailList>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import OrderDetailList from './OrderDetailList.vue'
import OrderTitle from './OrderTitle.vue'
</script>
