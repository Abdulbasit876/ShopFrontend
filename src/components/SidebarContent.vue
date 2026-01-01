<template>
  <div class="flex flex-col h-full">
    <!-- Logo - Fixed top -->
    <div class="p-6 border-b border-gray-200 flex-shrink-0">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h-4" />
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-bold">My Shop</h2>
          <p class="text-sm text-gray-500">Management System</p>
        </div>
      </div>
    </div>

    <!-- Nav Links - Scrollable -->
   <nav class="flex-1 overflow-y-auto p-4 space-y-2">

  <router-link to="/dashboard" custom v-slot="{ isActive, navigate }">
    <a
      @click="navigate"
      class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer select-none"
      :class="isActive
        ? 'bg-blue-200 text-blue-700 font-semibold'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'"
    >
      <Home
        class="w-5 h-5 transition-colors"
        :class="isActive ? 'text-blue-700' : 'group-hover:text-gray-900'"
      />
      Dashboard
    </a>
  </router-link>

  <router-link to="/inventory" custom v-slot="{ isActive, navigate }">
    <a
      @click="navigate"
      class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer select-none"
      :class="isActive
        ? 'bg-blue-200 text-blue-700 font-semibold'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'"
    >
      <Boxes
        class="w-5 h-5 transition-colors"
        :class="isActive ? 'text-blue-700' : 'group-hover:text-gray-900'"
      />
      Inventory
    </a>
  </router-link>

  <router-link to="/sales" custom v-slot="{ isActive, navigate }">
    <a
      @click="navigate"
      class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer select-none"
      :class="isActive
        ? 'bg-blue-200 text-blue-700 font-semibold'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'"
    >
      <ShoppingCart
        class="w-5 h-5 transition-colors"
        :class="isActive ? 'text-blue-700' : 'group-hover:text-gray-900'"
      />
      Sales
    </a>
  </router-link>
  <router-link to="/udhar" custom v-slot="{ isActive, navigate }">
    <a
      @click="navigate"
      class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer select-none"
      :class="isActive
        ? 'bg-blue-200 text-blue-700 font-semibold'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'"
    >
      <CreditCardIcon
        class="w-5 h-5 transition-colors"
        :class="isActive ? 'text-blue-700' : 'group-hover:text-gray-900'"
      />
      Udhar
    </a>
  </router-link>

<router-link to="/reports" custom v-slot="{ isActive, navigate }">
    <a
      @click="navigate"
      class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer select-none"
      :class="isActive
        ? 'bg-blue-200 text-blue-700 font-semibold'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'"
    >
      <ChartBarIcon
        class="w-5 h-5 transition-colors"
        :class="isActive ? 'text-blue-700' : 'group-hover:text-gray-900'"
      />
      Reports
    </a>
  </router-link>

  <router-link to="/settings" custom v-slot="{ isActive, navigate }">
    <a
      @click="navigate"
      class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer select-none"
      :class="isActive
        ? 'bg-blue-200 text-blue-700 font-semibold'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'"
    >
      <CogIcon
        class="w-5 h-5 transition-colors"
        :class="isActive ? 'text-blue-700' : 'group-hover:text-gray-900'"
      />
      Settings
    </a>    
    </router-link>

</nav>




    <!-- Profile - Fixed bottom -->
    <div class="p-4 border-t border-gray-200 flex-shrink-0">
      <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
        <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          SO
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium">Shop Owner</p>
          <p class="text-xs text-gray-500">owner@shop.com</p>
        </div>
        <button @click="$emit('logout')" class="p-2 hover:bg-gray-200 rounded">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
    import {
  Home,
  Boxes,
  ShoppingCart,
  CogIcon,
  CreditCardIcon,
    ChartBarIcon,

} from 'lucide-vue-next'
defineEmits(['logout'])
defineProps({
  mobileMenuOpen: {
    type: Boolean,
    default: false,
  },
})

</script>
