<template>
  <svg :aria-hidden="ariaHidden" :aria-label="ariaLabel">
    <use :href="`#${name}`" />
  </svg>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  ariaHidden: {
    type: Boolean,
    default: true,
  },
  ariaLabel: {
    type: String,
    default: undefined,
  },
})
</script>
