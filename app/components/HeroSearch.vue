<template>
  <form
    class="hero-search"
    role="search"
    aria-label="Search for shows"
    @submit.prevent="$emit('submit')"
  >
    <label class="sr-only" for="hero-search-input">Search for shows</label>
    <span class="hero-search__icon" aria-hidden="true">
      <SearchIcon />
    </span>

    <input
      id="hero-search-input"
      ref="inputRef"
      v-model="localValue"
      type="search"
      placeholder="Search for shows..."
      autocomplete="off"
      class="form-control"
      @input="debounceEmit"
    />
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

const DEBOUNCE_MS = 400

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'submit'])

const localValue = ref(props.modelValue || '')
const inputRef = ref<HTMLInputElement | null>(null)

let timer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.modelValue,
  (newValue) => {
    const isFocused = inputRef.value === document.activeElement
    if (!isFocused && newValue !== localValue.value) {
      localValue.value = newValue ?? ''
    }
  }
)

function debounceEmit() {
  if (timer) clearTimeout(timer)

  timer = setTimeout(() => {
    if (localValue.value !== props.modelValue) {
      emit('update:modelValue', localValue.value)
    }
  }, DEBOUNCE_MS)
}

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.hero-search {
  position: relative;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}
.hero-search__icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
