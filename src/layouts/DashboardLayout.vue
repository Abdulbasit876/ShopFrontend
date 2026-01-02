<template>
  <div class="h-screen flex overflow-hidden bg-gray-50">
    <aside class="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <SidebarContent @logout="logout" />
    </aside>
    <div class="flex-1 flex flex-col">
      <header class="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <span class="font-bold text-lg">My Shop</span>
        <button @click="mobileMenuOpen = true" class="text-2xl">
          ☰
        </button>
      </header>
      <main class="flex-1 w-full overflow-y-auto p-6 lg:p-10">
        <router-view />
      </main>
    </div>

    <!-- Mobile Sidebar Drawer - Click hamburger to open -->
    <transition name="slide">
      <div v-if="mobileMenuOpen" class="md:hidden fixed inset-0 z-50 flex">
        <!-- Overlay - click to close -->
        <div class="fixed inset-0 bg-black/50" @click="mobileMenuOpen = false"></div>
        
        <!-- Sidebar Drawer -->
        <aside class="relative w-64 bg-white flex flex-col">
          <SidebarContent @logout="logout" />
          
          <!-- Close button inside drawer -->
          <button 
            @click="mobileMenuOpen = false" 
            class="absolute top-4 right-4 p-2 bg-gray-100 rounded-lg"
          >
            ✕
          </button>
        </aside>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SidebarContent from '@/components/SidebarContent.vue'

const mobileMenuOpen = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}
</style>