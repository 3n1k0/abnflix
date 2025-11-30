import type { ShowItem } from '../../types/shows'

const MIN_QUERY_LENGTH = 2

export function useShowSearch(initialQuery: string | Ref<string> = '') {
  const query = isRef(initialQuery) ? initialQuery : ref(initialQuery)

  const trimmed = computed(() => query.value.trim())
  const hasQuery = computed(() => trimmed.value.length >= MIN_QUERY_LENGTH)

  const {
    data: results,
    pending,
    error,
    refresh,
  } = useAsyncData<ShowItem[]>(
    () => `show-search-${trimmed.value}`,
    async () => {
      if (!hasQuery.value) return []
      return $fetch(`/api/search?q=${encodeURIComponent(trimmed.value)}`)
    },
    {
      default: () => [],
      server: true,
      lazy: true,
      watch: [trimmed],
    }
  )
  const hasResults = computed(() => results.value?.length > 0)

  return {
    query,
    trimmedQuery: trimmed,
    hasQuery,
    hasResults,
    results,
    pending,
    error,
    refresh,
  }
}
