<template>
  <div v-if="profits" class="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-between mb-5">
      <div>
        <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
          {{ formatPrice(profits.revenues.total - profits.expenses.total) }}
        </h5>

        <p class="text-base font-normal text-gray-500 dark:text-gray-400">
          {{ selectedTimeLabel }}
        </p>
      </div>
      <div>
        <ChartTimeRangeSelect @time-selected="handleTimeSelected"></ChartTimeRangeSelect>
      </div>
    </div>
    <div id="legend-chart"></div>
    <div
      class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5"
    ></div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import ApexCharts from 'apexcharts'
import { ref, onMounted, computed } from 'vue'
import { useChartStore } from '@/stores/chartStore'
import ChartTimeRangeSelect from './ChartTimeRangeSelect.vue'

let chart

const options = {
  tooltip: {
    enabled: true,
    x: {
      show: true
    },
    y: {
      show: true
    }
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 25,
      right: 2,
      top: 0
    }
  },
  series: [
    {
      name: 'Doanh thu',
      data: [],
      color: '#1A56DB'
    },
    {
      name: 'Chi tiêu',
      data: [],
      color: '#FDBA8C'
    }
  ],
  chart: {
    height: '100%',
    maxWidth: '100%',
    type: 'area',
    fontFamily: 'Inter, sans-serif',
    dropShadow: {
      enabled: false
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  legend: {
    show: true,
    fontWeight: 900
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: '#1C64F2',
      gradientToColors: ['#1C64F2']
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 6
  },
  xaxis: {
    categories: [],
    labels: {
      formatter: formatHour,
      style: {
        fontSize: '12px'
      },
      show: true
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      show: true
    }
  },
  yaxis: {
    show: true,
    labels: {
      formatter: function (value) {
        // Format value to have commas as thousand separators
        const formattedValue = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(value)

        return formattedValue
      }
    }
  },
  markers: {}
}

const chartStore = useChartStore()

const profits = computed(() => {
  return chartStore.profits
})

const getData = async (timeRange, formatter) => {
  await chartStore.fetchProfits({ timeRange: `${timeRange}` })
  options.xaxis.categories = profits.value.revenues.times
  options.series[0].data = profits.value.revenues.data
  options.series[1].data = profits.value.expenses.data
  options.xaxis.labels.formatter = formatter
}

onMounted(async () => {
  await getData('today', formatHour)
  chart = new ApexCharts(document.getElementById('legend-chart'), options)
  chart.render()
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

const selectedTimeLabel = ref('Lợi nhuận hôm nay')

const handleTimeSelected = async (time) => {
  switch (time) {
    case 'Hôm nay': {
      await getData('today', formatHour)
      selectedTimeLabel.value = `Lợi nhuận hôm nay`
      break
    }

    case 'Hôm qua': {
      await getData('yesterday', formatHour)
      selectedTimeLabel.value = `Lợi nhuận hôm qua`
      break
    }

    case 'Tuần qua': {
      await getData('week', formatDate)

      const firstDate = formatDate(profits.value.revenues.times[0])
      const lastDate = formatDate(profits.value.revenues.times.at(-1))

      selectedTimeLabel.value = `Lợi nhuận từ ${firstDate} đến ${lastDate}`
      break
    }

    case 'Tháng qua': {
      await getData('month', formatDate)
      const firstDate = new Date(profits.value.revenues.times[0])
      selectedTimeLabel.value = `Lợi nhuận trong tháng ${firstDate.getMonth() + 1}`
      break
    }

    case 'Quý qua': {
      await getData('quarter', formatMonth)
      const firstDate = new Date(profits.value.revenues.times[0])
      selectedTimeLabel.value = `Lợi nhuận trong quý ${Math.floor((firstDate.getMonth() + 1) / 3) + 1}, năm ${firstDate.getFullYear()}`
      break
    }

    case 'Năm qua': {
      await getData('year', formatMonth)
      const firstDate = new Date(profits.value.revenues.times[0])
      selectedTimeLabel.value = `Lợi nhuận trong năm ${firstDate.getFullYear()}`
      break
    }
  }

  chart.updateOptions(options)
}

function formatHour(value) {
  const hour = parseInt(value)

  const period = () => {
    if (hour <= 12) {
      return 'AM'
    }
    return 'PM'
  }

  const displayHour = () => {
    if (hour === 0) {
      return 0
    }
    if (hour === 12 || hour === 24) {
      return 12
    }
    return hour % 12
  }
  return `${displayHour()}:00 ${period()}`
}

function formatDate(value) {
  const date = new Date(value)

  const day = date.getDate()
  const month = date.getMonth() + 1

  const formattedDay = day < 10 ? '0' + day : day
  const formattedMonth = month < 10 ? '0' + month : month

  return `${formattedDay}-${formattedMonth}`
}

function formatMonth(value) {
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const dateObject = new Date(value)
  const month = months[dateObject.getMonth()]
  const year = dateObject.getFullYear()

  return month + '-' + year
}
</script>
