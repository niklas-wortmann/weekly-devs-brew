<template>
  <form @submit.prevent="handleSubmit" class="bg-white shadow-sm rounded-lg p-6 space-y-4">
    <div class="space-y-2">
      <label for="email" class="block text-sm font-medium text-primary-700">
        Email address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        v-model="email"
        required
        autocomplete="email"
        class="w-full px-4 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-primary-50"
        :class="{ 'border-red-300': error }"
        placeholder="you@example.com"
        aria-describedby="email-error"
      />
      <p v-if="error" id="email-error" class="text-red-600 text-sm">
        {{ error }}
      </p>
    </div>

    <button
      type="submit"
      :disabled="isLoading"
      class="w-full bg-accent-600 text-white py-2 px-4 rounded-md hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:opacity-50 transition-colors"
      aria-live="polite"
    >
      <span v-if="isLoading">Subscribing...</span>
      <span v-else>Subscribe to newsletter</span>
    </button>

    <p v-if="success" class="text-green-600 text-sm text-center" role="alert">
      {{ success }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const error = ref('')
const success = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  success.value = ''
  isLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    success.value = 'Thank you for subscribing! Please check your email for confirmation.'
    email.value = ''
  } catch (e) {
    error.value = 'Something went wrong. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>