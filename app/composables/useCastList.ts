import type { CastMember } from '~~/types/shows'

const DEFAULT_VISIBLE_COUNT = 4

export function useCastList(cast: Ref<CastMember[] | null | undefined>) {
  const list = computed(() => cast.value ?? [])

  const showAll = ref(false)

  const visible = computed(() =>
    showAll.value ? list.value : list.value.slice(0, DEFAULT_VISIBLE_COUNT)
  )

  const hasMore = computed(() => list.value.length > DEFAULT_VISIBLE_COUNT)

  const toggle = () => (showAll.value = !showAll.value)

  const errors = reactive<Record<number, boolean>>({})

  const onImageError = (rawId: number | string) => {
    const id = Number(rawId)
    errors[id] = true
  }

  const visibleWithErrorState = computed(() =>
    visible.value.map((member) => ({
      ...member,
      hasError: errors[Number(member.id)] === true,
    }))
  )

  return {
    visible,
    visibleWithErrorState,
    hasMore,
    showAll,
    toggle,
    errors,
    onImageError,
  }
}
