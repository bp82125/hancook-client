<template>
  <div
    class="flex flex-col w-full col-span-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 p-4 md:p-6"
  >
    <div class="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
      <div class="flex justify-between items-center gap-x-2">
        <h1 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1 uppercase">
          Thống kê số lượng bán ra
        </h1>
      </div>
      <chart-time-range-select-for-dish
        @time-selected-dish="changeTimeRange"
      ></chart-time-range-select-for-dish>
    </div>
    <div class="grow">
      <template v-if="numberOfInvoices > 0">
        <ul class="">
          <li
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
          </li>
        </ul>
      </template>

      <template v-else>
        <div class="p-8 flex justify-center items-center">
          <h1 class="italic">
            Chưa có hóa đơn nào đã lập trong khoảng thời gian đã chọn để thống kê
          </h1>
        </div>
      </template>
    </div>

    <div
      class="p-2 flex justify-end border-gray-200 border-t"
      :class="numberOfInvoices && numberOfInvoices > 0 ? 'mt-8' : ''"
    >
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
import ChartTimeRangeSelectForDish from './ChartTimeRangeSelectForDish.vue'
import { computed } from 'vue'

const chartStore = useChartStore()

const dishCounts = computed(() => {
  return chartStore.dishCounts?.dishes
})
const numberOfInvoices = computed(() => {
  return chartStore.dishCounts?.numberOfInvoices
})

onMounted(async () => {
  await chartStore.fetchDishCounts()
})

const calculateProgress = (dish) => {
  return Math.floor((dish.count / numberOfInvoices.value) * 100)
}

const changeTimeRange = async (time) => {
  console.log(time)
  await chartStore.fetchDishCounts(time)
}
</script>
