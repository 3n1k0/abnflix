<template>
  <main role="main">
    <HeroSection />

    <section class="container" aria-label="Genre: Drama">
      <ShowList title="Drama" action-label="View All" :shows="dramaShows" />
    </section>

    <section class="container" aria-label="Genre: Comedy">
      <ShowList title="Comedy" action-label="View All" :shows="comedy" />
    </section>

    <section class="container" aria-label="Genre: Horror">
      <ShowList title="Horror" action-label="View All" :shows="horror" />
    </section>

    <section class="container" aria-label="Genre: Thriller">
      <ShowList title="Thriller" action-label="View All" :shows="thriller" />
    </section>

    <section class="container" aria-label="Genre: Musical">
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
