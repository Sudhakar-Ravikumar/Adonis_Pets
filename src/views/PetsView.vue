<template>
  <div style="padding: 20px">
    <h2 style="font-size: 24px; margin-bottom: 20px">🐶 Pet Form</h2>

    <!-- 🐾 Pet Input Form -->
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 700px">

      <div class="form-row">
        <label>Breed Name:</label>
        <input v-model="petStore.form.b_name" placeholder="Breed Name" />
        <span v-if="petStore.fieldErrors.b_name" class="error-msg">{{ petStore.fieldErrors.b_name }}</span>
      </div>

      <div class="form-row">
        <label>Origin Country:</label>
        <input v-model="petStore.form.o_country" placeholder="Origin Country" />
        <span v-if="petStore.fieldErrors.o_country" class="error-msg">{{ petStore.fieldErrors.o_country }}</span>
      </div>

      <div class="form-row">
        <label>Buy Date:</label>
        <input v-model="petStore.form.buy_date" placeholder="YYYY-MM-DD" />
        <span v-if="petStore.fieldErrors.buy_date" class="error-msg">{{ petStore.fieldErrors.buy_date }}</span>
      </div>

      <div class="form-row">
        <label>Buy Price:</label>
        <input v-model.number="petStore.form.buy_price" placeholder="Buy Price" />
        <span v-if="petStore.fieldErrors.buy_price" class="error-msg">{{ petStore.fieldErrors.buy_price }}</span>
      </div>

      <div style="margin-top: 10px">
        <button
          :disabled="!petStore.isFormValid"
          @click="petStore.editIndex === -1 ? petStore.createPet() : petStore.updatePet()"
        >
          {{ petStore.editIndex === -1 ? 'Add Pet' : 'Update Pet' }}
        </button>
        <button @click="petStore.resetForm" style="margin-left: 10px">Reset</button>
      </div>
    </div>

    <!-- 🔁 Get All Pets -->
    <div style="margin-top: 20px">
      <button @click="petStore.fetchPets">Get All Pets</button>
    </div>

    <!-- 📋 Pet Table -->
    <PetTable
      :data="petStore.pets"
      @edit="petStore.editPet"
      @delete="petStore.deletePet"
    />

    <!-- 🔍 Get Pet by ID -->
    <div style="margin-top: 30px">
      <h3>🔎 Get Pet by ID</h3>
      <input v-model.number="petStore.petId" placeholder="Enter ID" />
      <button @click="petStore.getPetById">Get</button>
    </div>

    <!-- ⚠️ Error -->
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

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 40px;
}

label {
  width: 130px;
  font-weight: bold;
}

input {
  flex: 1;
  padding: 5px;
}

.error-msg {
  color: red;
  font-size: 0.9em;
  white-space: nowrap;
}
</style>
