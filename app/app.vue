<template>
  <div class="app-shell">
    <AppHeader />

    <main role="main">
      <HeroSection />
    </main>
  </div>
</template>

<script setup>
import AppHeader from "../components/AppHeader.vue";
import HeroSection from "../components/HeroSection.vue";
import { useHead } from "#imports";
import "./assets/css/main.css";

useHead({
  title: "TV Shows Dashboard",
});
</script>
