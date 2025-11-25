<template>
  <section class="show-list">
    <header class="show-list__header">
      <h2 class="show-list__title">{{ props.title }}</h2>
      <button type="button" class="show-list__action" @click="$emit('view-all')">
        {{ props.actionLabel }}
      </button>
    </header>

    <div class="show-list__body">
      <button
        type="button"
        class="show-list__scroll show-list__scroll--prev"
        :class="{ 'is-hidden': !canScrollPrev }"
        @click="scrollPrev"
        aria-label="Scroll shows backward"
        :aria-disabled="!canScrollPrev"
        :tabindex="canScrollPrev ? 0 : -1"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15.41 7.41 10.83 12l4.58 4.59L15 18l-6-6 6-6z" fill="currentColor" />
        </svg>
      </button>

      <div ref="gridRef" class="show-list__grid" role="list">
        <ShowCard
          v-for="show in normalizedShows"
          :key="show.id ?? show.title"
          role="listitem"
          class="show-list__card"
          :title="show.title"
          :year="show.year"
          :rating="show.rating"
          :image-src="show.imageSrc"
          :alt="`${show.title} poster`"
        />
      </div>

      <button
        type="button"
        class="show-list__scroll show-list__scroll--next"
        :class="{ 'is-hidden': !canScrollNext }"
        @click="scrollNext"
        aria-label="Scroll shows forward"
        :aria-disabled="!canScrollNext"
        :tabindex="canScrollNext ? 0 : -1"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import ShowCard from "./ShowCard.vue";
import { useHorizontalScroller } from "../composables/useHorizontalScroller";
import { defaultShows } from "../app/data/shows";
import type { ShowItem } from "../types/shows";

interface Props {
  title?: string;
  actionLabel?: string;
  shows?: ShowItem[];
}

const props = withDefaults(defineProps<Props>(), {
  title: "Drama",
  actionLabel: "View All",
  shows: () => defaultShows,
});

const normalizedShows = computed(() => (props.shows ?? defaultShows).slice());

defineEmits<{ (e: "view-all"): void }>();

const gridRef = ref<HTMLElement | null>(null);
const { canScrollPrev, canScrollNext, scrollNext, scrollPrev } = useHorizontalScroller(gridRef, normalizedShows, {
  itemSelector: ".show-list__card",
  fallbackItemsThreshold: 3,
});
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
  justify-content: space-between;
  gap: 16px;
}

.show-list__title {
  margin: 0;
  font-size: var(--text-base);
  line-height: 1.5;
  letter-spacing: var(--tracking-base);
  font-weight: 400;
  color: var(--color-ink);
}

.show-list__action {
  border: none;
  background: none;
  padding: 0;
  color: #e17100;
  font-size: var(--text-sm);
  line-height: 1.43;
  letter-spacing: var(--tracking-tight);
  cursor: pointer;
}

.show-list__action:hover,
.show-list__action:focus-visible {
  text-decoration: underline;
}

.show-list__grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 192px;
  gap: 16px;
  overflow-x: auto;
  padding: 8px 0;
  scroll-snap-type: x mandatory;
}

.show-list__card {
  scroll-snap-align: start;
}

.show-list__scroll {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  background: #1e2939;
  color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.show-list__scroll.is-hidden {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}

.show-list__scroll svg {
  width: 24px;
  height: 24px;
}

.show-list__scroll:hover,
.show-list__scroll:focus-visible {
  background: #111827;
}

@media (max-width: 640px) {
  .show-list__grid {
    grid-auto-columns: minmax(70%, 1fr);
    padding: 8px 0;
  }

  .show-list__scroll {
    width: 44px;
    height: 44px;
  }
}
</style>
