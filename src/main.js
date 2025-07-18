import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

// ✅ Add dynamic body class logic here
router.beforeEach((to, from, next) => {
  document.body.className = '' // clear any previous class

  // Apply a specific class based on the route path
  if (to.path === '/pets') {
    document.body.classList.add('bg-pets')
  } else if (to.path === '/customers') {
    document.body.classList.add('bg-customers')
  } else if (to.path === '/sales') {
    document.body.classList.add('bg-sales')
  } else {
    document.body.classList.add('bg-default') // fallback for home or others
  }

  next()
})

app.mount('#app')
