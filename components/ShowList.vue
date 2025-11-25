<template>
  <section class="show-list">
    <header class="show-list__header">
      <h2 class="show-list__title">{{ title }}</h2>
      <button type="button" class="show-list__action" @click="$emit('view-all')">
        {{ actionLabel }}
      </button>
    </header>

    <div class="show-list__body">
      <button
        type="button"
        class="show-list__scroll show-list__scroll--prev"
        :class="{ 'is-hidden': !canScrollPrev }"
        @click="scrollPrev"
        aria-label="Scroll shows backward"
        :aria-hidden="!canScrollPrev"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15.41 7.41 10.83 12l4.58 4.59L15 18l-6-6 6-6z" fill="currentColor" />
        </svg>
      </button>

      <div ref="gridRef" class="show-list__grid" role="list">
        <ShowCard
          v-for="show in shows"
          :key="show.title"
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
        :aria-hidden="!canScrollNext"
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
import { nextTick, onBeforeUnmount, onMounted, ref, toRefs } from "vue";
import ShowCard from "./ShowCard.vue";

interface ShowItem {
  title: string;
  year?: string | number;
  rating?: string | number | null;
  imageSrc?: string;
}

interface Props {
  title?: string;
  actionLabel?: string;
  shows?: ShowItem[];
}

const props = withDefaults(defineProps<Props>(), {
  title: "Drama",
  actionLabel: "View All",
  shows: () => [
    { title: "Midnight Chronicles", year: "2023", rating: "8.7", imageSrc: "/images/show-list-1.png" },
    { title: "City Lights", year: "2024", rating: "9.1", imageSrc: "/images/show-list-2.png" },
    { title: "Cinematic Dreams", year: "2023", rating: "7.8", imageSrc: "/images/show-list-3.png" },
    { title: "Starlight Academy", year: "2024", rating: "8.5", imageSrc: "/images/show-list-4.png" },
    { title: "Wilderness Rescue", year: "2024", rating: "8.2", imageSrc: "/images/show-list-5.png" },
    { title: "Cinematic Dreams", year: "2023", rating: "7.8", imageSrc: "/images/show-list-3.png" },
    { title: "Starlight Academy", year: "2024", rating: "8.5", imageSrc: "/images/show-list-4.png" },
    { title: "Wilderness Rescue", year: "2024", rating: "8.2", imageSrc: "/images/show-list-5.png" },
  ],
});

const { title, actionLabel, shows } = toRefs(props);

defineEmits<{ (e: "view-all"): void }>();

const gridRef = ref<HTMLElement | null>(null);
const canScrollPrev = ref(false);
const canScrollNext = ref(false);

const updateScrollState = () => {
  const grid = gridRef.value;
  if (!grid) return;

  const { scrollLeft, scrollWidth, clientWidth } = grid;
  const fallbackOverflow = (shows.value?.length || 0) > 3;
  const overflow = scrollWidth - clientWidth > 4 || (scrollWidth === 0 && fallbackOverflow);

  canScrollPrev.value = overflow && scrollLeft > 0;
  const maxScrollLeft = Math.max(scrollWidth - clientWidth, 0);
  const atEnd = scrollWidth === 0 ? false : scrollLeft >= maxScrollLeft - 1;
  canScrollNext.value = overflow && !atEnd;
};

let frameId: number | null = null;
const scheduleUpdate = () => {
  if (frameId) cancelAnimationFrame(frameId);
  frameId = requestAnimationFrame(updateScrollState);
};

const getScrollAmount = () => {
  const grid = gridRef.value;
  if (!grid) return 0;

  const firstCard = grid.querySelector<HTMLElement>(".show-list__card");
  const styles = getComputedStyle(grid);
  const gap = parseFloat(styles.columnGap || styles.gap || "0");
  return firstCard ? firstCard.getBoundingClientRect().width + gap : grid.clientWidth * 0.8;
};

const scrollNext = () => {
  const grid = gridRef.value;
  if (!grid) return;
  grid.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  scheduleUpdate();
};

const scrollPrev = () => {
  const grid = gridRef.value;
  if (!grid) return;
  grid.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  scheduleUpdate();
};

onMounted(() => {
  const grid = gridRef.value;
  if (!grid) return;

  updateScrollState();
  grid.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  nextTick(updateScrollState);
});

onBeforeUnmount(() => {
  const grid = gridRef.value;
  if (grid) grid.removeEventListener("scroll", scheduleUpdate);
  window.removeEventListener("resize", scheduleUpdate);
  if (frameId) cancelAnimationFrame(frameId);
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
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.0195em;
  font-weight: 400;
  color: var(--color-ink);
}

.show-list__action {
  border: none;
  background: none;
  padding: 0;
  color: #e17100;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: -0.0107em;
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
