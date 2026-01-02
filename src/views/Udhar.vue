<!--
  eslint-disable vue/multi-word-component-names
-->
<template>
  <div class="p-6 lg:p-10">
    
    <!-- Total Unpaid Udhar Card -->
      <div class="flex justify-between gap-4 mb-6">
   <div class="headers">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Udhar (Credit)</h1>
    <p class="text-gray-600 mb-8">Manage customer credit accounts</p>

   </div>
    <div class="tab">
        <button
        @click="activeTab = 'unpaid'"
        class="flex-1 py-2 px-3 rounded-xl mb-3 md:mb-0 transition-all"
        :class="activeTab === 'unpaid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
      >
        Unpaid
      </button>
      <button
        @click="activeTab = 'paid'"
        class="flex-1 py-2 px-3 rounded-xl ml-5 transition-all"
        :class="activeTab === 'paid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
      >
        Paid
      </button>
    </div>
    </div>
    
    <div class="bg-white rounded-2xl shadow-md p-6 mb-8 flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-600 mb-2">Total Unpaid Udhar</p>
        <p class="text-4xl font-bold text-purple-600">₹{{ totalUnpaid.toFixed(2) }}</p>
        <p class="text-sm text-gray-500 mt-1">{{ unpaidCustomers.length }} pending payments</p>
      </div>
      <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
        <svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="mb-6">
      <div class="relative">
        <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search customers..."
          class="w-full px-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent text-gray-800 placeholder-gray-400 transition"
        />
      </div>
    </div>

  

    <!-- Unpaid Udhar Section -->
    <div v-if="activeTab === 'unpaid'" class="flex items-center gap-3 mb-6">
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
        v-for="customer in filteredCustomers"
        :key="customer.id"
        :name="customer.name"
        :status="customer.status"
        :due-date="customer.dueDate"
        :amount="customer.amount"
        @click="openPaymentModal(customer)"
      />
    </div>

    <!-- Payment Modal -->
    <div v-if="selectedCustomer" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 class="text-xl font-medium text-gray-900 mb-4">Update Payment for {{ selectedCustomer.name }}</h2>
        <p class="text-gray-600 mb-4">Remaining Udhar: ₹{{ selectedCustomer.amount.toFixed(2) }}</p>
        <div class="space-y-4">
          <label class="block text-gray-700">Payment Amount</label>
          <input
            v-model.number="paymentAmount"
            type="number"
            placeholder="Enter payment amount"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            min="0"
            :max="selectedCustomer.amount"
          />
          <p class="text-gray-600">New Remaining: ₹{{ newRemaining.toFixed(2) }}</p>
        </div>
        <div class="flex gap-4 mt-6">
          <button @click="closeModal" class="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all">
            Cancel
          </button>
          <button
            @click="updatePayment"
            :disabled="paymentAmount <= 0 || paymentAmount > selectedCustomer.amount"
            class="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-70 transition-all"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import UdharCard from '@/components/UdharCard.vue'

// Dummy data – backend se fetch kar lena
const unpaidCustomers = ref([
  { id: 1, name: 'Ahmad Khan', status: '5 days overdue', dueDate: 'Due: 2024-01-15', amount: 2500 },
  { id: 2, name: 'Fatima Ali', status: 'Pending', dueDate: 'Due: 2024-01-20', amount: 1200 },
  { id: 3, name: 'Ayesha Malik', status: 'Pending', dueDate: 'Due: 2024-01-25', amount: 800 },
  { id: 4, name: 'Zainab Hussain', status: '2 days overdue', dueDate: 'Due: 2024-01-18', amount: 1300 },
  { id: 5, name: 'Bilal Tariq', status: 'Pending', dueDate: 'Due: 2024-01-22', amount: 950 },
])

const paidCustomers = ref([])

const searchQuery = ref('')
const activeTab = ref('unpaid')
const selectedCustomer = ref(null)
const paymentAmount = ref(0)

// Computed for filtered customers
const filteredCustomers = computed(() => {
  const list = activeTab.value === 'unpaid' ? unpaidCustomers.value : paidCustomers.value
  if (!searchQuery.value) return list
  const term = searchQuery.value.toLowerCase()
  return list.filter(c => c.name.toLowerCase().includes(term))
})

// Total unpaid
const totalUnpaid = computed(() => unpaidCustomers.value.reduce((sum, c) => sum + c.amount, 0))

// New remaining in modal
const newRemaining = computed(() => {
  if (!selectedCustomer.value) return 0
  return selectedCustomer.value.amount - paymentAmount.value
})

// Open modal
const openPaymentModal = (customer) => {
  selectedCustomer.value = { ...customer }
  paymentAmount.value = 0
}

// Close modal
const closeModal = () => {
  selectedCustomer.value = null
}

// Update payment
const updatePayment = () => {
  if (!selectedCustomer.value) return

  const index = unpaidCustomers.value.findIndex(c => c.id === selectedCustomer.value.id)
  if (index >= 0) {
    unpaidCustomers.value[index].amount = newRemaining.value
    if (newRemaining.value <= 0) {
      paidCustomers.value.push(unpaidCustomers.value.splice(index, 1)[0])
    }
  }

  closeModal()
  alert('Payment updated!')
}
</script>