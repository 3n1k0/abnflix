<template>
  <main role="main" class="main-content">
    <HeroSection />

    <section class="container genre-section" aria-label="Genre: Drama">
      <ShowList title="Drama" action-label="View All" :shows="dramaShows" :eager-load-count="4" />
    </section>

    <section class="container genre-section" aria-label="Genre: Comedy">
      <ShowList title="Comedy" action-label="View All" :shows="comedy" />
    </section>

    <section class="container genre-section" aria-label="Genre: Horror">
      <ShowList title="Horror" action-label="View All" :shows="horror" />
    </section>

    <section class="container genre-section" aria-label="Genre: Thriller">
      <ShowList title="Thriller" action-label="View All" :shows="thriller" />
    </section>

    <section class="container genre-section" aria-label="Genre: Musical">
      <ShowList title="Musical" action-label="View All" :shows="musical" />
    </section>
  </main>
</template>

<script setup lang="ts">
import HeroSection from "../components/HeroSection.vue";
import ShowList from "../components/ShowList.vue";
import { useHead } from "#imports";
import { useShows } from "../composables/useShows";

useHead({
  title: "TV Shows Dashboard",
});

const { dramaShows, comedy, horror, thriller, musical } = useShows();
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
