<template>
  <div class="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
      <div class="flex justify-center items-center">
        <h1 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1 uppercase">
          Thống kê nhân viên
        </h1>
      </div>
    </div>

    <div id="bar-chart"></div>

    <div class="grid grid-cols-2 py-3">
      <dl>
        <dt class="text-center font-normal text-gray-500 dark:text-gray-400 pb-1">Chức vụ</dt>
        <dd class="leading-none text-center text-xl font-bold text-gray-800">
          {{ positionCounts }}
        </dd>
      </dl>
      <dl>
        <dt class="text-center font-normal text-gray-500 dark:text-gray-400 pb-1">Nhân viên</dt>
        <dd class="leading-none text-xl text-center font-bold text-gray-800">
          {{ employeeCounts }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script setup>
import ApexCharts from 'apexcharts'
import { usePositionStore } from '@/stores/positionStore'
import { onMounted, ref } from 'vue'

const options = {
  series: [
    {
      name: 'Nhân viên',
      color: '#1A56DB',
      data: []
    },
    {
      name: 'Hệ số lương',
      color: '#FDBA8C',
      data: []
    }
  ],
  chart: {
    sparkline: {
      enabled: false
    },
    type: 'bar',
    width: '100%',
    height: 400,
    toolbar: {
      show: false
    }
  },
  fill: {
    opacity: 1
  },
  plotOptions: {
    bar: {
      horizontal: true,
      columnWidth: '100%',
      borderRadiusApplication: 'end',
      borderRadius: 6,
      dataLabels: {
        position: 'top'
      }
    }
  },
  legend: {
    show: true,
    position: 'bottom'
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    shared: true,
    intersect: false
  },
  xaxis: {
    labels: {
      show: true,
      style: {
        fontFamily: 'Inter, sans-serif',
        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
      }
    },
    categories: [],
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    }
  },
  yaxis: {
    labels: {
      show: false,
      style: {
        fontFamily: 'Inter, sans-serif',
        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
      }
    }
  },
  grid: {
    show: true,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: -20
    }
  }
}

const positionStore = usePositionStore()

const positionCounts = ref(0)
const employeeCounts = ref(0)

onMounted(async () => {
  await positionStore.fetchPositions()

  const positionNames = positionStore.positions.map((item) => item.positionName)
  const salaryCoefficients = positionStore.positions.map((item) => item.salaryCoefficient)
  const numberOfEmployees = positionStore.positions.map((item) => item.numberOfEmployees)

  positionCounts.value = positionNames.length
  employeeCounts.value = numberOfEmployees.reduce((acc, n) => acc + n, 0)

  options.series[0].data = numberOfEmployees
  options.series[1].data = salaryCoefficients
  options.xaxis.categories = positionNames

  const chart = new ApexCharts(document.getElementById('bar-chart'), options)
  chart.render()
})
</script>
