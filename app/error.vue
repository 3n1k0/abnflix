<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-icon">{{ errorIcon }}</div>
      <h1 class="error-title">{{ errorTitle }}</h1>
      <p class="error-message">{{ errorMessage }}</p>

      <div class="error-actions">
        <NuxtLink to="/" class="error-button error-button--primary"> Go Home </NuxtLink>
        <button
          v-if="error.statusCode !== 404"
          class="error-button error-button--secondary"
          @click="handleError"
        >
          Try Again
        </button>
      </div>

      <details v-if="isDev" class="error-details">
        <summary>Error Details (Development Only)</summary>
        <pre>{{ error }}</pre>
      </details>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})

const isDev = import.meta.dev

const errorIcon = computed(() => {
  if (props.error.statusCode === 404) return '🔍'
  if (props.error.statusCode === 503) return '⚠️'
  return '❌'
})

const errorTitle = computed(() => {
  if (props.error.statusCode === 404) return 'Page Not Found'
  if (props.error.statusCode === 503) return 'Service Unavailable'
  if (props.error.statusCode >= 500) return 'Server Error'
  return 'Something Went Wrong'
})

const errorMessage = computed(() => {
  if (props.error.statusCode === 404) {
    return "The page you're looking for doesn't exist or has been moved."
  }
  if (props.error.statusCode === 503) {
    return 'Our service is temporarily unavailable. Please try again in a few moments.'
  }
  if (props.error.message) {
    return props.error.message
  }
  return 'An unexpected error occurred. Please try again later.'
})

const handleError = () => {
  clearError({ redirect: '/' })
}

useSeoMeta({
  title: () => `${errorTitle.value} - ABN Flix`,
  description: () => errorMessage.value,
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(180deg, rgba(255, 251, 235, 0.6) 0%, rgba(255, 255, 255, 0.6) 40%);
}

.error-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
  background: var(--color-bg-white);
  border-radius: 18px;
  padding: 48px 32px;
  box-shadow: 0 12px 38px rgba(0, 0, 0, 0.12);
}

.error-icon {
  font-size: 72px;
  margin-bottom: 24px;
  animation: bounce 2s ease-in-out infinite;
}

.error-title {
  font-size: 32px;
  font-weight: 600;
  color: var(--color-ink);
  margin: 0 0 16px 0;
  letter-spacing: var(--tracking-heading);
}

.error-message {
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-muted);
  margin: 0 0 32px 0;
  letter-spacing: var(--tracking-base);
}

.error-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.error-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.error-button--primary {
  background: var(--color-primary);
  color: white;
}

.error-button--primary:hover {
  background: #c85a00;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(225, 113, 0, 0.3);
}

.error-button--secondary {
  background: rgba(225, 113, 0, 0.08);
  color: var(--color-primary);
  border: 1px solid rgba(225, 113, 0, 0.2);
}

.error-button--secondary:hover {
  background: rgba(225, 113, 0, 0.12);
  border-color: rgba(225, 113, 0, 0.3);
}

.error-details {
  margin-top: 32px;
  text-align: left;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 16px;
}

.error-details summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--color-ink);
  margin-bottom: 12px;
}

.error-details pre {
  margin: 12px 0 0 0;
  font-size: 12px;
  line-height: 1.5;
  overflow: auto;
  color: var(--color-muted);
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 640px) {
  .error-container {
    padding: 32px 24px;
  }

  .error-icon {
    font-size: 56px;
    margin-bottom: 20px;
  }

  .error-title {
    font-size: 24px;
    margin-bottom: 12px;
  }

  .error-message {
    font-size: 16px;
    margin-bottom: 24px;
  }

  .error-actions {
    flex-direction: column;
  }

  .error-button {
    width: 100%;
  }
}
</style>
