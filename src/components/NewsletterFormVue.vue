<template>
  <div class="w-full max-w-md mx-auto">
    <div v-if="submitted" class="text-center p-6 bg-green-50 dark:bg-green-900 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-xl font-bold text-green-800 dark:text-green-200 mb-2">Thanks for subscribing!</h3>
      <p class="text-green-700 dark:text-green-300">Check your inbox to confirm your subscription.</p>
    </div>
    
    <form v-else @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          required
          placeholder="your@email.com"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-accent focus:border-primary-accent dark:bg-gray-800 dark:text-white"
          :class="{ 'border-red-500': emailError }"
        />
        <p v-if="emailError" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ emailError }}</p>
      </div>
      
      <div>
        <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First name (optional)</label>
        <input 
          type="text" 
          id="firstName" 
          v-model="firstName" 
          placeholder="Your first name"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-accent focus:border-primary-accent dark:bg-gray-800 dark:text-white"
        />
      </div>
      
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input 
            id="privacy" 
            type="checkbox" 
            v-model="privacyAccepted"
            required
            class="h-4 w-4 text-primary-accent border-gray-300 rounded focus:ring-primary-accent"
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="privacy" class="font-medium text-gray-700 dark:text-gray-300">
            I agree to receive email updates
          </label>
          <p class="text-gray-500 dark:text-gray-400">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
      
      <div>
        <button 
          type="submit" 
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-accent hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-accent transition-colors duration-200"
          :disabled="loading"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Subscribing...' : 'Subscribe to the newsletter' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const firstName = ref('');
const privacyAccepted = ref(false);
const loading = ref(false);
const submitted = ref(false);
const emailError = ref('');

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const submitForm = async () => {
  // Reset error state
  emailError.value = '';
  
  // Validate email
  if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address';
    return;
  }
  
  loading.value = true;
  
  try {
    // In a real implementation, you would send the data to your newsletter service
    // For now, we'll simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to the beehiiv signup with the email pre-filled
    const beehiivUrl = `https://weeklybrew.beehiiv.com/subscribe?email=${encodeURIComponent(email.value)}`;
    if (firstName.value) {
      beehiivUrl += `&first_name=${encodeURIComponent(firstName.value)}`;
    }
    
    // For demo purposes, we'll just mark as submitted instead of redirecting
    submitted.value = true;
    
    // In a real implementation, you might want to redirect:
    // window.location.href = beehiivUrl;
  } catch (error) {
    console.error('Error submitting form:', error);
    emailError.value = 'An error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>