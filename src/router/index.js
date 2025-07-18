import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PetForm from '../views/PetsView.vue'
import CustomerForm from '../views/CustomersView.vue'
import SaleForm from '../views/SalesView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/signupView.vue'


const routes = [
  { path: '/', component: SignupView },
  { path: '/login', component: LoginView },
  { path: '/home', component: HomeView , meta: { requiresAuth: true }},
  {
    path: '/pets',
    component: PetForm,
    meta: { requiresAuth: true } // 👈 protected
  },
  {
    path: '/customers',
    component: CustomerForm,
    meta: { requiresAuth: true } // 👈 protected
  },
  {
    path: '/sales',
    component: SaleForm,
    meta: { requiresAuth: true } // 👈 protected
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Global guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwt_token') // 👈 check JWT token

  // Protect routes that need auth
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  next()
})

export default router
