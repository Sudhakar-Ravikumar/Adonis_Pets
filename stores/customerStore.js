import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
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

export const useCustomerStore = defineStore('customer', () => {
  const form = ref({
    name: '',
    place: '',
    phone_no: '',
  })

  const customers = ref([])
  const customerId = ref(null)
  const error = ref('')
  const editIndex = ref(-1)
  const currentId = ref(null)

  const fieldErrors = ref({
    name: '',
    place: '',
    phone_no: ''
  })

  const validateForm = () => {
    fieldErrors.value = { name: '', place: '', phone_no: '' }
    let valid = true

    if (!form.value.name || form.value.name.trim().length < 2) {
      fieldErrors.value.name = 'Customer name must be at least 2 characters.'
      valid = false
    } else if (form.value.name.length > 100) {
      fieldErrors.value.name = 'Customer name must be at most 100 characters.'
      valid = false
    }

    if (!form.value.place || form.value.place.trim().length < 2) {
      fieldErrors.value.place = 'Place must be at least 2 characters.'
      valid = false
    } else if (form.value.place.length > 100) {
      fieldErrors.value.place = 'Place must be at most 100 characters.'
      valid = false
    }

    if (!/^\d{10}$/.test(form.value.phone_no)) {
      fieldErrors.value.phone_no = 'Phone number must be a valid 10-digit number.'
      valid = false
    }

    return valid
  }

  const isFormValid = computed(() => validateForm())

  const resetForm = () => {
    Object.assign(form.value, {
      name: '',
      place: '',
      phone_no: '',
    })
    editIndex.value = -1
    currentId.value = null
    error.value = ''
    fieldErrors.value = { name: '', place: '', phone_no: '' }
  }

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${API}/customers`)
      customers.value = res.data
      error.value = ''
    } catch (err) {
      error.value = err?.response?.data?.message || 'Failed to fetch customers'
    }
  }

  const createCustomer = async () => {
    if (!validateForm()) return
    try {
      await axios.post(`${API}/customers`, form.value)
      await fetchCustomers()
      resetForm()
    } catch (err) {
      error.value = err?.response?.data?.message || 'Failed to create customer'
    }
  }

  const editCustomer = (row) => {
    const customer = customers.value.find(c => c.cId === row.cId)
    if (!customer) return

    Object.assign(form.value, {
      name: customer.name,
      place: customer.place,
      phone_no: customer.phoneNo,
    })

    editIndex.value = customers.value.findIndex(c => c.cId === row.cId)
    currentId.value = customer.cId
  }

  const updateCustomer = async () => {
    if (!validateForm()) return
    try {
      await axios.put(`${API}/customers/${currentId.value}`, form.value)
      await fetchCustomers()
      resetForm()
    } catch (err) {
      error.value = err?.response?.data?.message || 'Failed to update customer'
    }
  }

  const deleteCustomer = async (row) => {
    try {
      await axios.delete(`${API}/customers/${row.cId}`)
      await fetchCustomers()
    } catch (err) {
      error.value = err?.response?.data?.message || 'Failed to delete customer'
    }
  }

  const getCustomerById = async () => {
    if (!customerId.value) return
    try {
      const res = await axios.get(`${API}/customers/${customerId.value}`)
      customers.value = [res.data]
      error.value = ''
    } catch (err) {
      error.value = err?.response?.data?.message || 'Customer not found'
    }
  }

  return {
    form,
    customers,
    customerId,
    error,
    editIndex,
    currentId,
    fieldErrors,
    isFormValid,
    fetchCustomers,
    createCustomer,
    editCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
    resetForm,
  }
})
