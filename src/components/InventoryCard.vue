<template>
  <div class="bg-white rounded-2xl shadow-md p-6">
    <!-- Icon and Name -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900">{{ name }}</h3>
      </div>
      <span 
        class="px-3 py-1 rounded-full text-sm font-medium"
        :class="{
          'bg-green-100 text-green-600': status === 'high',
          'bg-red-100 text-red-600': status === 'low'
        }"
      >
        {{ status === 'high' ? 'High Stock' : 'Low Stock' }}
      </span>
    </div>

    <!-- Unit -->
    <p class="text-sm text-gray-500 mb-4">{{ unit }}</p>

    <!-- Stock Level -->
    <p class="text-sm text-gray-600 mb-1">Stock Level</p>
    <p class="text-xl font-bold text-gray-900 mb-2">{{ currentStock }} / {{ maxStock }}</p>

    <!-- Progress Bar -->
    <div class="h-3 bg-gray-200 rounded-full mb-2">
      <div 
        class="h-full rounded-full transition-all"
        :style="{ width: percentage + '%' }"
        :class="{
          'bg-green-500': status === 'high',
          'bg-red-500': status === 'low'
        }"
      ></div>
    </div>

    <!-- Empty / Full Labels -->
    <div class="flex justify-between text-sm text-gray-500">
      <span>Empty</span>
      <span>{{ percentage }}%</span>
      <span>Full</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: String,
  unit: String,
  currentStock: Number,
  maxStock: Number,
  status: String  // 'high' or 'low'
})

const percentage = computed(() => Math.round((props.currentStock / props.maxStock) * 100))
</script>