import { beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";
import { useHorizontalScroller } from "@/composables/useHorizontalScroller";

describe("useHorizontalScroller", () => {
  let mockElement: HTMLElement;
  let gridRef: ReturnType<typeof ref<HTMLElement | null>>;
  let items: ReturnType<typeof ref<readonly unknown[]>>;

  beforeEach(() => {
    // Create a mock element with necessary properties
    mockElement = {
      scrollLeft: 0,
      scrollWidth: 1000,
      clientWidth: 500,
      scrollBy: vi.fn(),
      querySelector: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      getBoundingClientRect: vi.fn(() => ({
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      })),
    } as unknown as HTMLElement;

    gridRef = ref<HTMLElement | null>(mockElement);
    items = ref([1, 2, 3, 4, 5]);

    // Mock window methods
    vi.stubGlobal("requestAnimationFrame", (cb: () => void) => {
      cb();
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());

    // Mock getComputedStyle
    vi.stubGlobal(
      "getComputedStyle",
      vi.fn(() => ({
        columnGap: "24px",
        gap: "24px",
      })),
    );
  });

  it("initializes with correct default state", () => {
    const { canScrollPrev, canScrollNext } = useHorizontalScroller(gridRef, items);

    expect(canScrollPrev.value).toBe(false);
    expect(canScrollNext.value).toBe(false);
  });

  it("detects overflow and enables scrollNext when content overflows", () => {
    mockElement.scrollWidth = 1000;
    mockElement.clientWidth = 500;
    mockElement.scrollLeft = 0;

    const { canScrollPrev, canScrollNext, updateScrollState } = useHorizontalScroller(gridRef, items);

    updateScrollState();

    expect(canScrollPrev.value).toBe(false);
    expect(canScrollNext.value).toBe(true);
  });

  it("enables both scroll buttons when scrolled in the middle", () => {
    mockElement.scrollWidth = 1000;
    mockElement.clientWidth = 500;
    mockElement.scrollLeft = 250;

    const { canScrollPrev, canScrollNext, updateScrollState } = useHorizontalScroller(gridRef, items);

    updateScrollState();

    expect(canScrollPrev.value).toBe(true);
    expect(canScrollNext.value).toBe(true);
  });

  it("disables scrollNext when scrolled to the end", () => {
    mockElement.scrollWidth = 1000;
    mockElement.clientWidth = 500;
    mockElement.scrollLeft = 500; // At the end

    const { canScrollPrev, canScrollNext, updateScrollState } = useHorizontalScroller(gridRef, items);

    updateScrollState();

    expect(canScrollPrev.value).toBe(true);
    expect(canScrollNext.value).toBe(false);
  });

  it("disables both buttons when no overflow", () => {
    mockElement.scrollWidth = 500;
    mockElement.clientWidth = 500;
    mockElement.scrollLeft = 0;

    const { canScrollPrev, canScrollNext, updateScrollState } = useHorizontalScroller(gridRef, items);

    updateScrollState();

    expect(canScrollPrev.value).toBe(false);
    expect(canScrollNext.value).toBe(false);
  });

  it("calls scrollBy with correct amount when scrollNext is invoked", () => {
    const mockCard = {
      getBoundingClientRect: () => ({ width: 200 }),
    } as HTMLElement;

    mockElement.querySelector = vi.fn(() => mockCard);

    const { scrollNext } = useHorizontalScroller(gridRef, items, {
      itemSelector: ".show-list__card",
    });

    scrollNext();

    expect(mockElement.scrollBy).toHaveBeenCalledWith({
      left: 224, // 200px (card width) + 24px (gap)
      behavior: "smooth",
    });
  });

  it("calls scrollBy with negative amount when scrollPrev is invoked", () => {
    const mockCard = {
      getBoundingClientRect: () => ({ width: 200 }),
    } as HTMLElement;

    mockElement.querySelector = vi.fn(() => mockCard);

    const { scrollPrev } = useHorizontalScroller(gridRef, items, {
      itemSelector: ".show-list__card",
    });

    scrollPrev();

    expect(mockElement.scrollBy).toHaveBeenCalledWith({
      left: -224, // -(200px + 24px)
      behavior: "smooth",
    });
  });

  it("uses fallback scroll amount when no item is found", () => {
    mockElement.querySelector = vi.fn(() => null);
    mockElement.clientWidth = 500;

    const { scrollNext } = useHorizontalScroller(gridRef, items);

    scrollNext();

    expect(mockElement.scrollBy).toHaveBeenCalledWith({
      left: 400, // 500 * 0.8 (FALLBACK_SCROLL_RATIO)
      behavior: "smooth",
    });
  });

  it("handles null gridRef gracefully", () => {
    const nullGridRef = ref<HTMLElement | null>(null);

    const { scrollNext, scrollPrev, updateScrollState } = useHorizontalScroller(nullGridRef, items);

    expect(() => {
      scrollNext();
      scrollPrev();
      updateScrollState();
    }).not.toThrow();
  });

  it("uses fallback overflow detection when scrollWidth is 0", () => {
    mockElement.scrollWidth = 0;
    mockElement.clientWidth = 500;
    mockElement.scrollLeft = 0;

    const { canScrollNext, updateScrollState } = useHorizontalScroller(gridRef, items, {
      fallbackItemsThreshold: 3,
    });

    updateScrollState();

    // Should enable next button because items.length (5) > fallbackItemsThreshold (3)
    expect(canScrollNext.value).toBe(true);
  });

  it("does not enable scroll when items are below fallback threshold", () => {
    mockElement.scrollWidth = 0;
    mockElement.clientWidth = 500;
    items.value = [1, 2]; // Only 2 items

    const { canScrollNext, updateScrollState } = useHorizontalScroller(gridRef, items, {
      fallbackItemsThreshold: 3,
    });

    updateScrollState();

    expect(canScrollNext.value).toBe(false);
  });

  it("updates state when items change", async () => {
    mockElement.scrollWidth = 1000;
    mockElement.clientWidth = 500;
    mockElement.scrollLeft = 0;

    const { canScrollNext, updateScrollState } = useHorizontalScroller(gridRef, items);

    // Initially should detect overflow
    updateScrollState();
    const initialState = canScrollNext.value;

    // Trigger items change
    items.value = [1, 2, 3, 4, 5, 6, 7, 8];
    await nextTick();

    // State should remain consistent after items update
    expect(canScrollNext.value).toBe(initialState);
  });

  it("handles custom item selector", () => {
    const mockCard = {
      getBoundingClientRect: () => ({ width: 150 }),
    } as HTMLElement;

    mockElement.querySelector = vi.fn(() => mockCard);

    const { scrollNext } = useHorizontalScroller(gridRef, items, {
      itemSelector: ".custom-selector",
    });

    scrollNext();

    expect(mockElement.querySelector).toHaveBeenCalledWith(".custom-selector");
  });

  it("respects scroll end tolerance", () => {
    mockElement.scrollWidth = 1000;
    mockElement.clientWidth = 500;
    mockElement.scrollLeft = 499.5; // Just within tolerance (1px)

    const { canScrollNext, updateScrollState } = useHorizontalScroller(gridRef, items);

    updateScrollState();

    expect(canScrollNext.value).toBe(false);
  });

  it("parses gap from styles correctly", () => {
    vi.stubGlobal(
      "getComputedStyle",
      vi.fn(() => ({
        columnGap: "16px",
        gap: "16px",
      })),
    );

    const mockCard = {
      getBoundingClientRect: () => ({ width: 100 }),
    } as HTMLElement;

    mockElement.querySelector = vi.fn(() => mockCard);

    const { scrollNext } = useHorizontalScroller(gridRef, items);

    scrollNext();

    expect(mockElement.scrollBy).toHaveBeenCalledWith({
      left: 116, // 100px + 16px gap
      behavior: "smooth",
    });
  });

  it("handles missing gap in styles", () => {
    vi.stubGlobal(
      "getComputedStyle",
      vi.fn(() => ({
        columnGap: "",
        gap: "",
      })),
    );

    const mockCard = {
      getBoundingClientRect: () => ({ width: 100 }),
    } as HTMLElement;

    mockElement.querySelector = vi.fn(() => mockCard);

    const { scrollNext } = useHorizontalScroller(gridRef, items);

    scrollNext();

    expect(mockElement.scrollBy).toHaveBeenCalledWith({
      left: 100, // Just card width, no gap
      behavior: "smooth",
    });
  });
});
