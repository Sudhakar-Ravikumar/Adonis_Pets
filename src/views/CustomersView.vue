<template>
  <div style="padding: 20px">
    <h2 style="font-size: 24px; margin-bottom: 20px">👤 Customer Form</h2>

    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 700px">
      <div class="form-row">
        <label>Name:</label>
        <input v-model="customerStore.form.name" placeholder="Customer Name" />
        <span v-if="customerStore.fieldErrors.name" class="error-msg">{{ customerStore.fieldErrors.name }}</span>
      </div>

      <div class="form-row">
        <label>Place:</label>
        <input v-model="customerStore.form.place" placeholder="Place" />
        <span v-if="customerStore.fieldErrors.place" class="error-msg">{{ customerStore.fieldErrors.place }}</span>
      </div>

      <div class="form-row">
        <label>Phone Number:</label>
        <input v-model="customerStore.form.phone_no" placeholder="Phone Number" />
        <span v-if="customerStore.fieldErrors.phone_no" class="error-msg">{{ customerStore.fieldErrors.phone_no }}</span>
      </div>

      <div style="margin-top: 10px">
        <button
          :disabled="!customerStore.isFormValid"
          @click="customerStore.editIndex === -1 ? customerStore.createCustomer() : customerStore.updateCustomer()"
        >
          {{ customerStore.editIndex === -1 ? 'Add Customer' : 'Update Customer' }}
        </button>
        <button @click="customerStore.resetForm" style="margin-left: 10px">Reset</button>
      </div>
    </div>

    <div style="margin-top: 20px">
      <button @click="customerStore.fetchCustomers">Get All Customers</button>
    </div>

    <PetTable
  :data="customerStore.customers"
  @edit="customerStore.editCustomer"
  @delete="customerStore.deleteCustomer"
  />


    <div style="margin-top: 30px">
      <h3>🔎 Get Customer by ID</h3>
      <input v-model.number="customerStore.customerId" placeholder="Enter ID" />
      <button @click="customerStore.getCustomerById">Get</button>
    </div>

    <p v-if="customerStore.error" style="color: red; margin-top: 10px">
      ⚠️ {{ customerStore.error }}
    </p>
  </div>
</template>

<script setup>
import { useCustomerStore } from '../../stores/customerStore'
import PetTable from '../components/petTable.vue'


const customerStore = useCustomerStore()
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
