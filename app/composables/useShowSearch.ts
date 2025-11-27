import { ref, computed, watch, isRef, type Ref } from 'vue'
import { useAsyncData } from 'nuxt/app'
import type { ShowItem } from '../../types/shows'

export function useShowSearch(initialQuery: string | Ref<string> = '') {
  const query = isRef(initialQuery) ? initialQuery : ref(initialQuery)
  const trimmedQuery = computed(() => query.value.trim())
  const hasQuery = computed(() => trimmedQuery.value.length > 0)

  const searchKey = computed(() =>
    hasQuery.value ? `search-shows-${trimmedQuery.value}` : 'search-shows-empty'
  )

  const {
    data: results,
    pending,
    error,
    refresh,
  } = useAsyncData<ShowItem[]>(
    searchKey,
    async () => {
      if (!hasQuery.value) return []
      return $fetch(`/api/search?q=${encodeURIComponent(trimmedQuery.value)}`)
    },
    {
      default: () => [],
      immediate: false,
    }
  )

  watch(
    trimmedQuery,
    async (value) => {
      if (!value) {
        results.value = []
        return
      }

      await refresh()
    },
    { immediate: true }
  )

  const hasResults = computed(() => Array.isArray(results.value) && results.value.length > 0)

  return {
    query,
    trimmedQuery,
    hasQuery,
    results,
    pending,
    error,
    refresh,
    hasResults,
  }
}
