<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-lg">
      <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <!-- Logo/Icon -->
        <div class="flex justify-center mb-10">
          <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-4m-6 0H5a2 2 0 110-4h14a2 2 0 110 4z" />
            </svg>
          </div>
        </div>

        <!-- Heading -->
        <h1 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
          Welcome Back!
        </h1>
        <p class="text-center text-gray-600 mb-10">
          Sign in to manage your shop
        </p>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="your@email.com"
              required
              class="w-full px-5 py-4 bg-gray-100 border-0 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:bg-white transition"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full px-5 py-4 bg-gray-100 border-0 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-70 text-white font-medium py-5 rounded-2xl transition duration-200 shadow-lg hover:shadow-xl"
          >
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <!-- Demo note -->
        <p class="text-center text-sm text-gray-500 mt-8">
          Use any email and password to demo
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

defineOptions({
  name: 'LoginView'
})
const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  loading.value = true
  try {
    // Tere backend API call (replace with your actual URL)
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: email.value,
      password: password.value
    })

    authStore.setToken(response.data.token)
    authStore.setUser(response.data.user)
    router.push('/dashboard')
  } catch (err) {
    alert(err.response?.data?.message || 'Invalid credentials')
  } finally {
    loading.value = false
  }
}
</script>