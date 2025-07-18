
import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed, watchEffect } from 'vue'

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

export const useSaleStore = defineStore('sale', () => {
  // Form and state
  const form = ref({
    c_id: '',
    p_id: '',
    sale_date: '',
    sale_price: null,
  })

  const sales = ref([])
  const saleId = ref(null)
  const error = ref('')
  const editIndex = ref(-1)
  const currentId = ref(null)

  const customerOptions = ref([])
  const petOptions = ref([])

  const fieldErrors = ref({
    c_id: '',
    p_id: '',
    sale_date: '',
    sale_price: '',
  })

  // Search queries
  const customerQuery = ref('')
  const petQuery = ref('')

  // Filter logic
  function filterOptions(options, query, fields) {
    const startsWith = []
    const includes = []
    const nomatch = []
    const q = query.toLowerCase()

    for (const row of options) {
      let matched = false
      for (const field of fields) {
        const cell = String(row[field]).toLowerCase()
        if (cell.startsWith(q)) {
          startsWith.push(row)
          matched = true
          break
        } else if (!matched && cell.includes(q)) {
          includes.push(row)
          matched = true
          break
        }
      }
      if (!matched) nomatch.push(row)
    }

    return [...startsWith, ...includes, ...nomatch]
  }

  // Computed filtered lists
  const filteredCustomers = computed(() =>
    filterOptions(customerOptions.value, customerQuery.value, ['name', 'cId'])
  )

  const filteredPets = computed(() =>
    filterOptions(petOptions.value, petQuery.value, ['bName', 'pId'])
  )

  watchEffect(() => {
  // Forces computed values to track reactively
  filteredCustomers.value
  filteredPets.value
})

  // Validation
  const validateForm = () => {
    fieldErrors.value = {
      c_id: '',
      p_id: '',
      sale_date: '',
      sale_price: '',
    }

    let valid = true

    if (!form.value.c_id) {
      fieldErrors.value.c_id = 'Customer is required.'
      valid = false
    }

    if (!form.value.p_id) {
      fieldErrors.value.p_id = 'Pet is required.'
      valid = false
    }

    if (!form.value.sale_date || isNaN(Date.parse(form.value.sale_date))) {
      fieldErrors.value.sale_date = 'Sale date must be a valid date.'
      valid = false
    }

    const price = Number(form.value.sale_price)
    if (isNaN(price) || price < 1 || price > 100000) {
      fieldErrors.value.sale_price = 'Price must be between 1 and 100000.'
      valid = false
    }

    return valid
  }

  const isFormValid = computed(() => validateForm())

  const resetForm = () => {
    Object.assign(form.value, {
      c_id: '',
      p_id: '',
      sale_date: '',
      sale_price: null,
    })
    editIndex.value = -1
    currentId.value = null
    error.value = ''
    fieldErrors.value = {
      c_id: '',
      p_id: '',
      sale_date: '',
      sale_price: '',
    }
  }

  // CRUD + fetch logic
  const fetchSales = async () => {
    try {
      const res = await axios.get(`${API}/sales`)
      sales.value = res.data
      error.value = ''
    } catch (err) {
      error.value = err?.response?.data?.message || 'Failed to fetch sales'
    }
  }

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${API}/customers`)
      customerOptions.value = res.data
    } catch (err) {
      console.error('Failed to fetch customers')
    }
  }

  const fetchPets = async () => {
    try {
      const res = await axios.get(`${API}/pets`)
      petOptions.value = res.data
    } catch (err) {
      console.error('Failed to fetch pets')
    }
  }

  const createSale = async () => {
    if (!validateForm()) return
    try {
      await axios.post(`${API}/sales`, form.value)
      await fetchSales()
      resetForm()
    } catch (err) {
      error.value = err?.response?.data?.message || 'Failed to create sale'
    }
  }

  const editSale = (row) => {
    Object.assign(form.value, {
      c_id: row.cId,
      p_id: row.pId,
      sale_date: row.saleDate,
      sale_price: row.salePrice,
    })

    editIndex.value = sales.value.findIndex((s) => s.sid === row.sid)
    currentId.value = row.sid
  }

  const updateSale = async () => {
    if (!validateForm()) return
    try {
      await axios.put(`${API}/sales/${currentId.value}`, form.value)
      await fetchSales()
      resetForm()
    } catch (err) {
      error.value = err?.response?.data?.message || 'Failed to update sale'
    }
  }

  const deleteSale = async (row) => {
    try {
      await axios.delete(`${API}/sales/${row.sid}`)
      await fetchSales()
    } catch (err) {
      error.value = err?.response?.data?.message || 'Failed to delete sale'
    }
  }

  const getSaleById = async () => {
    if (!saleId.value) return
    try {
      const res = await axios.get(`${API}/sales/${saleId.value}`)
      sales.value = [res.data]
      error.value = ''
    } catch (err) {
      error.value = err?.response?.data?.message || 'Sale not found'
    }
  }

  return {
    form,
    sales,
    saleId,
    error,
    editIndex,
    currentId,
    fieldErrors,
    customerOptions,
    petOptions,
    customerQuery,
    petQuery,
    filteredCustomers,
    filteredPets,
    isFormValid,
    fetchSales,
    createSale,
    editSale,
    updateSale,
    deleteSale,
    getSaleById,
    resetForm,
    fetchCustomers,
    fetchPets,
  }
})

