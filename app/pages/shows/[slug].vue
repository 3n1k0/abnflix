<template>
  <main role="main" class="show-detail">
    <div class="container">
      <BackButton />
      <div v-if="show" class="show-detail__content">
        <div class="show-detail__poster" :class="{ 'is-loading': !posterLoaded }">
          <div v-if="!posterLoaded" class="skeleton skeleton--poster" aria-hidden="true" />
          <NuxtImg
            :src="show.imageFullSrc || show.imageSrc"
            :alt="show.alt || `${show.title} poster`"
            width="400"
            height="600"
            format="webp"
            quality="85"
            fit="cover"
            loading="eager"
            decoding="async"
            sizes="(max-width: 640px) 80vw, 400px"
            @load="posterLoaded = true"
          />
          <RatingBadge
            v-if="show.rating != null"
            class="show-detail__rating"
            :value="show.rating"
          />
        </div>
        <ShowDetailPanel
          class="show-detail__panel"
          :show="show"
          :summary="summaryText"
          :genres="detailGenres"
          :cast="cast || []"
          :cast-count="castCount"
          :episode-count="episodeCount"
        />
      </div>

      <div v-else-if="isLoading" class="show-detail__content">
        <div class="show-detail__poster skeleton skeleton--poster" aria-hidden="true" />
        <div class="show-detail__panel skeleton skeleton--panel" aria-hidden="true" />
      </div>

      <div v-else class="show-detail__not-found">
        <h1>Show Not Found</h1>
        <p>The show you're looking for doesn't exist.</p>
        <BackButton />
      </div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const { dramaShows, comedy, horror, thriller, pending } = useShows()

const allShows = computed(() => [
  ...dramaShows.value,
  ...comedy.value,
  ...horror.value,
  ...thriller.value,
])

const show = computed(() => {
  const slugParam = String(route.params.slug)

  return allShows.value.find((s) => s.slug === slugParam || String(s.id) === slugParam)
})

const isLoading = computed(() => pending.value && !show.value)
const posterLoaded = ref(false)
watch(show, () => {
  posterLoaded.value = false
})

const showId = computed(() => show.value?.id)

const { data: cast } = useAsyncData(
  () => `cast-${showId.value}`,
  () => (showId.value ? $fetch(`/api/shows/${showId.value}/cast`) : []),
  { watch: [showId] }
)

const showTitle = computed(() =>
  show.value ? `${show.value.title} - TV Shows Dashboard` : 'Show Not Found'
)

const showDescription = computed(() => {
  if (!show.value) {
    return 'Show not found on TV Shows Dashboard.'
  }

  const year = show.value.year ? ` (${show.value.year})` : ''
  const rating = show.value.rating != null ? ` Rated ${show.value.rating}/10.` : ''

  return `${show.value.title}${year} on TV Shows Dashboard.${rating}`
})

const summaryText = computed(() => {
  return show.value?.summary || ''
})

const detailGenres = computed(() => ['Drama', 'Thriller'])
const castCount = computed(() => cast.value?.length || 0)
const episodeCount = computed(() => 5)

useSeoMeta({
  title: () => showTitle.value,
  description: () => showDescription.value,
  ogTitle: () => showTitle.value,
  ogDescription: () => showDescription.value,
})
</script>

<style scoped>
.show-detail {
  min-height: calc(100vh - 64px);
  padding: 48px 0 64px;
  background: linear-gradient(180deg, rgba(255, 251, 235, 0.6) 0%, rgba(255, 255, 255, 0.6) 40%);
}

.show-detail__content {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 36px;
  align-items: start;
}

.show-detail__poster {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--gradient-card);
  box-shadow: var(--shadow-elevated);
}

.show-detail__poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 1;
  transition: opacity var(--transition-fast);
}

.show-detail__poster.is-loading img {
  opacity: 0;
}

.show-detail__rating {
  position: absolute;
  top: 16px;
  right: 16px;
}

.show-detail__not-found {
  text-align: center;
  padding: 80px 0;
}

.show-detail__not-found h1 {
  margin: 0 0 16px 0;
  font-size: 48px;
  line-height: 1.2;
  letter-spacing: var(--tracking-heading);
  font-weight: 600;
  color: var(--color-ink);
}

.show-detail__not-found p {
  margin: 0 0 32px 0;
  font-size: var(--text-base);
  line-height: 1.625;
  letter-spacing: var(--tracking-base);
  color: var(--color-muted);
}

@media (max-width: 768px) {
  .show-detail {
    padding: 24px 0 40px;
  }

  .show-detail__content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .show-detail__poster {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .show-detail__content {
    justify-items: center;
  }

  .show-detail__panel {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
}

.skeleton {
  position: relative;
  overflow: hidden;
  background: #e5e7eb;
}

.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(229, 231, 235, 0) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(229, 231, 235, 0) 100%
  );
  transform: translateX(-100%);
  animation: shimmer 1.4s ease-in-out infinite;
}

.skeleton--poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-elevated);
}

.skeleton--panel {
  width: 100%;
  max-width: 540px;
  min-height: 320px;
  border-radius: 18px;
  box-shadow: 0 12px 38px rgba(0, 0, 0, 0.08);
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
