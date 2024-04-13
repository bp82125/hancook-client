<template>
  <div class="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-between mb-3">
      <div class="flex items-center">
        <div class="flex justify-center items-center">
          <h1 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1 uppercase">
            Trạng thái bàn hiện tại
          </h1>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
      <div class="grid grid-cols-2 gap-3 mb-2">
        <dl
          class="bg-teal-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]"
        >
          <dt
            class="w-8 h-8 rounded-full bg-teal-100 dark:bg-gray-500 text-teal-600 dark:text-teal-300 text-sm font-medium flex items-center justify-center mb-1"
          >
            {{ available }}
          </dt>
          <dd class="text-teal-600 dark:text-teal-300 text-sm font-medium">Còn trống</dd>
        </dl>
        <dl
          class="bg-orange-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]"
        >
          <dt
            class="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-orange-600 dark:text-orange-300 text-sm font-medium flex items-center justify-center mb-1"
          >
            {{ occupied }}
          </dt>
          <dd class="text-orange-600 dark:text-orange-300 text-sm font-medium">Có khách</dd>
        </dl>
      </div>
    </div>

    <!-- Radial Chart -->
    <div class="py-6" id="radial-chart"></div>
  </div>
</template>

<script setup>
import ApexCharts from 'apexcharts'
import { onMounted, ref } from 'vue'
import { useChartStore } from '@/stores/chartStore'

const options = {
  series: [],
  colors: ['#16BDCA', '#FDBA8C'],
  chart: {
    height: '256px',
    width: '100%',
    type: 'radialBar',
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    radialBar: {
      track: {
        background: '#E5E7EB'
      },
      dataLabels: {
        show: false
      },
      hollow: {
        margin: 0,
        size: '32%'
      }
    }
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: -23,
      bottom: -20
    }
  },
  labels: ['Còn trống', 'Có khách'],
  legend: {
    show: true,
    position: 'bottom',
    fontFamily: 'Inter, sans-serif'
  },
  tooltip: {
    enabled: true,
    x: {
      show: false
    }
  },
  yaxis: {
    show: false,
    labels: {
      formatter: function (value) {
        return value + '%'
      }
    }
  }
}

const chartStore = useChartStore()

const occupied = ref(0)
const available = ref(0)

onMounted(async () => {
  await chartStore.fetchTableStates()

  occupied.value = chartStore.tableStates.occupied
  available.value = chartStore.tableStates.available

  console.log()

  const occupiedPercentage = Math.floor((occupied.value / (occupied.value + available.value)) * 100)
  const availablePercentage = Math.floor(
    (available.value / (occupied.value + available.value)) * 100
  )

  options.series = [availablePercentage, occupiedPercentage]

  const chart = new ApexCharts(document.querySelector('#radial-chart'), options)
  chart.render()
})
</script>
