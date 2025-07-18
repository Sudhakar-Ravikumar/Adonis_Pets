<!-- <template>
  <div style="padding: 20px">
    <h2 style="font-size: 24px; margin-bottom: 20px">🔐 Login</h2>

    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px">

      <div class="form-row">
        <label>Username:</label>
        <input v-model="loginStore.form.username" placeholder="Username" />
        <span v-if="loginStore.fieldErrors.username" class="error-msg">
          {{ loginStore.fieldErrors.username }}
        </span>
      </div>

      <div class="form-row">
        <label>Password:</label>
        <input type="password" v-model="loginStore.form.password" placeholder="Password" />
        <span v-if="loginStore.fieldErrors.password" class="error-msg">
          {{ loginStore.fieldErrors.password }}
        </span>
      </div>

      <div>
        <button @click="loginStore.login">Login</button>
        <button @click="loginStore.resetForm" style="margin-left: 10px">Reset</button>
      </div>

      <p v-if="loginStore.message" style="color: green">
        ✅ {{ loginStore.message }}
      </p>
      <p v-if="loginStore.error" style="color: red">
        ❌ {{ loginStore.error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from '/stores/loginStore'
const loginStore = useLoginStore()
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 40px;
}

label {
  width: 120px;
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
</style> -->


<template>
  <div style="padding: 20px">
    <h2 style="font-size: 24px; margin-bottom: 20px">🔐 Login</h2>

    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px">
      <!-- Username -->
      <div class="form-row">
        <label>Username:</label>
        <input v-model="loginStore.form.username" placeholder="Username" />
        <span v-if="loginStore.fieldErrors.username" class="error-msg">
          {{ loginStore.fieldErrors.username }}
        </span>
      </div>

      <!-- Password -->
      <div class="form-row">
        <label>Password:</label>
        <input type="password" v-model="loginStore.form.password" placeholder="Password" />
        <span v-if="loginStore.fieldErrors.password" class="error-msg">
          {{ loginStore.fieldErrors.password }}
        </span>
      </div>

      <!-- Buttons -->
      <div>
        <button @click="loginStore.login(router)"
        :disabled="loginStore.isRedirecting || hasErrors"> Login </button>
        <button @click="loginStore.resetForm" style="margin-left: 10px">Reset</button>
      </div>

      <!-- Success and Error Messages -->
      <p v-if="loginStore.message" style="color: green">
        ✅ {{ loginStore.message }} Redirecting to home...
      </p>
      <p v-if="loginStore.error" style="color: red">
        ❌ {{ loginStore.error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { computed } from 'vue'

const hasErrors = computed(() => {
  return Object.values(loginStore.fieldErrors).some(error => error)
})

import { useLoginStore } from '/stores/loginStore'
const loginStore = useLoginStore()
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 40px;
}

label {
  width: 120px;
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
