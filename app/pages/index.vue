<template>
  <main role="main" class="main-content">
    <HeroSection />

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
        :eager-load-count="index === 0 ? 4 : 0"
      />
    </section>
  </main>
</template>

<script setup>
const { genres } = useShows()

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

@media (max-width: 640px) {
  .main-content {
    gap: 48px;
    padding-bottom: 64px;
  }

  .genre-section {
    min-height: 280px;
  }
}
</style>
