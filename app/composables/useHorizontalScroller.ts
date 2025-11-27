import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import type { Ref } from 'vue'

interface ScrollState {
  canScrollPrev: Ref<boolean>
  canScrollNext: Ref<boolean>
  scrollNext: () => void
  scrollPrev: () => void
  updateScrollState: () => void
}

export function useHorizontalScroller<T = unknown>(
  gridRef: Ref<HTMLElement | null>,
  items: Ref<T[]>
): ScrollState {
  const canScrollPrev = ref(false)
  const canScrollNext = ref(false)

  const updateScrollState = (): void => {
    const grid = gridRef.value
    if (!grid) return

    const { scrollLeft, scrollWidth, clientWidth } = grid
    const maxScroll = scrollWidth - clientWidth

    const hasOverflow = scrollWidth > clientWidth + 2

    canScrollPrev.value = hasOverflow && scrollLeft > 0
    canScrollNext.value = hasOverflow && scrollLeft < maxScroll - 1
  }

  const getScrollAmount = (): number => {
    const grid = gridRef.value
    if (!grid) return 0

    const first = grid.querySelector('.carousel-item')
    const gap = parseFloat(getComputedStyle(grid).columnGap || '0')

    if (first) {
      return first.getBoundingClientRect().width + gap
    }

    return grid.clientWidth * 0.8 // fallback
  }

  const scrollNext = (): void => {
    const grid = gridRef.value
    if (!grid) return

    grid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' })
  }

  const scrollPrev = (): void => {
    const grid = gridRef.value
    if (!grid) return

    grid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' })
  }

  onMounted(() => {
    const grid = gridRef.value
    if (!grid) return

    updateScrollState()

    const listener = (): void => updateScrollState()
    grid.addEventListener('scroll', listener, { passive: true })
    window.addEventListener('resize', listener)

    nextTick(updateScrollState)

    onBeforeUnmount(() => {
      grid.removeEventListener('scroll', listener)
      window.removeEventListener('resize', listener)
    })
  })

  watch(items, () => {
    nextTick(updateScrollState)
  })

  return {
    canScrollPrev,
    canScrollNext,
    scrollNext,
    scrollPrev,
    updateScrollState,
  }
}
