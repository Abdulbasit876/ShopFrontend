<template>
  <div class="bg-white rounded-2xl shadow-md p-6">
    <h2 class="text-xl font-medium text-gray-900 mb-4">{{ title }}</h2>
    <div class="h-80">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  type: String,
  title: String,
  labels: Array,
  datasets: Array,
  options: Object
})

const chartCanvas = ref(null)
let chartInstance = null

const renderChart = () => {
  if (chartInstance) chartInstance.destroy()

  const ctx = chartCanvas.value.getContext('2d')

  chartInstance = new Chart(ctx, {
    type: props.type,
    data: {
      labels: props.labels,
      datasets: props.datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle' } },
        tooltip: { callbacks: { label: (context) => '₹' + context.parsed.y + 'k' } }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0, 0, 0, 0.1)' },
          ticks: { callback: (value) => '₹' + value + 'k' }
        },
        x: { grid: { display: false } }
      },
      elements: { line: { tension: 0.4 } },
      ...props.options
    }
  })
}

onMounted(renderChart)
watch(() => [props.labels, props.datasets, props.type], renderChart, { deep: true })
</script>