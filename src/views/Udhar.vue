<!--
  eslint-disable vue/multi-word-component-names
-->
<template>
  <div class="p-6 lg:p-10">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Udhar (Credit)</h1>
    <p class="text-gray-600 mb-8">Manage customer credit accounts</p>

    <!-- Total Unpaid Udhar Card -->
    <div class="bg-white rounded-2xl shadow-md p-6 mb-8 flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-600 mb-2">Total Unpaid Udhar</p>
        <p class="text-4xl font-bold text-purple-600">₹7,250</p>
        <p class="text-sm text-gray-500 mt-1">5 pending payments</p>
      </div>
      <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
        <svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      </div>
    </div>

    <!-- Unpaid Udhar Section -->
    <div class="flex items-center gap-3 mb-6">
      <div class="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
        <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 class="text-xl font-medium text-gray-900">Unpaid Udhar</h2>
    </div>

    <!-- Customer Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <UdharCard
        v-for="customer in customers"
        :key="customer.name"
        :name="customer.name"
        :status="customer.status"
        :due-date="customer.dueDate"
        :amount="customer.amount"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UdharCard from '@/components/UdharCard.vue'

// Dummy data – backend se replace kar lena
const customers = ref([
  { name: 'Ahmad Khan', status: '5 days overdue', dueDate: 'Due: 2024-01-15', amount: 2500 },
  { name: 'Fatima Ali', status: 'Pending', dueDate: 'Due: 2024-01-20', amount: 1200 },
  { name: 'Ayesha Malik', status: 'Pending', dueDate: 'Due: 2024-01-25', amount: 800 },
  { name: 'Zainab Hussain', status: '2 days overdue', dueDate: 'Due: 2024-01-18', amount: 1300 },
  { name: 'Bilal Tariq', status: 'Pending', dueDate: 'Due: 2024-01-22', amount: 950 },
])
</script>