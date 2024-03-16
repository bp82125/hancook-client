<template>
  <div class="bg-slate-50 rounded-lg p-8 mb-5">
    <div class="flex items-center justify-between mb-3">
      <h1 class="font-medium text-2xl">{{ dishType.dishTypeName }}</h1>
      <div class="flex gap-x-2">
        <button @click="modalStore.toggleUpdateDishType(props.dishType)">
          <svg
            class="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
            />
          </svg>
        </button>

        <button @click="modalStore.toggleDeleteDishType(props.dishType)">
          <svg
            class="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 18 6m0 12L6 6"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-6">
      <DishCard :dish="dish" v-for="dish in dishes" :key="dish.id"></DishCard>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import DishCard from './DishCard.vue'
import { useDishStore } from '@/stores/dishStore'
import { useModalStore } from '@/stores/modalStore'

const props = defineProps(['dishType'])

const dishStore = useDishStore()
const modalStore = useModalStore()

onMounted(() => {
  dishStore.fetchDishes()
})

const dishes = computed(() => {
  return dishStore.dishes.filter((dish) => {
    return dish.dishType.id === props.dishType.id
  })
})
</script>
