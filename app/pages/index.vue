<template>
  <main role="main" class="main-content">
    <HeroSection />

    <div v-if="error" class="container error-state">
      <div class="error-card">
        <div class="error-icon">⚠️</div>
        <h2 class="error-title">Unable to Load Shows</h2>
        <p class="error-message">
          {{ error.message || 'Failed to fetch shows. Please try again later.' }}
        </p>
        <button class="retry-button" @click="refresh">Try Again</button>
      </div>
    </div>

    <div v-else-if="pending" class="container loading-state">
      <div v-for="i in 4" :key="i" class="skeleton-section">
        <div class="skeleton-title" />
        <div class="skeleton-shows">
          <div v-for="j in 10" :key="j" class="skeleton-card" />
        </div>
      </div>
    </div>

    <section
      v-for="(genre, index) in genres"
      v-else
      :key="genre.name"
      class="container genre-section"
      :aria-label="`Genre: ${genre.name}`"
    >
      <ShowList
        :title="genre.name"
        action-label="View All"
        :shows="genre.shows"
        :eager-load-count="index === 0 ? 4 : 0"
      />
    </section>
  </main>
</template>

<script setup>
const { genres, error, pending, refresh } = useShows()

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

/* Error State */
.error-state {
  padding: 80px 20px;
}

.error-card {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  padding: 48px 32px;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 12px;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-title {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
}

.error-message {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 24px;
  line-height: 1.5;
}

.retry-button {
  padding: 12px 24px;
  background: #e50914;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.retry-button:hover {
  background: #f6121d;
}

/* Loading State */
.loading-state {
  padding: 40px 0;
}

.skeleton-section {
  margin-bottom: 56px;
}

.skeleton-title {
  width: 180px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  margin-bottom: 24px;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-shows {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.skeleton-card {
  aspect-ratio: 2 / 3;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  animation: pulse 1.5s ease-in-out infinite;
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
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
  }
}
</style>
