<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-inner container">
      <h1 id="hero-title" class="hero-title">Discover Your Next Favorite Show</h1>
      <p class="hero-copy">
        Explore thousands of TV shows across all genres. Find something new to watch tonight.
      </p>
      <HeroSearch />
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.hero {
  border-bottom: 0.66px solid var(--color-border-soft);
}

.hero-inner {
  padding: 72px 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-title {
  margin: 0;
  color: var(--color-ink);
  font-size: var(--text-heading-lg);
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: var(--tracking-heading);
}

.hero-copy {
  margin: 24px 0 40px;
  max-width: 672px;
  color: var(--color-muted);
  font-size: var(--text-base);
  line-height: 1.625;
  letter-spacing: var(--tracking-base);
}

@media (max-width: 640px) {
  .hero-inner {
    padding: 56px 0 64px;
  }

  .hero-copy {
    margin: 16px 0 32px;
  }
}
</style>
