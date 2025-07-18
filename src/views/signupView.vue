<!-- <template>
  <div style="padding: 20px">
    <h2 style="font-size: 24px; margin-bottom: 20px">📝 Signup</h2>

    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px">

      <div class="form-row">
        <label>Username:</label>
        <input v-model="signupStore.form.username" placeholder="Username" />
        <span v-if="signupStore.fieldErrors.username" class="error-msg">
          {{ signupStore.fieldErrors.username }}
        </span>
      </div>

      <div class="form-row">
        <label>Password:</label>
        <input type="password" v-model="signupStore.form.password" placeholder="Password" />
        <span v-if="signupStore.fieldErrors.password" class="error-msg">
          {{ signupStore.fieldErrors.password }}
        </span>
      </div>

      <div class="form-row">
        <label>Confirm Password:</label>
        <input type="password" v-model="signupStore.form.password_confirmation" placeholder="Confirm Password" />
        <span v-if="signupStore.fieldErrors.password_confirmation" class="error-msg">
          {{ signupStore.fieldErrors.password_confirmation }}
        </span>
      </div>

      <div>
        <button @click="signupStore.signup">Signup</button>
        <button @click="signupStore.resetForm" style="margin-left: 10px">Reset</button>
      </div>

      <p v-if="signupStore.message" style="color: green">
        ✅ {{ signupStore.message }}
      </p>
      <p v-if="signupStore.error" style="color: red">
        ❌ {{ signupStore.error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useSignupStore } from '../../stores/signupStore'
const signupStore = useSignupStore()
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 40px;
}

label {
  width: 150px;
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
    <h2 style="font-size: 24px; margin-bottom: 20px">📝 Signup</h2>

    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px">
      <!-- Username -->
      <div class="form-row">
        <label>Username:</label>
        <input v-model="signupStore.form.username" placeholder="Username" />
        <span v-if="signupStore.fieldErrors.username" class="error-msg">
          {{ signupStore.fieldErrors.username }}
        </span>
      </div>

      <!-- Password -->
      <div class="form-row">
        <label>Password:</label>
        <input type="password" v-model="signupStore.form.password" placeholder="Password" />
        <span v-if="signupStore.fieldErrors.password" class="error-msg">
          {{ signupStore.fieldErrors.password }}
        </span>
      </div>

      <!-- Confirm Password -->
      <div class="form-row">
        <label>Confirm Password:</label>
        <input type="password" v-model="signupStore.form.password_confirmation" placeholder="Confirm Password" />
        <span v-if="signupStore.fieldErrors.password_confirmation" class="error-msg">
          {{ signupStore.fieldErrors.password_confirmation }}
        </span>
      </div>

      <!-- Buttons -->
      <div>
        <button
          @click="signupStore.signup(router)"
          :disabled="signupStore.isRedirecting || hasErrors"
        >
          Signup
        </button>
        <button @click="signupStore.resetForm" style="margin-left: 10px">Reset</button>
      </div>

      <!-- Messages -->
      <p v-if="signupStore.message" style="color: green">
        ✅ {{ signupStore.message }} Redirecting to login...
      </p>
      <p v-if="signupStore.error" style="color: red">
        ❌ {{ signupStore.error }}
      </p>

      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  </div>
</template>

<script setup>
import { useSignupStore } from '../../stores/signupStore'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const hasErrors = computed(() => {
  return Object.values(signupStore.fieldErrors).some(error => error)
})

const signupStore = useSignupStore()
const router = useRouter()
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 40px;
}

label {
  width: 150px;
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
