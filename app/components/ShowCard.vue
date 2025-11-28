<template>
  <NuxtLink :to="`/shows/${slug || id}`" class="show-card-link">
    <article class="show-card">
      <div class="show-card__media">
        <div v-if="imageError" class="show-card__placeholder">
          <div class="placeholder-icon">📺</div>
          <span class="placeholder-text">No Image</span>
        </div>
        <NuxtImg
          v-else
          :src="imageSrc"
          :alt="alt || `${title} poster`"
          :loading="eagerLoad || fetchPriority === 'high' ? 'eager' : 'lazy'"
          :fetchpriority="fetchPriority"
          width="192"
          height="288"
          format="webp"
          quality="72"
          fit="cover"
          decoding="async"
          sizes="(max-width: 640px) 70vw, 192px"
          @error="handleImageError"
        />

        <RatingBadge v-if="rating != null" class="show-card__rating" :value="rating" />
      </div>

      <h3 class="show-card__title">{{ title }}</h3>
      <p v-if="year" class="show-card__meta">{{ year }}</p>
    </article>
  </NuxtLink>
</template>

<script setup>
import { ref } from 'vue'
import RatingBadge from './RatingBadge.vue'

const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
  console.warn(`Failed to load image for show: ${props.title}`)
}

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  slug: {
    type: String,
    default: undefined,
  },
  title: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    default: '/images/show-card.png',
  },
  alt: {
    type: String,
    default: '',
  },
  rating: {
    type: [Number, String],
    default: null,
  },
  year: {
    type: [String, Number],
    default: undefined,
  },
  eagerLoad: {
    type: Boolean,
    default: false,
  },
  fetchPriority: {
    type: String,
    default: 'auto',
  },
})
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

.show-card__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, rgba(255, 251, 235, 0.8), rgba(248, 250, 252, 0.8));
}

.placeholder-icon {
  font-size: 48px;
  opacity: 0.4;
}

.placeholder-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  opacity: 0.6;
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
