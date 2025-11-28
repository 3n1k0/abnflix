<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-icon">{{ icon }}</div>
      <h1 class="error-title">{{ title }}</h1>
      <p class="error-message">{{ message }}</p>

      <div class="error-actions">
        <NuxtLink to="/" class="error-button error-button--primary">Go Home</NuxtLink>

        <button
          v-if="props.error.statusCode !== 404"
          class="error-button error-button--secondary"
          @click="handleError"
        >
          Try Again
        </button>
      </div>

      <details v-if="isDev" class="error-details">
        <summary>Error Details (Development Only)</summary>
        <pre>{{ props.error }}</pre>
      </details>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: { type: Object, required: true },
})

const isDev = import.meta.dev

const code = computed(() => props.error.statusCode)
const msg = computed(() => props.error.message)

const icon = computed(() => {
  if (code.value === 404) return '🔍'
  if (code.value === 503) return '⚠️'
  return '❌'
})

const title = computed(() => {
  if (code.value === 404) return 'Page Not Found'
  if (code.value === 503) return 'Service Unavailable'
  if (code.value >= 500) return 'Server Error'
  return 'Something Went Wrong'
})

const message = computed(() => {
  if (code.value === 404) {
    return "The page you're looking for doesn't exist or has been moved."
  }
  if (code.value === 503) {
    return 'The service is temporarily unavailable. Please try again later.'
  }
  return msg.value || 'An unexpected error occurred. Please try again.'
})

const handleError = () => {
  clearError({ redirect: '/' })
}

useSeoMeta({
  title: () => `${title.value} - ABN Flix`,
  description: () => message.value,
})
</script>
