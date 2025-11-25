<template>
  <article class="show-card">
    <div class="show-card__media">
      <img :src="imageSrc" :alt="posterAlt" loading="lazy" />

      <RatingBadge v-if="rating != null" class="show-card__rating" :value="rating" />
    </div>

    <h3 class="show-card__title">{{ title }}</h3>
    <p v-if="year" class="show-card__meta">{{ year }}</p>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import RatingBadge from "./RatingBadge.vue";

interface Props {
  title: string;
  imageSrc?: string;
  alt?: string;
  rating?: number | string | null;
  year?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  imageSrc: "/images/show-card.png",
  rating: null,
});

const posterAlt = computed(() => props.alt || `${props.title} poster`);
</script>

<style scoped>
.show-card {
  width: 192px;
  background: #fffbeb;
  border-radius: 14px;
  box-shadow: 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 12px;
  color: var(--color-ink);
}

.show-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 14px;
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
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.0195em;
  font-weight: 400;
  color: var(--color-ink);
}

.show-card__meta {
  margin: 0;
  padding: 0 12px;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: -0.0107em;
  color: #6a7282;
}

@media (max-width: 640px) {
  .show-card {
    width: 100%;
  }
}
</style>
