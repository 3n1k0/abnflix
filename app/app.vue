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
import "./assets/css/main.css";

useHead({
  title: "TV Shows Dashboard",
});

const dramaShows = [
  { title: "Midnight Chronicles", year: "2023", rating: "8.7", imageSrc: "/images/show-list-1.png" },
  { title: "City Lights", year: "2024", rating: "9.1", imageSrc: "/images/show-list-2.png" },
  { title: "Cinematic Dreams", year: "2023", rating: "7.8", imageSrc: "/images/show-list-3.png" },
  { title: "Starlight Academy", year: "2024", rating: "8.5", imageSrc: "/images/show-list-4.png" },
  { title: "Wilderness Rescue", year: "2024", rating: "8.2", imageSrc: "/images/show-list-5.png" },
  { title: "Northern Skies", year: "2023", rating: "8.0", imageSrc: "/images/show-list-1.png" },
  { title: "Harbor Lights", year: "2022", rating: "7.9", imageSrc: "/images/show-list-2.png" },
  { title: "Echoes of Time", year: "2021", rating: "8.4", imageSrc: "/images/show-list-3.png" },
];
</script>
