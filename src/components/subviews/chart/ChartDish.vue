<template>
  <div class="w-full bg-white rounded-lg shadow-lg dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-between mb-3">
      <div class="flex justify-center items-center">
        <h1 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1 uppercase">
          Thống kê món ăn
        </h1>
      </div>
      
    </div>

    <div class="bg-gray-50 p-3 rounded-lg">
      <div class="grid grid-cols-2 gap-3 mb-2">
        <dl
          v-for="(dishType, index) in dishTypes"
          :key="dishType.id"
          :class="[
            'bg-' +
              getColor(index) +
              '-50 rounded-lg flex flex-col items-center justify-center h-[64px]'
          ]"
        >
          <dt
            :class="[
              'w-8 h-8 rounded-full bg-' +
                getColor(index) +
                '-100  text-' +
                getColor(index) +
                '-600 dark:text-' +
                getColor(index) +
                '-300 text-sm font-medium flex items-center justify-center mb-1'
            ]"
          >
            {{ dishType.numberOfDishes }}
          </dt>
          <dd
            :class="[
              'text-' +
                getColor(index) +
                '-600 dark:text-' +
                getColor(index) +
                '-300 text-sm font-medium'
            ]"
          >
            {{ dishType.dishTypeName }}
          </dd>
        </dl>
      </div>
    </div>

    <div class="py-6" id="donut-chart"></div>
  </div>
</template>

<script setup>
import ApexCharts from 'apexcharts'
import { onMounted } from 'vue'
import { useDishTypeStore } from '@/stores/dishTypeStore'
import { computed } from 'vue'

const options = {
  series: [],
  colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694', '#DAC4F7', '#272932', '#12664F', '#EA3546'],
  chart: {
    height: 320,
    width: '100%',
    type: 'donut'
  },
  stroke: {
    colors: ['transparent'],
    lineCap: ''
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            show: true,
            fontFamily: 'Inter, sans-serif',
            offsetY: 20
          },
          total: {
            showAlways: true,
            show: true,
            label: 'Tổng các món',
            fontFamily: 'Inter, sans-serif'
          },
          value: {
            show: true,
            fontFamily: 'Inter, sans-serif',
            offsetY: -20,
            formatter: function (value) {
              return value + ' món'
            }
          }
        },
        size: '80%'
      }
    }
  },
  grid: {
    padding: {
      top: -2
    }
  },
  labels: [],
  dataLabels: {
    enabled: false
  },
  legend: {
    position: 'bottom',
    fontFamily: 'Inter, sans-serif'
  },
  yaxis: {
    labels: {}
  },
  xaxis: {
    labels: {},
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    }
  }
}

const dishTypeStore = useDishTypeStore()

const dishTypes = computed(() => {
  return dishTypeStore.dishTypes
})

onMounted(async () => {
  if (dishTypeStore.dishTypes.length === 0) {
    await dishTypeStore.fetchDishTypes()
  }

  const dishType = dishTypes.value.map((e) => e.dishTypeName)
  const numberOfDishes = dishTypes.value.map((e) => e.numberOfDishes)

  options.series = numberOfDishes
  options.labels = dishType

  const chart = new ApexCharts(document.getElementById('donut-chart'), options)
  chart.render()
})

const getColor = (index) => {
  const colors = ['blue', 'teal', 'orange', 'pink', 'fuchsia', 'slate', 'emerald', 'red']

  return colors[index % colors.length]
}
</script>
