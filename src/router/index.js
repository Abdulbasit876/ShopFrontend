import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
// import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },

  {
    path: '/',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },

      { path: 'dashboard', component: () => import('@/views/Dashboard.vue') },
      { path: 'inventory', component: () => import('@/views/Inventory.vue') },
      { path: 'sales', component: () => import('@/views/sales/Sales.vue') },
      { path: 'udhar', component: () => import('@/views/Udhar.vue') },
      { path: 'customers', component: () => import('@/views/Customers.vue') },
      { path: 'reports', component: () => import('@/views/Reports.vue') },
      { path: 'settings', component: () => import('@/views/Settings.vue') },
      {path:'payment' , component: () => import('@/views/sales/proceedToPayment.vue')},
    ],
  },

  {
    path: '/:catchAll(.*)',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/* ✅ AUTH GUARD */
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()

//   if (to.meta.requiresAuth && !authStore.isLoggedIn) {
//     next('/login') // protected page → login
//   } else if (to.path === '/login' && authStore.isLoggedIn) {
//     next('/dashboard') // already login → dashboard
//   } else {
//     next()
//   }
// })

export default router
