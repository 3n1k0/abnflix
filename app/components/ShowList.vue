<template>
  <section class="show-list">
    <header class="show-list__header">
      <h2 class="show-list__title">{{ title }}</h2>
    </header>

    <div class="show-list__body">
      <button
        type="button"
        class="show-list__scroll show-list__scroll--prev"
        :class="{ 'is-hidden': !canScrollPrev }"
        aria-label="Scroll shows backward"
        :aria-disabled="!canScrollPrev"
        @click="scrollPrev"
      >
        <ChevronLeftIcon />
      </button>

      <ul ref="gridRef" class="show-list__grid">
        <li
          v-for="(show, index) in normalizedShows"
          :key="show.id ?? show.title"
          class="show-list__card"
        >
          <ShowCard
            :id="show.id"
            :slug="show.slug"
            :title="show.title"
            :year="show.year"
            :rating="show.rating"
            :image-src="show.imageSrc"
            :alt="`${show.title} poster`"
            :eager-load="index < eagerLoadCount"
            :fetch-priority="index === 0 ? 'high' : 'auto'"
          />
        </li>
        <li class="show-list__card show-list__view-all-card">
          <button type="button" class="show-list__view-all-button" @click="emit('view-all')">
            <span class="show-list__view-all-text">{{ actionLabel }}</span>
            <ChevronRightIcon />
          </button>
        </li>
      </ul>

      <button
        type="button"
        class="show-list__scroll show-list__scroll--next"
        aria-label="Scroll shows forward"
        :class="{ 'is-hidden': !canScrollNext }"
        :aria-disabled="!canScrollNext"
        @click="scrollNext"
      >
        <ChevronRightIcon />
      </button>
    </div>
  </section>
</template>

<script setup>
import ChevronLeftIcon from './icons/ChevronLeftIcon.vue'
import ChevronRightIcon from './icons/ChevronRightIcon.vue'
import ShowCard from './ShowCard.vue'

const emit = defineEmits(['view-all'])

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  actionLabel: {
    type: String,
    required: true,
  },
  shows: {
    type: Array,
    default: undefined,
  },
  eagerLoadCount: {
    type: Number,
    default: 0,
  },
})

const normalizedShows = computed(() => props.shows?.slice() || [])

const gridRef = ref(null)

const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useHorizontalScroller(
  gridRef,
  '.show-list__card'
)
</script>

<style scoped>
.show-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.show-list__body {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
}

.show-list__header {
  display: flex;
  align-items: center;
}

.show-list__title {
  margin: 0;
  font-size: var(--text-base);
  line-height: 1.5;
  letter-spacing: var(--tracking-base);
  font-weight: 600;
  color: var(--color-ink);
  text-transform: capitalize;
  padding-left: calc(var(--scroll-button-size) + 12px);
}

.show-list__view-all-card {
  display: flex;
  align-items: center;
  justify-content: center;
}

.show-list__view-all-button {
  width: 100%;
  height: 100%;
  border: 2px dashed var(--color-border-soft);
  background: var(--gradient-card);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 16px;
}

.show-list__view-all-button:hover,
.show-list__view-all-button:focus-visible {
  border-color: var(--color-primary);
  background: var(--gradient-card-hover);
  transform: translateY(-2px);
}

.show-list__view-all-text {
  color: var(--color-primary);
  font-size: var(--text-base);
  font-weight: 500;
  text-align: center;
}

.show-list__view-all-button svg {
  width: var(--icon-lg);
  height: var(--icon-lg);
  color: var(--color-primary);
}

.show-list__grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: var(--card-width);
  gap: 16px;
  overflow-x: auto;
  padding: 8px 0;
  margin: 0;
  list-style: none;
  scroll-snap-type: x mandatory;
}

.show-list__card {
  list-style: none;
  scroll-snap-align: start;
}

.show-list__scroll {
  width: var(--scroll-button-size);
  height: var(--scroll-button-size);
  border-radius: 50%;
  border: none;
  background: var(--color-scroll-button);
  color: var(--color-bg-white);
  box-shadow: var(--shadow-elevated);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.show-list__scroll--prev.is-hidden,
.show-list__scroll--next.is-hidden {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}

.show-list__scroll svg {
  width: var(--icon-md);
  height: var(--icon-md);
}

.show-list__scroll:hover,
.show-list__scroll:focus-visible {
  background: var(--color-scroll-button-hover);
}

@media (max-width: 640px) {
  .show-list__title {
    padding-left: calc(var(--scroll-button-size-mobile) + 12px);
  }

  .show-list__grid {
    grid-auto-columns: minmax(70%, 1fr);
    padding: 8px 0;
  }

  .show-list__scroll {
    width: var(--scroll-button-size-mobile);
    height: var(--scroll-button-size-mobile);
  }
}
</style>
