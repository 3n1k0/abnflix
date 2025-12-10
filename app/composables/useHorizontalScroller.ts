import type { Ref } from 'vue'

/**
 * Composable for managing horizontal scrolling with navigation controls.
 * Provides scroll state tracking and smooth scrolling functionality based on item width.
 *
 * @param scrollerRef - Reactive reference to the scrollable container element
 * @param itemSelector - CSS selector for individual items to calculate scroll amount
 * @returns Object containing scroll state and control functions
 * @returns canScrollPrev - Reactive boolean indicating if scrolling left is possible
 * @returns canScrollNext - Reactive boolean indicating if scrolling right is possible
 * @returns scrollNext - Function to scroll forward by one item width
 * @returns scrollPrev - Function to scroll backward by one item width
 * @returns updateScrollState - Function to manually update scroll state
 *
 * @example
 * ```ts
 * const scrollerRef = ref<HTMLElement>(null!)
 * const { canScrollPrev, canScrollNext, scrollNext, scrollPrev } = useHorizontalScroller(
 *   scrollerRef,
 *   '.show-list__card'
 * )
 * ```
 */
export function useHorizontalScroller(scrollerRef: Ref<HTMLElement>, itemSelector: string) {
  const canScrollPrev = ref(false)
  const canScrollNext = ref(false)

  const updateScrollState = () => {
    const scrollerElement = scrollerRef.value

    const maxScrollLeft = scrollerElement.scrollWidth - scrollerElement.clientWidth
    const hasOverflow = scrollerElement.scrollWidth > scrollerElement.clientWidth

    canScrollPrev.value = hasOverflow && scrollerElement.scrollLeft > 0
    canScrollNext.value = hasOverflow && Math.round(scrollerElement.scrollLeft) < maxScrollLeft
  }

  const getScrollAmount = () => {
    const scrollerElement = scrollerRef.value

    const firstItem = scrollerElement.querySelector(itemSelector)
    if (!firstItem) return 0

    const gap = parseFloat(getComputedStyle(scrollerElement).columnGap || '0')
    return firstItem.getBoundingClientRect().width + gap
  }

  const scrollByAmount = (amount: number) => {
    const scrollerElement = scrollerRef.value
    scrollerElement.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const scrollNext = () => scrollByAmount(getScrollAmount())
  const scrollPrev = () => scrollByAmount(-getScrollAmount())

  onMounted(() => {
    const scrollerElement = scrollerRef.value

    updateScrollState()

    scrollerElement.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
  })

  onBeforeUnmount(() => {
    const scrollerElement = scrollerRef.value

    scrollerElement.removeEventListener('scroll', updateScrollState)
    window.removeEventListener('resize', updateScrollState)
  })

  return {
    canScrollPrev,
    canScrollNext,
    scrollNext,
    scrollPrev,
    updateScrollState,
  }
}
