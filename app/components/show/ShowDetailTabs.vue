<template>
  <nav class="detail-card__tabs" aria-label="Show detail sections">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      type="button"
      :class="['detail-card__tab', { 'is-active': activeTab === tab.key }]"
      :aria-current="activeTab === tab.key ? 'page' : undefined"
      @click="$emit('update:activeTab', tab.key)"
    >
      <span>{{ tab.label }}</span>
      <span v-if="tab.count != null" class="detail-card__badge">{{ tab.count }}</span>
    </button>
  </nav>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.detail-card__tabs {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(225, 113, 0, 0.18);
  padding-bottom: 8px;
}

.detail-card__tab {
  position: relative;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  letter-spacing: var(--tracking-base);
  padding: 8px 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color var(--transition-fast);
}

.detail-card__tab:hover,
.detail-card__tab:focus-visible {
  color: var(--color-ink);
}

.detail-card__tab.is-active {
  color: var(--color-primary);
}

.detail-card__tab.is-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -9px;
  height: 3px;
  border-radius: 999px;
  background: var(--color-primary);
}

.detail-card__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(225, 113, 0, 0.16);
  color: var(--color-primary);
  font-size: 12px;
  line-height: 1.2;
}

@media (max-width: 900px) {
  .detail-card__tabs {
    flex-wrap: wrap;
  }
}

@media (max-width: 640px) {
  .detail-card__tabs {
    gap: 8px;
    padding-bottom: 6px;
  }

  .detail-card__tab {
    font-size: var(--text-sm);
    padding: 6px 0;
  }
}
</style>
