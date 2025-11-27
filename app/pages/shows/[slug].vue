<template>
  <main role="main" class="show-detail">
    <div class="container">
      <BackButton />
      <div v-if="show" class="show-detail__content">
        <div class="show-detail__poster">
          <NuxtImg
            :src="show.imageSrc"
            :alt="show.alt || `${show.title} poster`"
            width="400"
            height="600"
            format="webp"
            quality="75"
            fit="cover"
            loading="eager"
            decoding="async"
            sizes="(max-width: 640px) 80vw, 400px"
          />
          <RatingBadge
            v-if="show.rating != null"
            class="show-detail__rating"
            :value="show.rating"
          />
        </div>
        <div class="show-detail__info">
          <h1 class="show-detail__title">{{ show.title }}</h1>
          <p v-if="show.year" class="show-detail__year">{{ show.year }}</p>
          <div class="show-detail__description">
            <h2>About this show</h2>
            <p>
              {{ show.title }} is a popular show with a rating of {{ show.rating }}/10. This
              {{ show.year }} production has become a must-watch for fans of quality television.
            </p>
          </div>

          <div v-if="show.url" class="show-detail__external">
            <a :href="show.url" target="_blank" rel="noopener noreferrer" class="external-link">
              View on TV Maze
            </a>
          </div>
        </div>
      </div>

      <div v-else class="show-detail__not-found">
        <h1>Show Not Found</h1>
        <p>The show you're looking for doesn't exist.</p>
        <BackButton />
      </div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const { dramaShows, comedy, horror, thriller } = useShows()

const allShows = computed(() => [
  ...dramaShows.value,
  ...comedy.value,
  ...horror.value,
  ...thriller.value,
])

const show = computed(() => {
  const slug = route.params.slug
  return allShows.value.find((s) => s.slug === slug)
})

const showTitle = computed(() =>
  show.value ? `${show.value.title} - TV Shows Dashboard` : 'Show Not Found'
)

const showDescription = computed(() => {
  if (!show.value) {
    return 'Show not found on TV Shows Dashboard.'
  }

  const year = show.value.year ? ` (${show.value.year})` : ''
  const rating = show.value.rating != null ? ` Rated ${show.value.rating}/10.` : ''

  return `${show.value.title}${year} on TV Shows Dashboard.${rating}`
})

useSeoMeta({
  title: () => showTitle.value,
  description: () => showDescription.value,
  ogTitle: () => showTitle.value,
  ogDescription: () => showDescription.value,
})
</script>

<style scoped>
.show-detail {
  min-height: calc(100vh - 64px);
  padding: 48px 0;
}

.show-detail__content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 48px;
  align-items: start;
}

.show-detail__poster {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--gradient-card);
  box-shadow: var(--shadow-elevated);
}

.show-detail__poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.show-detail__rating {
  position: absolute;
  top: 16px;
  right: 16px;
}

.show-detail__info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.show-detail__title {
  margin: 0;
  font-size: 48px;
  line-height: 1.2;
  letter-spacing: var(--tracking-heading);
  font-weight: 600;
  color: var(--color-ink);
}

.show-detail__year {
  margin: 0;
  font-size: 20px;
  line-height: 1.5;
  letter-spacing: var(--tracking-base);
  color: var(--color-muted);
}

.show-detail__description h2 {
  margin: 0 0 16px 0;
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: var(--tracking-heading);
  font-weight: 600;
  color: var(--color-ink);
}

.show-detail__description p {
  margin: 0;
  font-size: var(--text-base);
  line-height: 1.625;
  letter-spacing: var(--tracking-base);
  color: var(--color-muted);
}

.show-detail__external {
  margin-top: 16px;
}

.external-link {
  display: inline-flex;
  align-items: center;
  padding: 14px 24px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: var(--color-bg-white);
  font-size: var(--text-base);
  line-height: 1.5;
  letter-spacing: var(--tracking-base);
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-card);
}

.external-link:hover {
  background: var(--color-ink);
  transform: translateY(-2px);
  box-shadow: var(--shadow-elevated);
}

.show-detail__not-found {
  text-align: center;
  padding: 80px 0;
}

.show-detail__not-found h1 {
  margin: 0 0 16px 0;
  font-size: 48px;
  line-height: 1.2;
  letter-spacing: var(--tracking-heading);
  font-weight: 600;
  color: var(--color-ink);
}

.show-detail__not-found p {
  margin: 0 0 32px 0;
  font-size: var(--text-base);
  line-height: 1.625;
  letter-spacing: var(--tracking-base);
  color: var(--color-muted);
}

@media (max-width: 768px) {
  .show-detail {
    padding: 24px 0;
  }

  .show-detail__content {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .show-detail__poster {
    max-width: 100%;
  }

  .show-detail__title {
    font-size: 32px;
  }

  .show-detail__description h2 {
    font-size: 20px;
  }
}
</style>
