// stores/petStore.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'

const API = import.meta.env.VITE_ADONIS_API_URL
const API_KEY = import.meta.env.VITE_AUTH_TOKEN
// Restore JWT token on app load
const token = localStorage.getItem('jwt_token')

if (!API_KEY ) {
  console.error('Missing API key , Authentication will fail.')
}
if (!token) {
  console.error('Missing JWT token , Authentication will fail.')
}

axios.defaults.headers.common['x-api-key'] = API_KEY
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

export const usePetStore = defineStore('pet', () => {
  const form = ref({
    b_name: '',
    o_country: '',
    buy_date: '',
    buy_price: null,
  })

  const pets = ref([])
  const petId = ref(null)
  const error = ref('')
  const editIndex = ref(-1)
  const currentId = ref(null)

  const fieldErrors = ref({
    b_name: '',
    o_country: '',
    buy_date: '',
    buy_price: ''
  })

  const validateForm = () => {
    fieldErrors.value = {
      b_name: '',
      o_country: '',
      buy_date: '',
      buy_price: ''
    }

    let valid = true

    if (!form.value.b_name || typeof form.value.b_name !== 'string') {
      fieldErrors.value.b_name = 'Breed name must be a string!'
      valid = false
    } else if (form.value.b_name.trim().length < 2) {
      fieldErrors.value.b_name = 'Breed name must be at least 2 characters.'
      valid = false
    } else if (form.value.b_name.length > 50) {
      fieldErrors.value.b_name = 'Breed name must be at most 50 characters.'
      valid = false
    }

    if (!form.value.o_country || typeof form.value.o_country !== 'string') {
      fieldErrors.value.o_country = 'Origin country must be a string!'
      valid = false
    } else if (form.value.o_country.trim().length < 2) {
      fieldErrors.value.o_country = 'Origin country must be at least 2 characters.'
      valid = false
    } else if (form.value.o_country.length > 50) {
      fieldErrors.value.o_country = 'Origin country must be at most 50 characters.'
      valid = false
    }

    if (!form.value.buy_date || isNaN(Date.parse(form.value.buy_date))) {
      fieldErrors.value.buy_date = 'Purchase date must be a valid date.'
      valid = false
    }

    const price = Number(form.value.buy_price)
    if (isNaN(price)) {
      fieldErrors.value.buy_price = 'Price must be a number.'
      valid = false
    } else if (price < 1 || price > 100000) {
      fieldErrors.value.buy_price = 'Price must be between 1 and 100000.'
      valid = false
    }

    return valid
  }

  const isFormValid = computed(() => validateForm())

  const resetForm = () => {
    Object.assign(form.value, {
      b_name: '',
      o_country: '',
      buy_date: '',
      buy_price: null,
    })
    editIndex.value = -1
    currentId.value = null
    error.value = ''
    fieldErrors.value = {
      b_name: '',
      o_country: '',
      buy_date: '',
      buy_price: ''
    }
  }

  const fetchPets = async () => {
    try {
      const res = await axios.get(`${API}/pets`)
      pets.value = res.data
      error.value = ''
    } catch (err) {
      error.value = err?.response?.data?.message || 'Failed to fetch pets'
    }
  }

  const createPet = async () => {
    if (!validateForm()) return
    try {
      await axios.post(`${API}/pets`, form.value)
      await fetchPets()
      resetForm()
    } catch (err) {
      error.value = err?.response?.data?.message || 'Failed to create pet'
    }
  }

  const editPet = (row) => {
    const pet = pets.value.find(p => p.pId === row.pId)
    if (!pet) return

    Object.assign(form.value, {
      b_name: pet.bName,
      o_country: pet.oCountry,
      buy_date: pet.buyDate,
      buy_price: pet.buyPrice,
    })

    editIndex.value = pets.value.findIndex(p => p.pId === pId)
    currentId.value = pet.pId
  }

  const updatePet = async () => {
    if (!validateForm()) return
    try {
      await axios.put(`${API}/pets/${currentId.value}`, form.value)
      await fetchPets()
      resetForm()
    } catch (err) {
      error.value = err?.response?.data?.message || 'Failed to update pet'
    }
  }

  const deletePet = async (row) => {
    try {
      await axios.delete(`${API}/pets/${row.pId}`)
      await fetchPets()
    } catch (err) {
      error.value = err?.response?.data?.message || 'Failed to delete pet'
    }
  }

  const getPetById = async () => {
    if (!petId.value) return
    try {
      const res = await axios.get(`${API}/pets/${petId.value}`)
      pets.value = [res.data]
      error.value = ''
    } catch (err) {
      error.value = err?.response?.data?.message || 'Pet not found'
    }
  }

  return {
    form,
    pets,
    petId,
    error,
    editIndex,
    currentId,
    fieldErrors,
    isFormValid,
    fetchPets,
    createPet,
    editPet,
    updatePet,
    deletePet,
    getPetById,
    resetForm,
  }
})
