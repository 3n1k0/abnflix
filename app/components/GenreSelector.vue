<template>
  <select :value="selectedGenre || ''" @change="handleChange">
    <option value="">All Genres</option>
    <option v-for="genre in genres" :key="genre" :value="genre">
      {{ genre }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  genres: {
    type: Array,
    required: true,
  },
  selectedGenre: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:selectedGenre'])

function handleChange(event) {
  emit('update:selectedGenre', event.target.value || null)
}
</script>

<style scoped>
select {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid var(--color-border-soft);
  background: var(--color-bg-white);
  color: var(--color-ink);
}
</style>
