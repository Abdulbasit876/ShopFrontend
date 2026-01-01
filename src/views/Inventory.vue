<!--
  eslint-disable vue/multi-word-component-names
-->
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Inventory</h1>
    <p class="text-gray-600 mb-8">Visual stock management</p>

    <!-- Search Bar -->
    <div class="mb-6">
      <div class="relative">
        <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="w-full px-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent text-gray-800 placeholder-gray-400 transition"
        />
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2  gap-6">
      <InventoryCard
        v-for="item in filteredItems"
        :key="item.name"
        :name="item.name"
        :unit="item.unit"
        :current-stock="item.currentStock"
        :max-stock="item.maxStock"
        :status="item.status"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import InventoryCard from '@/components/InventoryCard.vue'

// Dummy data - Baad mein backend se fetch kar lenge
const items = ref([
  { name: 'Sugar / Cheeni', unit: '50kg sack', currentStock: 42, maxStock: 50, status: 'high' },
  { name: 'Rice / Chawal', unit: '100kg bag', currentStock: 75, maxStock: 100, status: 'high' },
  { name: 'Wheat Flour / Atta', unit: '80kg bag', currentStock: 15, maxStock: 80, status: 'low' },
  { name: 'Cooking Oil', unit: '10 liters', currentStock: 8, maxStock: 10, status: 'high' },
  { name: 'Tea / Chai', unit: '5kg pack', currentStock: 3, maxStock: 5, status: 'high' },
  { name: 'Lentils / Dal', unit: '25kg sack', currentStock: 5, maxStock: 25, status: 'low' },
  { name: 'Salt / Namak', unit: '10kg pack', currentStock: 8, maxStock: 10, status: 'high' },
  { name: 'Milk Powder', unit: '2kg pack', currentStock: 1.5, maxStock: 2, status: 'high' },
  // Zyada items add kar ke test kar sakte ho
])

const searchQuery = ref('')

// Search filter
const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return items.value.filter(item => item.name.toLowerCase().includes(query))
})
</script>