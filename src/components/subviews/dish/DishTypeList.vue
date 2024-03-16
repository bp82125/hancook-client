<template>
  <div v-for="dishType in dishTypes" :key="dishType.id">
    <DishGrids :dishType="dishType"></DishGrids>
  </div>
</template>

<script setup>
import { useDishTypeStore } from '@/stores/dishTypeStore'
import { computed, onMounted } from 'vue'
import DishGrids from './DishGrids.vue'

const dishTypeStore = useDishTypeStore()

onMounted(() => {
  dishTypeStore.fetchDishTypes()
})

const dishTypes = computed(() => {
  return dishTypeStore.dishTypes
})
</script>
