<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-inner">
      <h1 id="hero-title" class="hero-title">Discover Your Next Favorite Show</h1>
      <p class="hero-copy">
        Explore thousands of TV shows across all genres. Find something new to watch tonight.
      </p>
      <HeroSearch />
    </div>
  </section>
</template>

<script setup>
import HeroSearch from "./HeroSearch.vue";
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #fffbea 0%, #fafaf9 50%, rgba(255, 251, 235, 0.3) 100%);
  border-bottom: 0.66px solid rgba(254, 243, 198, 0.5);
}

.hero-inner {
  max-width: 1216px;
  margin: 0 auto;
  padding: 72px 24px 80px;
}

.hero-title {
  margin: 0;
  color: #1e2939;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  letter-spacing: -0.0195em;
}

.hero-copy {
  margin: 24px 0 40px;
  max-width: 672px;
  color: #4a5565;
  font-size: 16px;
  line-height: 1.625;
  letter-spacing: -0.0195em;
}

@media (max-width: 640px) {
  .hero-inner {
    padding: 56px 16px 64px;
  }

  .hero-copy {
    margin: 16px 0 32px;
  }
}
</style>
