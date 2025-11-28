<template>
  <main role="main" class="show-detail">
    <div class="container">
      <BackButton />

      <div class="show-detail__content">
        <!-- Loading state -->
        <template v-if="isLoading">
          <div class="show-detail__poster skeleton skeleton--poster" aria-hidden="true" />
          <div class="show-detail__panel skeleton skeleton--panel" aria-hidden="true" />
        </template>
        <template v-else-if="show">
          <div class="show-detail__poster">
            <div v-show="posterError" class="poster-error">
              <div class="poster-error__icon">📺</div>
              <div class="poster-error__text">Image unavailable</div>
            </div>
            <NuxtImg
              v-show="!posterError"
              class="show-detail__image"
              :src="show.imageFullSrc || show.imageSrc"
              :alt="show.alt || `${show.title} poster`"
              width="400"
              height="600"
              format="webp"
              quality="85"
              fit="cover"
              sizes="(max-width: 640px) 80vw, 400px"
              @error="handlePosterErrorWithLog"
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
        </template>

        <!-- Not found -->
        <template v-else>
          <div class="show-detail__not-found">
            <h1>Show Not Found</h1>
            <p>The show you're looking for doesn't exist.</p>
            <BackButton />
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const slugParam = computed(() => String(route.params.slug))

const { show, isLoading, summaryText, detailGenres, cast, castCount, episodeCount } =
  useShowDetail(slugParam)
const posterError = ref(false)
const handlePosterErrorWithLog = () => {
  console.warn(`Failed to load poster image for show: ${show.value?.title || 'Unknown'}`)
  posterError.value = true
}
watch(show, () => (posterError.value = false))

useSeoMeta({
  title: () => (show.value ? `${show.value.title} - TV Shows Dashboard` : 'Show Not Found'),
  description: () =>
    show.value
      ? `${show.value.title}${show.value.year ? ` (${show.value.year})` : ''}.`
      : 'Show not found.',
})
</script>

<style scoped>
.show-detail {
  min-height: calc(100vh - 64px);
  padding: 48px 0 64px;
  background: var(--gradient-detail);
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

.show-detail__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.poster-error {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: var(--gradient-card-hover);
}

.poster-error__icon {
  font-size: 64px;
  opacity: 0.4;
}

.poster-error__text {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  opacity: 0.6;
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
  background: var(--color-bg-gray);
}

.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-scroll-indicator);
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
  box-shadow: var(--shadow-panel);
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
