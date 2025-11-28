<template>
  <form
    class="hero-search"
    role="search"
    aria-label="Search for shows"
    @submit.prevent="$emit('submit')"
  >
    <label class="sr-only" for="hero-search-input">Search for shows</label>
    <span class="hero-search__icon" aria-hidden="true">
      <SearchIcon aria-hidden="true" />
    </span>
    <input
      id="hero-search-input"
      :value="modelValue"
      name="query"
      type="search"
      placeholder="Search for shows..."
      autocomplete="off"
      class="form-control"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </form>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue', 'submit'])
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
