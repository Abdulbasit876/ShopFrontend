<!--
  eslint-disable vue/multi-word-component-names
-->
<template>
  <div class="p-6 lg:p-10">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
    <p class="text-gray-600 mb-8">Overview of your shop's daily status</p>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div class="bg-white rounded-2xl shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm text-gray-600">Today Sales</p>
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 6c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4z" />
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">₹19,000</p>
      </div>

      <div class="bg-white rounded-2xl shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm text-gray-600">Total Stock</p>
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">2,845</p>
        <p class="text-sm text-gray-500 mt-1">items</p>
      </div>

      <div class="bg-white rounded-2xl shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm text-gray-600">Total Udhar</p>
          <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">₹45,600</p>
        <p class="text-sm text-gray-500 mt-1">pending</p>
      </div>

      <div class="bg-white rounded-2xl shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm text-gray-600">Low Stock</p>
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">12</p>
        <p class="text-sm text-gray-500 mt-1">items</p>
      </div>
    </div>

    <!-- Daily Sales Chart -->
    <div class="bg-white rounded-2xl shadow-md p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Daily Sales This Week</h3>
      <div class="h-80">
        <canvas ref="weeklyChartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const weeklyChartCanvas = ref(null)

// Dummy data – backend se replace kar lena
const weeklyData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  sales: [11000, 13000, 15000, 17000, 19000, 21000, 23000],
  profit: [4000, 5000, 6000, 7000, 8000, 9000, 10000]
}

onMounted(() => {
  const ctx = weeklyChartCanvas.value.getContext('2d')

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: weeklyData.labels,
      datasets: [
        {
          label: 'Sales',
          data: weeklyData.sales,
          backgroundColor: '#3b82f6',
          borderRadius: 8,
          barThickness: 30
        },
        {
          label: 'Profit',
          data: weeklyData.profit,
          backgroundColor: '#22c55e',
          borderRadius: 8,
          barThickness: 30
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: (context) => {
              return `${context.dataset.label}: ₹${context.parsed.y.toLocaleString()}`
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { callback: (value) => '₹' + value.toLocaleString() }
        }
      }
    }
  })
})
</script>

