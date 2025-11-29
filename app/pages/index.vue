<template>
  <main role="main" class="main-content">
    <HeroSection />

    <template v-if="isError">
      <div class="container error-state">
        <div class="error-card" role="alert">
          <div class="error-icon">⚠️</div>
          <h2 class="error-title">Unable to Load Shows</h2>
          <p class="error-message">
            {{ error?.message || 'Failed to fetch shows. Please try again later.' }}
          </p>
          <button class="retry-button" @click="refresh">Try Again</button>
        </div>
      </div>
    </template>

    <template v-else-if="isLoading">
      <div class="container loading-state">
        <div v-for="index in SKELETON_SECTION_COUNT" :key="index" class="skeleton-section">
          <div class="skeleton-title" />
          <div class="skeleton-shows">
            <div v-for="cardIndex in SKELETON_CARD_COUNT" :key="cardIndex" class="skeleton-card" />
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="isEmpty">
      <div class="container empty-state">
        <div class="empty-card" role="status">
          <div class="empty-icon">📺</div>
          <h2 class="empty-title">No shows available right now</h2>
          <p class="empty-message">Please try again in a moment or refresh the page.</p>
          <button class="retry-button" @click="refresh">Refresh</button>
        </div>
      </div>
    </template>

    <template v-else-if="isReady">
      <section
        v-for="(genre, index) in genres"
        :key="genre.name"
        class="container genre-section"
        :aria-label="`Genre: ${genre.name}`"
      >
        <ShowList
          :title="genre.name"
          action-label="View All"
          :shows="genre.shows"
          :eager-load-count="index === 0 ? INITIAL_EAGER_LOAD_COUNT : 0"
        />
      </section>
    </template>
  </main>
</template>

<script setup>
const { genres, error, pending, refresh } = useShows()
const { isError, isLoading, isEmpty, isReady } = useHomeViewState({ error, pending, genres })

const SKELETON_SECTION_COUNT = 4
const SKELETON_CARD_COUNT = 10
const INITIAL_EAGER_LOAD_COUNT = 4

useSeoMeta({
  title: 'TV Shows Dashboard',
  description:
    'Explore thousands of TV shows across all genres. Find your next favorite show tonight.',
  ogTitle: 'TV Shows Dashboard',
  ogDescription:
    'Explore thousands of TV shows across all genres. Find your next favorite show tonight.',
})
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  gap: 56px;
  padding-bottom: 80px;
}

.genre-section {
  min-height: 320px;
}

.error-state {
  padding: 80px 20px;
}

.error-card {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  padding: 48px 32px;
  background: var(--color-error-light);
  border: 1px solid var(--color-error-border);
  border-radius: 12px;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-white);
  margin-bottom: 12px;
}

.error-message {
  font-size: 16px;
  color: var(--color-text-white-muted);
  margin-bottom: 24px;
  line-height: 1.5;
}

.retry-button {
  padding: 12px 24px;
  background: var(--color-accent);
  color: var(--color-text-white);
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.retry-button:hover {
  background: var(--color-accent-hover);
}

.loading-state {
  padding: 40px 0;
}

.skeleton-section {
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 56px;
}

.skeleton-title {
  width: 180px;
  height: 32px;
  background: var(--color-bg-white-subtle);
  border-radius: 6px;
  margin-bottom: 24px;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-shows {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: var(--card-width);
  gap: 16px;
  overflow: hidden;
  padding: 8px 0;
}

.skeleton-card {
  aspect-ratio: 2 / 3;
  background: var(--color-bg-white-subtle);
  border-radius: 8px;
  animation: pulse 1.5s ease-in-out infinite;
}

.empty-state {
  padding: 60px 20px 80px;
}

.empty-card {
  max-width: 520px;
  margin: 0 auto;
  text-align: center;
  padding: 40px 32px;
  background: var(--color-bg-white);
  border: 1px solid var(--color-border-soft);
  border-radius: 12px;
  box-shadow: var(--shadow-card);
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
  opacity: 0.8;
}

.empty-title {
  margin: 0 0 12px 0;
  font-size: 22px;
  font-weight: 600;
  color: var(--color-ink);
}

.empty-message {
  margin: 0 0 24px 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-muted);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@media (max-width: 640px) {
  .main-content {
    gap: 48px;
    padding-bottom: 64px;
  }

  .genre-section {
    min-height: 280px;
  }

  .error-state {
    padding: 40px 20px;
  }

  .error-card {
    padding: 32px 24px;
  }

  .skeleton-section {
    margin-bottom: 48px;
  }

  .skeleton-shows {
    grid-auto-columns: minmax(70%, 1fr);
    gap: 12px;
  }
}
</style>
