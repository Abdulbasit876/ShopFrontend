<template>
  <div class="bg-white hover:cursor-pointer rounded-2xl shadow-md p-6">
    <!-- Name and Status -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-medium text-gray-900">{{ name }}</h3>
      <span 
        class="px-3 py-1 rounded-full text-xs text-center font-medium"
        :class="{
          'bg-red-100 text-red-600': status.includes('overdue'),
          'bg-yellow-100 text-yellow-600': status === 'Pending'
        }"
      >
        {{ status }}
      </span>
    </div>

    <!-- Due Date -->
    <p class="text-sm text-gray-500 mb-6">{{ dueDate }}</p>

    <!-- Amount -->
    <p class="text-2xl font-bold text-red-600">₹{{ amount.toLocaleString() }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  status: String,
  dueDate: String,
  amount: Number
})
</script>