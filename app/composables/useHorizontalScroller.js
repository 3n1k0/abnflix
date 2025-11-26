import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

// Scroll behavior constants
const SCROLL_OVERFLOW_THRESHOLD = 4; // Minimum pixel difference to consider content overflowing
const SCROLL_END_TOLERANCE = 1; // Pixel tolerance for detecting scroll end position
const FALLBACK_SCROLL_RATIO = 0.8; // Percentage of container width to scroll when item width is unknown

export const useHorizontalScroller = (
  gridRef,
  items,
  options = {}
) => {
  const { itemSelector = ".carousel-item", fallbackItemsThreshold = 3 } =
    options;
  const isClient = typeof window !== "undefined";

  // Initialize based on item count for SSR consistency
  const itemsLength = Array.isArray(items.value) ? items.value.length : 0;
  const hasEnoughItems = itemsLength > fallbackItemsThreshold;

  const canScrollPrev = ref(false);
  const canScrollNext = ref(hasEnoughItems); // Start with true if enough items
  let frameId = null;

  const updateScrollState = () => {
    const grid = gridRef.value;
    if (!grid) return;

    const { scrollLeft, scrollWidth, clientWidth } = grid;
    const itemsLength = Array.isArray(items.value) ? items.value.length : 0;
    const fallbackOverflow = itemsLength > fallbackItemsThreshold;
    const overflow =
      scrollWidth - clientWidth > SCROLL_OVERFLOW_THRESHOLD ||
      (scrollWidth === 0 && fallbackOverflow);

    canScrollPrev.value = overflow && scrollLeft > 0;
    const maxScrollLeft = Math.max(scrollWidth - clientWidth, 0);
    const atEnd =
      scrollWidth === 0
        ? false
        : scrollLeft >= maxScrollLeft - SCROLL_END_TOLERANCE;
    canScrollNext.value = overflow && !atEnd;
  };

  const scheduleUpdate = () => {
    if (!isClient) return;
    if (frameId) cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(updateScrollState);
  };

  const getScrollAmount = () => {
    const grid = gridRef.value;
    if (!grid) return 0;

    const firstCard = grid.querySelector(itemSelector);
    const styles = getComputedStyle(grid);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    return firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : grid.clientWidth * FALLBACK_SCROLL_RATIO;
  };

  const scrollNext = () => {
    if (!isClient) return;
    const grid = gridRef.value;
    if (!grid) return;
    grid.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    scheduleUpdate();
  };

  const scrollPrev = () => {
    if (!isClient) return;
    const grid = gridRef.value;
    if (!grid) return;
    grid.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    scheduleUpdate();
  };

  onMounted(() => {
    if (!isClient) return;
    const grid = gridRef.value;
    if (!grid) return;

    updateScrollState();
    grid.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    nextTick(updateScrollState);
  });

  watch(
    items,
    async () => {
      await nextTick();
      updateScrollState();
    },
    { deep: true }
  );

  onBeforeUnmount(() => {
    if (!isClient) return;
    const grid = gridRef.value;
    if (grid) grid.removeEventListener("scroll", scheduleUpdate);
    window.removeEventListener("resize", scheduleUpdate);
    if (frameId) cancelAnimationFrame(frameId);
  });

  return {
    canScrollPrev,
    canScrollNext,
    scrollNext,
    scrollPrev,
    updateScrollState,
  };
};
