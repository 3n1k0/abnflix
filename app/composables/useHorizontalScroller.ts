import { ref, onMounted, onBeforeUnmount, watch, nextTick, type Ref } from 'vue'

export function useHorizontalScroller(gridRef: Ref<HTMLElement | null>, items: Ref<unknown[]>) {
  const canScrollPrev = ref(false)
  const canScrollNext = ref(false)

  const updateScrollState = () => {
    const el = gridRef.value
    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el
    const max = scrollWidth - clientWidth

    const overflow = scrollWidth > clientWidth

    canScrollPrev.value = overflow && scrollLeft > 0
    canScrollNext.value = overflow && scrollLeft < max
  }

  const getScrollAmount = () => {
    const el = gridRef.value
    if (!el) return 0

    const first = el.querySelector('.show-list__card')
    if (!first) return el.clientWidth * 0.8

    const gap = parseFloat(getComputedStyle(el).columnGap || '0')
    return first.getBoundingClientRect().width + gap
  }

  const scrollNext = () => {
    const el = gridRef.value
    if (!el) return
    el.scrollBy({ left: getScrollAmount(), behavior: 'smooth' })
  }

  const scrollPrev = () => {
    const el = gridRef.value
    if (!el) return
    el.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' })
  }

  onMounted(() => {
    const el = gridRef.value
    if (!el) return

    updateScrollState()

    const listener = () => updateScrollState()
    el.addEventListener('scroll', listener, { passive: true })
    window.addEventListener('resize', listener)

    onBeforeUnmount(() => {
      el.removeEventListener('scroll', listener)
      window.removeEventListener('resize', listener)
    })

    nextTick(updateScrollState)
  })

  watch(items, () => nextTick(updateScrollState))

  return {
    canScrollPrev,
    canScrollNext,
    scrollNext,
    scrollPrev,
    updateScrollState,
  }
}
