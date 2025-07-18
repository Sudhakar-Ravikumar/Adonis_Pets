// // stores/signupStore.js
// import { defineStore } from 'pinia'
// import { ref } from 'vue'
// import axios from 'axios'

// const API = import.meta.env.VITE_ADONIS_API_URL
// const API_KEY = import.meta.env.VITE_AUTH_TOKEN

// axios.defaults.headers.common['Authorization'] = API_KEY

// export const useSignupStore = defineStore('signup', () => {
//   const form = ref({
//     username: '',
//     password: '',
//     password_confirmation: '',
//   })

//   const fieldErrors = ref({
//     username: '',
//     password: '',
//     password_confirmation: '',
//   })

//   const error = ref('')
//   const message = ref('')
//   const user = ref(null)

//   const validateForm = () => {
//     fieldErrors.value = {
//       username: '',
//       password: '',
//       password_confirmation: '',
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

//     if (form.value.password !== form.value.password_confirmation) {
//       fieldErrors.value.password_confirmation = 'Passwords do not match.'
//       valid = false
//     }

//     return valid
//   }

//   const signup = async () => {
//     if (!validateForm()) return

//     try {
//       const res = await axios.post(`${API}/signup`, form.value)
//       user.value = res.data.user
//       message.value = res.data.message || 'Signup successful'
//       error.value = ''
//     } catch (err) {
//       error.value = err?.response?.data?.message || 'Signup failed'
//       message.value = ''
//     }
//   }

//   const resetForm = () => {
//     form.value = {
//       username: '',
//       password: '',
//       password_confirmation: '',
//     }
//     fieldErrors.value = {
//       username: '',
//       password: '',
//       password_confirmation: '',
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
//     signup,
//     resetForm,
//   }
// })


import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import axios from 'axios'

const API = import.meta.env.VITE_ADONIS_API_URL
const API_KEY = import.meta.env.VITE_AUTH_TOKEN

if (!API_KEY) {
  console.error('Missing API key. Authentication will fail.')
}

axios.defaults.headers.common['x-api-key'] = API_KEY

export const useSignupStore = defineStore('signup', () => {
  const form = ref({
    username: '',
    password: '',
    password_confirmation: '',
  })

  const fieldErrors = ref({
    username: '',
    password: '',
    password_confirmation: '',
  })

  const error = ref('')
  const message = ref('')
  const user = ref(null)
  const isRedirecting = ref(false)

  const validateForm = () => {
    fieldErrors.value = {
      username: '',
      password: '',
      password_confirmation: '',
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

    if (form.value.password !== form.value.password_confirmation) {
      fieldErrors.value.password_confirmation = 'Passwords do not match.'
      valid = false
    }

    return valid
  }

  watch(form, () => {
    validateForm()
  }, { deep: true })

  validateForm()

  const signup = async (router) => {
    if (!validateForm()) return

    try {
      const res = await axios.post(`${API}/signup`, form.value)
      user.value = res.data.user
      message.value = res.data.message || 'Signup successful!'
      error.value = ''
      isRedirecting.value = true

      form.value = {
        username: '',
        password: '',
        password_confirmation: '',
      }
      fieldErrors.value = {
        username: '',
        password: '',
        password_confirmation: '',
      }
    
      // ✅ Redirect after 3 seconds
      setTimeout(() => {
        router.push('/login')
      }, 3000)
      setTimeout(() => {
        resetForm()
      }, 3000)

      

    } catch (err) {
      error.value = err?.response?.data?.message || 'Signup failed'
      message.value = ''
      isRedirecting.value = false
    }
  }

  const resetForm = () => {
    form.value = {
      username: '',
      password: '',
      password_confirmation: '',
    }
    fieldErrors.value = {
      username: '',
      password: '',
      password_confirmation: '',
    }
    message.value = ''
    error.value = ''
    user.value = null
    isRedirecting.value = false

    validateForm()
  }

  return {
    form,
    fieldErrors,
    error,
    message,
    user,
    signup,
    resetForm,
    isRedirecting
  }
})
