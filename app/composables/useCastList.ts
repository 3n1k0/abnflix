import type { CastMember } from '~~/types/shows'

const DEFAULT_VISIBLE_COUNT = 4

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
