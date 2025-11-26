<template>
  <div class="rating-badge" :aria-label="ariaLabel">
    <StarIcon class="rating-badge__icon" />
    <span class="rating-badge__value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import StarIcon from "./icons/StarIcon.vue";

const props = withDefaults(
  defineProps<{
    value: number;
    label?: string;
  }>(),
  {
    label: "User rating",
  },
);

const ariaLabel = computed(() => props.label || "User rating");
</script>

<style scoped>
.rating-badge {
  height: 32px;
  padding: 0 10px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-white-translucent);
  box-shadow: var(--shadow-card);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-rating);
}

.rating-badge__value {
  color: var(--color-ink);
  font-size: var(--text-sm);
  line-height: 1.43;
  letter-spacing: var(--tracking-tight);
}

.rating-badge__icon {
  width: var(--icon-xs);
  height: var(--icon-xs);
  flex-shrink: 0;
}
</style>
