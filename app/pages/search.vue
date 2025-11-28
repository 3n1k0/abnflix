<template>
  <main role="main" class="search-page">
    <section class="search-hero" aria-labelledby="search-title">
      <div class="search-hero__inner container">
        <BackButton class="search-hero__back" />

        <div class="search-hero__header">
          <p class="search-hero__eyebrow">Search</p>
          <h1 id="search-title" class="search-hero__title">Find the show you're craving</h1>
          <p class="search-hero__copy">
            Look up titles across every genre and language. We surface the best matches instantly.
          </p>
        </div>
        <HeroSearch v-model="searchInput" />

        <p class="search-hero__hint" aria-live="polite">
          {{ hintMessage }}
        </p>
      </div>
    </section>
    <section class="container search-results" aria-live="polite" aria-labelledby="search-results-heading">
      <h2 id="search-results-heading" class="sr-only">Search results</h2>
      <div
        v-if="searchState !== 'results'"
        class="search-results__state"
        :class="{ 'search-results__state--error': searchState === 'error' }"
        :role="searchState === 'error' ? 'alert' : undefined"
      >
        <p>{{ stateMessage }}</p>
      </div>
      <ul v-if="searchState === 'results'" class="search-results__grid">
        <li
          v-for="(show, index) in results"
          :key="show.id ?? `${show.title}-${index}`"
          class="search-results__item"
        >
          <ShowCard
            :id="show.id || `${show.title}-${index}`"
            :slug="show.slug || show.id"
            :title="show.title"
            :year="show.year"
            :rating="show.rating"
            :image-src="show.imageSrc"
            :alt="`${show.title} poster`"
          />
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

const searchInput = computed({
  get: () => {
    const q = route.query.q
    return typeof q === 'string' ? q : ''
  },
  set: (value) => {
    const normalized = value.trim()
    router.replace({
      path: '/search',
      query: normalized ? { q: normalized } : {},
    })
  },
})

// Plug into your composable
const { results, error, hasQuery, hasResults, trimmedQuery } = useShowSearch(searchInput)

const searchState = computed(() => {
  if (error.value) return 'error'
  if (!hasQuery.value) return 'idle'
  if (hasResults.value) return 'results'
  return 'no-results'
})

const hintMessage = computed(() => {
  if (!hasQuery.value) return 'Try "The Office", "Game of Thrones", or "Stranger Things".'
  if (hasResults.value) return `${results.value.length} results for "${trimmedQuery.value}"`
  return `No matches for "${trimmedQuery.value}" yet.`
})

const stateMessage = computed(() => {
  switch (searchState.value) {
    case 'error':
      return "We couldn't search right now. Please try again."
    case 'idle':
      return 'Start typing a show name to see matches.'
    case 'no-results':
      return `No shows found for "${trimmedQuery.value}".`
    default:
      return ''
  }
})

useSeoMeta({
  title: 'Search TV Shows',
  description: 'Search thousands of TV shows instantly by title, genre, or language.',
  ogTitle: 'Search TV Shows',
  ogDescription: 'Search thousands of TV shows instantly by title, genre, or language.',
})
</script>

<style scoped>
.search-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 80px;
}

.search-hero {
  border-bottom: 0.66px solid var(--color-border-soft);
  background: var(--gradient-hero);
}

.search-hero__inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 48px 0 36px;
}

.search-hero__back {
  align-self: flex-start;
}

.search-hero__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-hero__eyebrow {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-tight);
  text-transform: uppercase;
}

.search-hero__title {
  margin: 0;
  font-size: 30px;
  line-height: 1.25;
  letter-spacing: var(--tracking-heading);
  color: var(--color-ink);
}

.search-hero__copy {
  margin: 0;
  max-width: 640px;
  color: var(--color-muted);
  font-size: var(--text-base);
  line-height: 1.6;
}

.search-hero__hint {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.5;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-results__grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-auto-rows: auto;
  gap: 18px;
  align-items: stretch;
  padding: 0;
  margin: 0;
  list-style: none;
}

.search-results__item {
  list-style: none;
}

.search-results__state {
  padding: 40px 16px;
  background: var(--color-bg-white);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  text-align: center;
  color: var(--color-muted);
  box-shadow: var(--shadow-card);
}

.search-results__state--error {
  color: var(--color-error);
  border-color: var(--color-error-border-subtle);
}

.search-results__state p {
  margin: 0;
}

@media (max-width: 640px) {
  .search-page {
    gap: 24px;
  }

  .search-hero__inner {
    padding: 32px 0 28px;
  }

  .search-hero__title {
    font-size: 26px;
  }

  .search-results__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
}

@media (max-width: 960px) and (min-width: 641px) {
  .search-results__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
