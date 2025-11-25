<template>
  <div class="rating-badge" :aria-label="ariaLabel">
    <svg class="rating-badge__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.5l2.53 5.13 5.66.83-4.1 4 0.97 5.64L12 16.96 6.94 19.1 7.9 13.46 3.8 9.46l5.66-.83L12 3.5z"
        fill="currentColor"
      />
    </svg>
    <span class="rating-badge__value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  value: string | number;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "User rating",
});

const ariaLabel = computed(() => props.label || "User rating");
</script>

<style scoped>
.rating-badge {
  height: 32px;
  padding: 0 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #fe9a00;
}

.rating-badge__value {
  color: var(--color-ink);
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: -0.0107em;
}

.rating-badge__icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
</style>
