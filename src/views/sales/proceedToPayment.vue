<template>
  <div class="min-h-screen bg-gray-50 p-6 lg:p-2">
    <!-- Header with Back -->
    <h1 class="text-3xl font-bold text-gray-900">Payment</h1>

    <p class="text-gray-600 mb-8">Complete the payment for this sale</p>

    <!-- Subtotal Summary -->
    <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
      <div class="flex items-center justify-between">
        <p class="text-xl text-gray-700">Subtotal</p>
        <p class="text-3xl font-bold text-gray-900">₹{{ subtotal.toFixed(2) }}</p>
      </div>
    </div>

    <!-- Payment Method Selection -->
    <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 class="text-xl font-medium text-gray-900 mb-4">Payment Method</h2>
      <div class="flex gap-4">
        <button
          @click="paymentMethod = 'cash'; resetUdhar()"
          class="flex-1 py-3 px-4 rounded-xl transition-all"
          :class="paymentMethod === 'cash' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          Cash
        </button>
        <button
          @click="paymentMethod = 'udhar'; resetCash()"
          class="flex-1 py-3 px-4 rounded-xl transition-all"
          :class="paymentMethod === 'udhar' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          Udhar (Credit)
        </button>
      </div>
    </div>

    <!-- Cash Payment -->
    <div v-if="paymentMethod === 'cash'" class="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 class="text-xl font-medium text-gray-900 mb-4">Cash Payment</h2>
      <div class="space-y-4 mb-6">
        <div>
          <label class="block text-gray-700 mb-2">Received Amount</label>
          <input
            v-model.number="receivedAmount"
            type="number"
            placeholder="Enter received amount"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            min="0"
          />
        </div>
        <div v-if="change > 0" class="p-4 bg-green-50 border-2 border-green-500 rounded-xl text-green-700">
          Return Change: ₹{{ change.toFixed(2) }}
        </div>
        <div v-if="remaining > 0" class="p-4 bg-orange-50 border-2 border-orange-500 rounded-xl text-orange-700 flex items-center justify-between">
          Remaining Amount: ₹{{ remaining.toFixed(2) }}
          <div class="flex gap-2">
            <button
              @click="forgiveRemaining"
              class="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all"
            >
              Forgive Remaining
            </button>
            <button
              @click="addToUdhar"
              class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
            >
              Add to Udhar
            </button>
          </div>
        </div>
      </div>
      <p class="text-gray-600 mb-6">Total amount to collect: ₹{{ subtotal.toFixed(2) }}</p>

      <!-- Save Bill button - hide if udhar form open -->
      <button
        v-if="!showUdharForm"
        @click="handleSaveBill('cash')"
        :disabled="loading"
        class="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-70 transition-all shadow-lg"
      >
        {{ loading ? 'Saving...' : 'Save Bill' }}
      </button>
    </div>

    <!-- Udhar Payment Form -->
    <div v-if="paymentMethod === 'udhar' || showUdharForm" class="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 class="text-xl font-medium text-gray-900 mb-4">Udhar (Credit) Details</h2>
      <div class="space-y-4 mb-6">
        <div>
          <label class="block text-gray-700 mb-2">Customer Name</label>
          <input
            v-model="udharForm.name"
            type="text"
            placeholder="Enter customer name"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700 mb-2">Phone Number</label>
          <input
            v-model="udharForm.phone"
            type="tel"
            placeholder="Enter phone number"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            required
          />
        </div>
        <div v-if="paymentMethod === 'cash' && showUdharForm">
          <label class="block text-gray-700 mb-2">Cash Paid</label>
          <input
            :value="receivedAmount.toFixed(2)"
            type="text"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>
        <div>
          <label class="block text-gray-700 mb-2">Udhar Amount</label>
          <input
            :value="udharAmount.toFixed(2)"
            type="text"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>
        <div>
          <label class="block text-gray-700 mb-2">Return Date</label>
          <input
            v-model="udharForm.returnDate"
            type="date"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            required
          />
        </div>
      </div>
      <button
        @click="handleSaveBill('udhar')"
        :disabled="loading || !udharForm.name || !udharForm.phone || !udharForm.returnDate"
        class="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-70 transition-all shadow-lg"
      >
        {{ loading ? 'Saving...' : 'Save Udhar Bill' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const cart = ref([])
const subtotal = ref(0)
const receivedAmount = ref(0)
const paymentMethod = ref('cash')
const showUdharForm = ref(false)
const loading = ref(false)
const udharForm = ref({
  name: '',
  phone: '',
  returnDate: ''
})

onMounted(() => {
  if (route.query.cart) cart.value = JSON.parse(route.query.cart)
  if (route.query.subtotal) subtotal.value = parseFloat(route.query.subtotal)
})

const change = computed(() => Math.max(receivedAmount.value - subtotal.value, 0))
const remaining = computed(() => Math.max(subtotal.value - receivedAmount.value, 0))
const udharAmount = computed(() => remaining.value)

const resetUdhar = () => {
  showUdharForm.value = false
  udharForm.value = { name: '', phone: '', returnDate: '' }
}
const resetCash = () => {
  receivedAmount.value = 0
}

const forgiveRemaining = () => {
  receivedAmount.value = subtotal.value  // Maf kar de
  showUdharForm.value = false  // ← YE ADD KIYA - udhar form hide, Save Bill wapas dikhega
}

const addToUdhar = () => {
  showUdharForm.value = true  // Form open, Save Bill hide
}

const handleSaveBill = async (type) => {
  loading.value = true
  try {
    const billData = {
      items: cart.value,
      total: subtotal.value,
      paid: receivedAmount.value,
      remaining: remaining.value,
      paymentType: type,
      udharDetails: (type === 'udhar' || showUdharForm.value) ? udharForm.value : null,
      date: new Date().toISOString()
    }

    const response = await fetch('http://localhost:5000/api/sales/save-bill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(billData)
    })

    if (response.ok) {
      alert('Bill saved successfully!')
      cart.value = []
      router.push('/dashboard')
    } else {
      alert('Error saving bill')
    }
  } catch (err) {
    alert('Network error', err)
  } finally {
    loading.value = false
  }
}

</script>