<template>
  <div style="padding: 20px">
    <h2>🐶 Pet Form</h2>

    <div style="margin-bottom: 20px">
     <input v-model="form.b_name" placeholder="Breed Name" />
     <input v-model="form.o_country" placeholder="Origin Country" />
     <input v-model="form.buy_date" placeholder="Buy Date (YYYY-MM-DD)" />
     <input v-model.number="form.buy_price" placeholder="Buy Price" />
      <button @click="editIndex === -1 ? createPet() : updatePet()">
        {{ editIndex === -1 ? 'Add Pet' : 'Update Pet' }}
      </button>
    </div>

    <div style="margin-bottom: 10px">
      <button @click="fetchPets">Get All Pets</button>
    </div>

    <PetTable
      :data="pets"
      @edit="editPet"
      @delete="deletePet"
    />

    <div style="margin-top: 20px">
      <h3>🔎 Get Pet by ID</h3>
      <input v-model.number="petId" placeholder="Enter ID" />
      <button @click="getPetById">Get</button>
    </div>

    <p style="color: red; margin-top: 10px">{{ error }}</p>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
// import axios from 'axios'
// import PetTable from '../components/petTable.vue'

// const API = 'http://localhost:3333'
import { ref } from 'vue'
import axios from 'axios'
import PetTable from '../components/petTable.vue'

const API = 'http://localhost:3333'
const API_KEY = '345678ppppppppdfsdfdfsdf' // should match .env APP_KEY in Adonis

// ✅ Set default Authorization header for all axios requests
axios.defaults.headers.common['Authorization'] = API_KEY

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

const fetchPets = async () => {
  try {
    const res = await axios.get(`${API}/pets`)
    pets.value = res.data
    // console.log(res.data)
    error.value = ''
  } catch (err) {
    error.value = err?.response?.data?.message || 'Failed to fetch pets'
  }
}

const createPet = async () => {
  try {
    await axios.post(`${API}/pets`, form.value)
    await fetchPets()
    Object.assign(form.value, { b_name: '', o_country: '', buy_date: '', buy_price: null })
    error.value = ''
  } catch (err) {
    error.value = err?.response?.data?.message || 'Failed to create pet'
  }
}

// const editPet = (index) => {
//   console.log('Editing pet at index:', index)
//   const pet = pets.value[index]
//   Object.assign(form.value, { ...pet })
//   form.value.buy_date = pet.buy_date.split('T')[0]
//   editIndex.value = index
//   currentId.value = pet.p_id
// }

const editPet = (pId) => {
  console.log('Editing pet with ID:', pId)
  const pet = pets.value.find(p => p.pId === pId)
  if (!pet) return

//   Object.assign(form.value, { ...pet })
  Object.assign(form.value, {
    b_name: pet.bName,
    o_country: pet.oCountry,
    buy_date: pet.buyDate,
    buy_price: pet.buyPrice,
  })
  console.log('Form before edit:', form.value)
//   form.value.buyDate = pet.buyDate ? pet.buyDate.split('T')[0] : ''
  editIndex.value = pets.value.findIndex(p => p.pId === pId)
  console.log('Edit index:', editIndex.value)
  currentId.value = pet.pId
  console.log('Current ID after edit:', currentId.value)
  console.log('Form after edit:', form.value)
}


const updatePet = async () => {
  if (!currentId.value) return
  try {
    await axios.put(`${API}/pets/${currentId.value}`, form.value)
    await fetchPets()
    Object.assign(form.value, { b_name: '', o_country: '', buy_date: '', buy_price: null })
    editIndex.value = -1
    currentId.value = null
    error.value = ''
  } catch (err) {
    error.value = err?.response?.data?.message || 'Failed to update pet'
  }
}

const deletePet = async (p_id) => {
  try {
    await axios.delete(`${API}/pets/${p_id}`)
    await fetchPets()
    error.value = ''
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
</script>
