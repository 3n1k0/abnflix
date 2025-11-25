<template>
  <div class="app-shell">
    <AppHeader />

    <main class="main-content" role="main">
      <HeroSection />
    </main>
  </div>
</template>

<script setup>
import AppHeader from "../components/AppHeader.vue";
import HeroSection from "../components/HeroSection.vue";
import { useHead } from "#imports";

useHead({
  title: "TV Shows Dashboard",
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap");

:global(:root) {
  color: #0f172a;
  background-color: #f8fafc;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

:global(body) {
  margin: 0;
  background: #f8fafc;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.app-shell {
  min-height: 100vh;
}

.main-content {
  display: block;
}

.page-content {
  max-width: 1216px;
  margin: 0 auto;
  padding: 32px 24px;
}

.page-content h1 {
  font-size: 28px;
  font-weight: 600;
  margin: 0;
}

.muted {
  margin-top: 8px;
  color: #475569;
}
</style>
