<!--
  eslint-disable vue/multi-word-component-names
-->
<template>
  <div class=" w-full overflow-y-auto bg-gray-50">  <!-- ← YE LINE SABSE IMPORTANT - mobile pe no margin, desktop pe sidebar shift -->
    <div class="">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
          <p class="text-gray-600">View your shop's performance</p>
        </div>
        <button
          @click="downloadReport"
          class="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2 mt-4 md:mt-0"
        >
          <Download class="w-5 h-5" />
          Download Report
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-2xl shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm text-gray-600">Monthly Sales</p>
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <DollarSign class="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">₹452k</p>
          <p class="text-sm text-green-600 mt-1">+12% from last month</p>
        </div>
        <div class="bg-white rounded-2xl shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm text-gray-600">Monthly Profit</p>
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp class="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">₹86k</p>
          <p class="text-sm text-green-600 mt-1">+8% from last month</p>
        </div>
        <div class="bg-white rounded-2xl shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm text-gray-600">Avg Daily Sales</p>
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <DollarSign class="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">₹16.1k</p>
          <p class="text-sm text-red-600 mt-1">-3% from last week</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="bg-gray-100 rounded-full p-1 flex gap-2 mb-8 overflow-x-auto">
        <button
          @click="activeTab = 'monthly'"
          class="px-6 py-2 rounded-full transition-all whitespace-nowrap"
          :class="activeTab === 'monthly' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-600 hover:text-gray-900'"
        >
          Monthly
        </button>
        <button
          @click="activeTab = 'weekly'"
          class="px-6 py-2 rounded-full transition-all whitespace-nowrap"
          :class="activeTab === 'weekly' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-600 hover:text-gray-900'"
        >
          Weekly
        </button>
        <button
          @click="activeTab = 'category'"
          class="px-6 py-2 rounded-full transition-all whitespace-nowrap"
          :class="activeTab === 'category' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-600 hover:text-gray-900'"
        >
          By Category
        </button>
      </div>

      <!-- Reusable Chart Component -->
      <ReportChart
        :type="chartConfig.type"
        :labels="chartConfig.labels"
        :datasets="chartConfig.datasets"
        :options="chartConfig.options"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ReportChart from '@/components/ReportChart.vue'
import { Download, DollarSign, TrendingUp } from 'lucide-vue-next'
import jsPDF from 'jspdf'

const activeTab = ref('monthly')

const chartConfig = computed(() => {
  if (activeTab.value === 'monthly') {
    return {
      type: 'line',
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        { label: 'Sales', data: [100, 75, 50, 75, 50, 100], borderColor: '#3b82f6', tension: 0.4, fill: false },
        { label: 'Profit', data: [50, 25, 0, 25, 50, 75], borderColor: '#22c55e', tension: 0.4, fill: false }
      ],
      options: { 
        interaction: { mode: 'index', intersect: false },
        plugins: { tooltip: { callbacks: { label: (context) => '₹' + context.parsed.y + 'k' } } },
        scales: { y: { ticks: { callback: (value) => '₹' + value + 'k' } } }
      }
    }
  } else if (activeTab.value === 'weekly') {
    return {
      type: 'bar',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Sales',
        data: [11, 13, 15, 17, 19, 21, 23],
        backgroundColor: '#3b82f6',
        borderRadius: 8
      }],
      options: { 
        interaction: { mode: 'index', intersect: false },
        plugins: { tooltip: { callbacks: { label: (context) => 'Sales: ₹' + context.parsed.y + ',000' } } },
        scales: { y: { ticks: { callback: (value) => '₹' + value + 'k' } } }
      }
    }
  } else {
    return {
      type: 'pie',
      labels: ['Groceries', 'Dairy', 'Beverages', 'Snacks', 'Household'],
      datasets: [{
        data: [40, 25, 15, 10, 10],
        backgroundColor: ['#3b82f6', '#22c55e', '#a855f7', '#ef4444', '#f59e0b']
      }],
      options: { plugins: { legend: { position: 'right' } } }
    }
  }
})

const downloadReport = () => {
  const doc = new jsPDF()
  doc.setFontSize(20)
  doc.text('Shop Performance Report', 20, 20)
  doc.setFontSize(12)
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30)
  doc.save('shop-report.pdf')
}
</script>