<template>
  <NuxtLink :to="`/shows/${id}`" class="show-card-link">
    <article class="show-card">
      <div class="show-card__media">
        <img
          :src="imageSrc"
          :alt="alt || `${title} poster`"
          :loading="eagerLoad ? 'eager' : 'lazy'"
          width="192"
          height="288"
          decoding="async"
        />

        <RatingBadge v-if="rating != null" class="show-card__rating" :value="rating" />
      </div>

      <h3 class="show-card__title">{{ title }}</h3>
      <p v-if="year" class="show-card__meta">{{ year }}</p>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
import RatingBadge from "./RatingBadge.vue";
import type { RatingValue } from "../types/shows";

const props = withDefaults(
  defineProps<{
    id: string | number;
    title: string;
    imageSrc?: string;
    alt?: string;
    rating?: RatingValue | null;
    year?: string | number;
    eagerLoad?: boolean;
  }>(),
  {
    imageSrc: "/images/show-card.png",
    alt: "",
    rating: null,
    year: undefined,
    eagerLoad: false,
  },
);
</script>

<style scoped>
.show-card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform var(--transition-fast);
}

.show-card-link:hover {
  transform: translateY(-4px);
}

.show-card-link:hover .show-card {
  box-shadow: var(--shadow-elevated);
}

.show-card {
  width: var(--card-width);
  background: var(--color-bg-amber-light);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 12px;
  color: var(--color-ink);
  transition: box-shadow var(--transition-fast);
}

.show-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 251, 235, 0.6), rgba(248, 250, 252, 0.6));
}

.show-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.show-card__rating {
  position: absolute;
  top: 12px;
  right: 12px;
}

.show-card__title {
  margin: 0;
  padding: 0 12px;
  font-size: var(--text-base);
  line-height: 1.5;
  letter-spacing: var(--tracking-base);
  font-weight: 400;
  color: var(--color-ink);
}

.show-card__meta {
  margin: 0;
  padding: 0 12px;
  font-size: var(--text-sm);
  line-height: 1.43;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-secondary);
}

@media (max-width: 640px) {
  .show-card {
    width: 100%;
  }
}
</style>
