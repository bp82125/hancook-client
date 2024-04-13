<template>
  <div class="w-full col-span-2 bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
      <div class="flex justify-center items-center">
        <h1 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1 uppercase">
          Thống kê số lượng bán ra
        </h1>
      </div>
    </div>

    <div
      class="grid grid-cols-1 gap-y-0 md:grid-cols-2 md:gap-y-4 gap-4 mt-5"
      v-for="dish in dishCounts"
      :key="dish.id"
    >
      <h2>{{ dish.name }}</h2>
      <fwb-progress
        :progress="calculateProgress(dish)"
        label-position="outside"
        label-progress
        size="lg"
      />
    </div>

    <div class="mt-8 flex justify-end">
      <dl>
        <dt class="text-center font-normal text-gray-500 dark:text-gray-400 pb-1">
          Trên tổng số hóa đơn
        </dt>
        <dd class="leading-none text-end text-xl font-bold text-gray-800">
          {{ numberOfInvoices }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { FwbProgress } from 'flowbite-vue'
import { useChartStore } from '@/stores/chartStore'
import { onMounted, ref } from 'vue'

const chartStore = useChartStore()

const dishCounts = ref()
const numberOfInvoices = ref()

onMounted(async () => {
  await chartStore.fetchDishCounts()
  dishCounts.value = chartStore.dishCounts.dishes
  numberOfInvoices.value = chartStore.dishCounts.numberOfInvoices
})

const calculateProgress = (dish) => {
  return Math.floor((dish.count / numberOfInvoices.value) * 100)
}
</script>
