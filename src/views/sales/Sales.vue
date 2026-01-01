<!--
  eslint-disable vue/multi-word-component-names
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
     <h1 class="text-3xl font-bold">New Sale</h1>

    <div class="max-w-7xl mx-auto px-6 py-6 space-y-6">
      <!-- Search Input -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <div class="relative">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M18 10a8 8 0 11-16 0 8 8 0 0116 0z" />
          </svg>
          <input
            ref="searchInputRef"
            v-model="searchInput"
            @keydown.enter.prevent="focusQuantityIfProductFound"
            type="text"
            placeholder="Scan barcode or type product name / code"
            class="w-full pl-16 pr-6 py-5 text-2xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            autocomplete="off"
          />
        </div>

        <!-- Product Details -->
        <div v-if="selectedProduct" class="mt-6 p-6 bg-green-50 border-2 border-green-500 rounded-xl">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <p class="text-gray-600 mb-1">Product Name</p>
              <p class="text-xl font-medium">{{ selectedProduct.name }}</p>
            </div>
            <div>
              <p class="text-gray-600 mb-1">Price per unit</p>
              <p class="text-xl font-medium">₹{{ selectedProduct.price }}</p>
            </div>
            <div>
              <p class="text-gray-600 mb-1">Unit</p>
              <p class="text-xl font-medium">{{ selectedProduct.unit }}</p>
            </div>
          </div>

          <div class="flex items-end gap-4">
            <div class="flex-1">
              <label class="block text-gray-700 mb-2">
                Quantity ({{ selectedProduct.unit }})
              </label>
              <input
                ref="quantityInputRef"
                v-model="quantity"
                @keydown.enter="handleAddToCart"
                type="number"
                min="0.001"
                step="0.001"
                class="w-full px-4 py-3 text-2xl border-2 border-green-300 rounded-xl focus:border-green-600 focus:outline-none"
                autocomplete="off"
              />
              <p class="text-sm text-gray-600 mt-1">
                Stock available: {{ selectedProduct.stock }} {{ selectedProduct.unit }}
              </p>
            </div>
            <button
              @click="handleAddToCart"
              class="px-8 py-3 bg-green-600 text-white text-xl rounded-xl hover:bg-green-700 transition-colors shadow-lg"
            >
              Add Item
            </button>
          </div>
        </div>

        <!-- No Product Found -->
        <div v-else-if="searchInput && !selectedProduct" class="mt-6 p-6 bg-orange-50 border-2 border-orange-300 rounded-xl text-center">
          <p class="text-xl text-orange-700">No product found</p>
        </div>
      </div>

      <!-- Cart Items -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-2xl mb-4">Items ({{ cart.length }})</h2>

        <div v-if="cart.length === 0" class="text-center py-12 text-gray-400">
          <p class="text-xl">No items added yet</p>
        </div>

        <div v-else class="space-y-3">
          <!-- Table Header -->
          <div class="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-100 rounded-lg font-medium text-gray-700">
            <div class="col-span-4">Product</div>
            <div class="col-span-2 text-center">Qty</div>
            <div class="col-span-1 text-center">Unit</div>
            <div class="col-span-2 text-right">Price</div>
            <div class="col-span-2 text-right">Total</div>
            <div class="col-span-1"></div>
          </div>

          <!-- Cart Items -->
          <div
            v-for="item in cart"
            :key="item.productId"
            class="grid grid-cols-12 gap-4 px-4 py-4 bg-gray-50 rounded-lg items-center hover:bg-gray-100 transition-colors"
          >
            <div class="col-span-4 text-lg">{{ item.productName }}</div>

            <div class="col-span-2 flex items-center justify-center gap-2">
              <button
                @click="handleUpdateQuantity(item.productId, item.quantity - 1)"
                class="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              <span class="text-lg min-w-[60px] text-center">{{ item.quantity }}</span>
              <button
                @click="handleUpdateQuantity(item.productId, item.quantity + 1)"
                class="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <div class="col-span-1 text-center text-lg">{{ item.unit }}</div>
            <div class="col-span-2 text-right text-lg">₹{{ item.price }}</div>
            <div class="col-span-2 text-right text-lg">₹{{ (item.price * item.quantity).toFixed(2) }}</div>

            <div class="col-span-1 flex justify-end">
              <button
                @click="handleRemoveItem(item.productId)"
                class="w-8 h-8 flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Total Bar -->
      <div class="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
        <div class="flex items-center justify-between mb-6">
          <div class="text-xl">Grand Total</div>
          <div class="text-5xl font-bold">₹{{ subtotal.toFixed(2) }}</div>
        </div>

        <button
          @click="proceedToPayment"
          :disabled="cart.length === 0"
          class="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl transition-all text-2xl shadow-lg"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Local dummy products
const products = ref([
  { id: '1', name: 'Sugar / Cheeni', code: 'SUG001', price: 45.5, unit: '50kg sack', stock: 50 },
  { id: '2', name: 'Rice / Chawal', code: 'RIC001', price: 65, unit: '100kg bag', stock: 100 },
  { id: '3', name: 'Wheat Flour / Atta', code: 'WFL001', price: 52, unit: '80kg bag', stock: 80 },
  { id: '4', name: 'Cooking Oil', code: 'OIL001', price: 180, unit: '10 liters', stock: 10 },
  { id: '5', name: 'Tea / Chai', code: 'TEA001', price: 320, unit: '5kg pack', stock: 5 },
  { id: '6', name: 'Lentils / Dal', code: 'DAL001', price: 120, unit: '25kg sack', stock: 25 },
  { id: '7', name: 'Salt / Namak', code: 'SAL001', price: 28, unit: '10kg pack', stock: 10 },
  { id: '8', name: 'Milk Powder', code: 'MP001', price: 450, unit: '2kg pack', stock: 2 },
])
const router = useRouter()
const cart = ref([])

const searchInput = ref('')
const quantity = ref('1')
const searchInputRef = ref(null)
const quantityInputRef = ref(null)

// const router = useRouter()

onMounted(() => {
  searchInputRef.value?.focus()
})

// Computed selected product from search input
const selectedProduct = computed(() => {
  if (!searchInput.value.trim()) return null
  const term = searchInput.value.toLowerCase().trim()
  return products.value.find(p =>
    p.code.toLowerCase() === term ||
    p.name.toLowerCase().includes(term) ||
    p.id === term
  ) || null
})

// Focus quantity input if product found on enter
const focusQuantityIfProductFound = () => {
  if (selectedProduct.value) {
    quantityInputRef.value?.focus()
  }
}

const handleAddToCart = () => {
  if (!selectedProduct.value || !quantity.value || parseFloat(quantity.value) <= 0) return

  const qty = parseFloat(quantity.value)
  if (qty > selectedProduct.value.stock) {
    alert(`Insufficient stock! Available: ${selectedProduct.value.stock} ${selectedProduct.value.unit}`)
    return
  }

  const existingIndex = cart.value.findIndex(item => item.productId === selectedProduct.value.id)

  if (existingIndex >= 0) {
    const newQty = cart.value[existingIndex].quantity + qty
    if (newQty > selectedProduct.value.stock) {
      alert(`Insufficient stock! Available: ${selectedProduct.value.stock} ${selectedProduct.value.unit}`)
      return
    }
    cart.value[existingIndex].quantity = newQty
  } else {
    cart.value.push({
      productId: selectedProduct.value.id,
      productName: selectedProduct.value.name,
      quantity: qty,
      price: selectedProduct.value.price,
      unit: selectedProduct.value.unit
    })
  }

  // Reset
  searchInput.value = ''
  quantity.value = '1'
  searchInputRef.value?.focus()
}

const handleRemoveItem = (productId) => {
  cart.value = cart.value.filter(item => item.productId !== productId)
}

const handleUpdateQuantity = (productId, newQty) => {
  if (newQty <= 0) {
    handleRemoveItem(productId)
    return
  }

  const product = products.value.find(p => p.id === productId)
  if (product && newQty > product.stock) {
    alert(`Insufficient stock! Available: ${product.stock} ${product.unit}`)
    return
  }

  cart.value = cart.value.map(item =>
    item.productId === productId ? { ...item, quantity: newQty } : item
  )
}

const subtotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})


const proceedToPayment = () => {
  console.log("Hello")
  if (cart.value.length === 0) return

  router.push({
    path: '/payment',
    query: {
      subtotal: subtotal.value,
      cart: JSON.stringify(cart.value)
    }
  })
}
</script>