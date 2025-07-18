// stores/home.ts
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useHomeStore = defineStore('home', () => {
  const router = useRouter()

  function logout() {
    localStorage.removeItem('jwt_token') // 🔐 Remove JWT token
    router.push('/')           // ⛳ Redirect to signup page
  }

  return {
    logout,
  }
})
