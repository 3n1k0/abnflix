import type { Ref } from 'vue'

export function useHorizontalScroller(
  gridRef: Ref<HTMLElement | null>,
  items: Ref<unknown[]>,
  selector = '.show-list__card'
) {
  const canScrollPrev = ref(false)
  const canScrollNext = ref(false)

  const getEl = () => gridRef.value

  const updateScrollState = () => {
    const el = getEl()
    if (!el) return

    const max = el.scrollWidth - el.clientWidth
    const overflow = el.scrollWidth > el.clientWidth

    canScrollPrev.value = overflow && el.scrollLeft > 0
    canScrollNext.value = overflow && el.scrollLeft < max
  }

  const getScrollAmount = () => {
    const el = getEl()
    if (!el) return 0

    const item = el.querySelector(selector)
    if (!item) return el.clientWidth * 0.8

    const gap = parseFloat(getComputedStyle(el).columnGap || '0')
    return item.getBoundingClientRect().width + gap
  }

  const scrollByAmount = (amount: number) => {
    const el = getEl()
    if (!el) return
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const scrollNext = () => scrollByAmount(getScrollAmount())
  const scrollPrev = () => scrollByAmount(-getScrollAmount())

  const onScrollOrResize = () => updateScrollState()

  onMounted(() => {
    const el = getEl()
    if (!el) return

    updateScrollState()

    el.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
  })

  onBeforeUnmount(() => {
    const el = getEl()
    if (!el) return

    el.removeEventListener('scroll', onScrollOrResize)
    window.removeEventListener('resize', onScrollOrResize)
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
