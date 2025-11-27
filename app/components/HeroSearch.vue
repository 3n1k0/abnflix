<template>
  <form
    class="hero-search"
    role="search"
    aria-label="Search for shows"
    @submit.prevent="handleSubmit"
  >
    <label class="sr-only" for="hero-search-input">Search for shows</label>
    <span class="hero-search__icon" aria-hidden="true">
      <SearchIcon aria-hidden="true" />
    </span>
    <input
      id="hero-search-input"
      v-model="queryModel"
      name="query"
      type="search"
      placeholder="Search for shows..."
      autocomplete="off"
      class="form-control"
    />
  </form>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'search'])

const query = ref(props.modelValue ?? '')

watch(
  () => props.modelValue,
  (value) => {
    query.value = value ?? ''
  }
)

const updateQuery = (value) => {
  query.value = value
  emit('update:modelValue', value)
}

const queryModel = computed({
  get: () => query.value,
  set: updateQuery,
})

const handleSubmit = () => {
  emit('search', query.value.trim())
}
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
  width: var(--icon-sm);
  height: var(--icon-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.hero-search__icon svg {
  width: var(--icon-sm);
  height: var(--icon-sm);
  display: block;
}
</style>
