<template>
  <div class="app-shell">
    <AppHeader />

    <main role="main">
      <HeroSection />

      <section class="container" aria-label="Genre: Drama">
        <ShowList title="Drama" action-label="View All" :shows="dramaShows" />
      </section>
    </main>
  </div>
</template>

<script setup>
import AppHeader from "../components/AppHeader.vue";
import HeroSection from "../components/HeroSection.vue";
import ShowList from "../components/ShowList.vue";
import { useHead } from "#imports";
import { defaultShows } from "./data/shows";
import "./assets/css/main.css";

useHead({
  title: "TV Shows Dashboard",
});

const dramaShows = defaultShows;
</script>
