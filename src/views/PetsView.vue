<template>
  <div style="padding: 20px">
    <h2>🐶 Pet Form</h2>

    <div style="margin-bottom: 20px">
      <input v-model="petStore.form.b_name" placeholder="Breed Name" />
      <p v-if="petStore.fieldErrors.b_name" style="color: red">{{ petStore.fieldErrors.b_name }}</p>

      <input v-model="petStore.form.o_country" placeholder="Origin Country" />
      <p v-if="petStore.fieldErrors.o_country" style="color: red">{{ petStore.fieldErrors.o_country }}</p>

      <input v-model="petStore.form.buy_date" placeholder="Buy Date (YYYY-MM-DD)" />
      <p v-if="petStore.fieldErrors.buy_date" style="color: red">{{ petStore.fieldErrors.buy_date }}</p>

      <input v-model.number="petStore.form.buy_price" placeholder="Buy Price" />
      <p v-if="petStore.fieldErrors.buy_price" style="color: red">{{ petStore.fieldErrors.buy_price }}</p>

      <button
        :disabled="!petStore.isFormValid"
        @click="petStore.editIndex === -1 ? petStore.createPet() : petStore.updatePet()"
      >
        {{ petStore.editIndex === -1 ? 'Add Pet' : 'Update Pet' }}
      </button>
    </div>

    <div style="margin-bottom: 10px">
      <button @click="petStore.fetchPets">Get All Pets</button>
      <button @click="petStore.resetForm">Reset</button>
    </div>

    <PetTable
      :data="petStore.pets"
      @edit="petStore.editPet"
      @delete="petStore.deletePet"
    />

    <div style="margin-top: 20px">
      <h3>🔎 Get Pet by ID</h3>
      <input v-model.number="petStore.petId" placeholder="Enter ID" />
      <button @click="petStore.getPetById">Get</button>
    </div>

    <p v-if="petStore.error" style="color: red; margin-top: 10px">
      ⚠️ {{ petStore.error }}
    </p>
  </div>
</template>

<script setup>
import { usePetStore } from '../../stores/petStore'
import PetTable from '../components/petTable.vue'

const petStore = usePetStore()
</script>
