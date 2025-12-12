import type { CastMember } from '~~/types/shows'

const DEFAULT_VISIBLE_COUNT = 4

/**
 * Manages show more/less functionality for a cast list.
 * Provides computed visible members and toggle state for expanding/collapsing the list.
 *
 * @param cast - Reactive reference to the full cast member array
 * @returns Object containing visible cast members, expansion state, and toggle controls
 */
export function useCastList(cast: Ref<CastMember[]>) {
  const isShowAllOpen = ref(false)

  const visibleCastMembers = computed(() =>
    isShowAllOpen.value ? cast.value : cast.value.slice(0, DEFAULT_VISIBLE_COUNT)
  )

  const hasMore = computed(() => cast.value.length > DEFAULT_VISIBLE_COUNT)

  const toggle = () => (isShowAllOpen.value = !isShowAllOpen.value)

  return {
    visibleCastMembers,
    hasMore,
    isShowAllOpen,
    toggle,
  }
}
