// // stores/loginStore.js
// import { defineStore } from 'pinia'
// import { ref } from 'vue'
// import axios from 'axios'

// const API = import.meta.env.VITE_ADONIS_API_URL
// const API_KEY = import.meta.env.VITE_AUTH_TOKEN

// axios.defaults.headers.common['Authorization'] = API_KEY

// export const useLoginStore = defineStore('login', () => {
//   const form = ref({
//     username: '',
//     password: '',
//   })

//   const fieldErrors = ref({
//     username: '',
//     password: '',
//   })

//   const error = ref('')
//   const message = ref('')
//   const user = ref(null)

//   const validateForm = () => {
//     fieldErrors.value = {
//       username: '',
//       password: '',
//     }

//     let valid = true

//     if (!form.value.username || typeof form.value.username !== 'string') {
//       fieldErrors.value.username = 'Username must be a string!'
//       valid = false
//     } else if (form.value.username.trim().length < 4) {
//       fieldErrors.value.username = 'Username must be at least 4 characters.'
//       valid = false
//     } else if (form.value.username.length > 20) {
//       fieldErrors.value.username = 'Username must be at most 20 characters.'
//       valid = false
//     }

//     if (!form.value.password || typeof form.value.password !== 'string') {
//       fieldErrors.value.password = 'Password must be a string!'
//       valid = false
//     } else if (form.value.password.trim().length < 6) {
//       fieldErrors.value.password = 'Password must be at least 6 characters.'
//       valid = false
//     }

//     return valid
//   }

//   const login = async () => {
//     if (!validateForm()) return

//     try {
//       const res = await axios.post(`${API}/login`, form.value)
//       user.value = res.data.user
//       message.value = res.data.message || 'Login successful'
//       error.value = ''
//     } catch (err) {
//       error.value = err?.response?.data?.message || 'Login failed'
//       message.value = ''
//     }
//   }

//   const resetForm = () => {
//     form.value = {
//       username: '',
//       password: '',
//     }
//     fieldErrors.value = {
//       username: '',
//       password: '',
//     }
//     message.value = ''
//     error.value = ''
//     user.value = null
//   }

//   return {
//     form,
//     fieldErrors,
//     error,
//     message,
//     user,
//     login,
//     resetForm,
//   }
// })


import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import axios from 'axios'

// Restore JWT token on app load
// const token = localStorage.getItem('jwt_token')

const API = import.meta.env.VITE_ADONIS_API_URL
const API_KEY = import.meta.env.VITE_AUTH_TOKEN

// if (!API_KEY || !JWT) {
//   console.error('Missing API key or JWT token. Authentication will fail.')
// }
if (!API_KEY ) {
  console.error('Missing API key , Authentication will fail.')
}

// ✅ Set both headers unconditionally
axios.defaults.headers.common['x-api-key'] = API_KEY
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

export const useLoginStore = defineStore('login', () => {
  const form = ref({
    username: '',
    password: '',
  })

  const fieldErrors = ref({
    username: '',
    password: '',
  })

  const error = ref('')
  const message = ref('')
  const user = ref(null)
  const isRedirecting = ref(false)

  // ✅ Field validation function
  const validateForm = () => {
    fieldErrors.value = {
      username: '',
      password: '',
    }

    let valid = true

    if (!form.value.username || typeof form.value.username !== 'string') {
      fieldErrors.value.username = 'Username must be a string!'
      valid = false
    } else if (form.value.username.trim().length < 4) {
      fieldErrors.value.username = 'Username must be at least 4 characters.'
      valid = false
    } else if (form.value.username.length > 20) {
      fieldErrors.value.username = 'Username must be at most 20 characters.'
      valid = false
    }

    if (!form.value.password || typeof form.value.password !== 'string') {
      fieldErrors.value.password = 'Password must be a string!'
      valid = false
    } else if (form.value.password.trim().length < 6) {
      fieldErrors.value.password = 'Password must be at least 6 characters.'
      valid = false
    }

    return valid
  }

  // ✅ Live validation on every input
  watch(form, () => {
    validateForm()
  }, { deep: true })

  // ✅ Initial validation on load
  validateForm()

const login = async (router) => { 
  if (!validateForm()) return

  try {
    const res = await axios.post(`${API}/login`, form.value)
    user.value = res.data.user
    message.value = res.data.message || 'Login successful'
    error.value = ''
    isRedirecting.value = true

    // ✅ Store the token
    localStorage.setItem('jwt_token', res.data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`

    form.value = {
      username: '',
      password: '',
    }
    fieldErrors.value = {
      username: '',
      password: '',
    }
    // ✅ Redirect after 3 seconds
      setTimeout(() => {
        router.push('/home')
      }, 3000)
       setTimeout(() => {
        resetForm()
      }, 3000)

  } catch (err) {
    error.value = err?.response?.data?.message || 'Login failed'
    message.value = ''
    isRedirecting.value = false
    
  }
}



  const resetForm = () => {
    form.value = {
      username: '',
      password: '',
    }
    fieldErrors.value = {
      username: '',
      password: '',
    }
    message.value = ''
    error.value = ''
    user.value = null
    isRedirecting.value = false

    validateForm() // ✅ Re-validate empty state after reset
  }

  return {
    form,
    fieldErrors,
    error,
    message,
    user,
    login,
    resetForm,
    isRedirecting
  }
})
