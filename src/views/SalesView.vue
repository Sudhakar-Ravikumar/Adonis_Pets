 
  <template>
  <div style="padding: 20px">
    <h2 style="font-size: 24px; margin-bottom: 20px">💰 Sale Form</h2>

    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 700px">
     
      <div class="form-row">
        <label>Customer:</label>
        <div style="flex: 1">
          <input v-model="saleStore.customerQuery" placeholder="Search Customer..." />
          <select v-model="saleStore.form.c_id">
            <option value="">-- Select Customer --</option>
            <option
              v-for="c in saleStore.filteredCustomers"
              :key="c.cId"
              :value="c.cId"
            >
              {{ c.name }} (ID: {{ c.cId }})
            </option>
          </select>
        </div>
        <span v-if="saleStore.fieldErrors.c_id" class="error-msg">
          {{ saleStore.fieldErrors.c_id }}
        </span>
      </div>

     
      <div class="form-row">
        <label>Pet:</label>
        <div style="flex: 1">
          <input v-model="saleStore.petQuery" placeholder="Search Pet..." />
          <select v-model="saleStore.form.p_id">
            <option value="">-- Select Pet --</option>
            <option
              v-for="p in saleStore.filteredPets"
              :key="p.pId"
              :value="p.pId"
            >
              {{ p.bName }} (ID: {{ p.pId }})
            </option>
          </select>
        </div>
        <span v-if="saleStore.fieldErrors.p_id" class="error-msg">
          {{ saleStore.fieldErrors.p_id }}
        </span>
      </div>

    
      <div class="form-row">
        <label>Sale Date:</label>
        <input v-model="saleStore.form.sale_date" placeholder="YYYY-MM-DD" />
        <span v-if="saleStore.fieldErrors.sale_date" class="error-msg">
          {{ saleStore.fieldErrors.sale_date }}
        </span>
      </div>

      <!-- Sale Price -->
       <div class="form-row">
        <label>Sale Price:</label>
        <input v-model.number="saleStore.form.sale_price" placeholder="Sale Price" />
        <span v-if="saleStore.fieldErrors.sale_price" class="error-msg">
          {{ saleStore.fieldErrors.sale_price }}
        </span>
      </div> 

      <!-- Buttons -->
      <div style="margin-top: 10px">
        <button
          :disabled="!saleStore.isFormValid"
          @click="saleStore.editIndex === -1 ? saleStore.createSale() : saleStore.updateSale()"
        >
          {{ saleStore.editIndex === -1 ? 'Add Sale' : 'Update Sale' }}
        </button>
        <button @click="saleStore.resetForm" style="margin-left: 10px">Reset</button>
      </div>
    </div>


    <div style="margin-top: 20px">
      <button @click="saleStore.fetchSales">Get All Sales</button>
    </div>

    <PetTable
      :data="saleStore.sales"
      @edit="saleStore.editSale"
      @delete="saleStore.deleteSale"
    /> 


     <div style="margin-top: 30px">
      <h3>🔎 Get Sale by ID</h3>
      <input v-model.number="saleStore.saleId" placeholder="Enter ID" />
      <button @click="saleStore.getSaleById">Get</button>
    </div>

    <p v-if="saleStore.error" style="color: red; margin-top: 10px">
      ⚠️ {{ saleStore.error }}
    </p>
  </div>
</template>

<script setup>
import { useSaleStore } from '../../stores/saleStore'
import PetTable from '../components/petTable.vue'

const saleStore = useSaleStore()
saleStore.fetchCustomers()
saleStore.fetchPets()
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 40px;
  flex-wrap: wrap;
}

label {
  width: 130px;
  font-weight: bold;
}

input,
select {
  flex: 1;
  padding: 5px;
}

.error-msg {
  color: red;
  font-size: 0.9em;
  white-space: nowrap;
}
</style> 



  