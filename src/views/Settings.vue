<!--
  eslint-disable vue/multi-word-component-names
-->
<template>
  <div class=" space-y-6">

    <h2 class="text-3xl font-bold text-gray-900 ">Settings</h2>
    <p class="text-gray-600 mb-2">Manage your shop's settings and preferences</p>
    <!-- Shop Details Card -->
    <div class="bg-white rounded-2xl shadow-md p-6">
      <div class="flex items-center gap-3 mb-4">
        <Store class="w-6 h-6 text-gray-900" />
        <h2 class="text-xl font-medium text-gray-900">Shop Details</h2>
      </div>
      <p class="text-gray-600 mb-6">Update your shop information</p>
      <div class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-2">Shop Name</label>
          <input v-model="shopForm.name" type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50" />
        </div>
        <div>
          <label class="block text-gray-700 mb-2">Phone Number</label>
          <input v-model="shopForm.phone" type="tel" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50" />
        </div>
        <div>
          <label class="block text-gray-700 mb-2">Address</label>
          <input v-model="shopForm.address" type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50" />
        </div>
        <div>
          <label class="block text-gray-700 mb-2">Email</label>
          <input :value="shopForm.email" type="email" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed text-gray-500" disabled />
        </div>
      </div>
      <button @click="saveShopDetails" class="w-full py-4 mt-6 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg">
        Save Shop Details
      </button>
    </div>

    <!-- Security Card -->
    <div class="bg-white rounded-2xl shadow-md p-6">
      <div class="flex items-center gap-3 mb-4">
        <Lock class="w-6 h-6 text-gray-900" />
        <h2 class="text-xl font-medium text-gray-900">Security</h2>
      </div>
      <p class="text-gray-600 mb-6">Manage your password and security settings</p>
      <div class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-2">Current Password</label>
          <input v-model="securityForm.currentPassword" type="password" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50" />
        </div>
        <div>
          <label class="block text-gray-700 mb-2">New Password</label>
          <input v-model="securityForm.newPassword" type="password" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50" />
        </div>
        <div>
          <label class="block text-gray-700 mb-2">Confirm New Password</label>
          <input v-model="securityForm.confirmPassword" type="password" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50" />
        </div>
      </div>
      <button @click="changePassword" class="w-full py-4 mt-6 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg">
        Change Password
      </button>
    </div>

    <!-- Notifications Card -->
    <div class="bg-white rounded-2xl shadow-md p-6">
      <div class="flex items-center gap-3 mb-4">
        <Bell class="w-6 h-6 text-gray-900" />
        <h2 class="text-xl font-medium text-gray-900">Notifications</h2>
      </div>
      <p class="text-gray-600 mb-6">Configure notification preferences</p>
      <div class="space-y-6">
        <div class="flex items-center justify-between border-b pb-4">
          <div>
            <p class="text-gray-700 font-medium">Low Stock Alerts</p>
            <p class="text-gray-500 text-sm">Get notified when items are running low</p>
          </div>
          <!-- Direct Tailwind Toggle (no component) -->
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="notifications.lowStock" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div class="flex items-center justify-between border-b pb-4">
          <div>
            <p class="text-gray-700 font-medium">Udhar Payment Reminders</p>
            <p class="text-gray-500 text-sm">Remind customers about pending payments</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="notifications.udharReminders" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div class="flex items-center justify-between border-b pb-4">
          <div>
            <p class="text-gray-700 font-medium">Daily Sales Report</p>
            <p class="text-gray-500 text-sm">Receive daily summary of sales</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="notifications.dailySales" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-700 font-medium">Staff Activity Alerts</p>
            <p class="text-gray-500 text-sm">Get notified about staff actions</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="notifications.staffAlerts" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Language & Region Card -->
    <div class="bg-white rounded-2xl shadow-md p-6">
      <div class="flex items-center gap-3 mb-4">
        <Globe class="w-6 h-6 text-gray-900" />
        <h2 class="text-xl font-medium text-gray-900">Language & Region</h2>
      </div>
      <p class="text-gray-600 mb-6">Set your preferred language and currency</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-700 mb-2">Language</label>
          <select v-model="languageRegion.language" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50">
            <option>English</option>
            <option>Urdu</option>
          </select>
        </div>
        <div>
          <label class="block text-gray-700 mb-2">Currency</label>
          <select v-model="languageRegion.currency" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50">
            <option>PKR (₹)</option>
            <option>USD ($)</option>
          </select>
        </div>
      </div>
      <button @click="savePreferences" class="w-full py-4 mt-6 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg">
        Save Preferences
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Store, Lock, Bell, Globe } from 'lucide-vue-next'

const shopForm = ref({
  name: 'My Shop',
  phone: '+92 300 1234567',
  address: '123 Main Street, City',
  email: 'owner@shop.com'
})

const securityForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const notifications = ref({
  lowStock: true,
  udharReminders: false,
  dailySales: false,
  staffAlerts: false
})

const languageRegion = ref({
  language: 'English',
  currency: 'PKR (₹)'
})

const saveShopDetails = () => alert('Shop details saved!')
const changePassword = () => alert('Password changed!')
const savePreferences = () => alert('Preferences saved!')
</script>