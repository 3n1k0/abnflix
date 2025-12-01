<template>
  <header class="detail-card__header">
    <div>
      <h1 id="detail-card-title" class="detail-card__title">{{ title }}</h1>
      <ul class="detail-card__meta" aria-label="Show details">
        <li class="detail-card__pill detail-card__pill--rating">
          <StarIcon class="pill-icon" />
          <span class="pill-value">{{ displayRating }}</span>
        </li>
        <li v-if="year" class="detail-card__meta-text">{{ year }}</li>
        <li v-if="language" class="detail-card__pill">{{ language }}</li>
        <li v-for="genre in genres" :key="genre" class="detail-card__pill">{{ genre }}</li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import StarIcon from '../icons/StarIcon.vue'
defineProps({
  title: {
    type: String,
    required: true,
  },
  displayRating: {
    type: String,
    required: true,
  },
  year: {
    type: [String, Number],
    required: false,
    default: null,
  },
  language: {
    type: String,
    required: false,
    default: null,
  },
  genres: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.detail-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.detail-card__title {
  margin: 12px 0 12px 0;
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: var(--tracking-heading);
  font-weight: 600;
}

.detail-card__meta {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.detail-card__pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(225, 113, 0, 0.08);
  color: var(--color-primary);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-tight);
  line-height: 1.4;
}

.detail-card__pill--rating {
  background: rgba(254, 154, 0, 0.18);
  color: var(--color-ink);
  box-shadow: inset 0 0 0 1px rgba(254, 154, 0, 0.26);
}

.pill-icon {
  width: 18px;
  height: 18px;
  color: var(--color-rating);
}

.pill-value {
  font-weight: 600;
}

.detail-card__meta-text {
  color: var(--color-muted);
  font-size: var(--text-sm);
  line-height: 1.4;
}

@media (max-width: 640px) {
  .detail-card__header {
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
  }

  .detail-card__title {
    margin: 8px 0;
    font-size: 18px;
    line-height: 1.4;
  }

  .detail-card__meta {
    gap: 8px;
  }

  .detail-card__pill {
    padding: 6px 10px;
    font-size: 13px;
  }
}
</style>
