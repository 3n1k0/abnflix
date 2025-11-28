import { ref, computed, watch, isRef, type Ref } from 'vue'
import { useAsyncData } from 'nuxt/app'
import type { ShowItem } from '../../types/shows'

const MIN_QUERY_LENGTH = 2
const DEBOUNCE_MS = 250

export function useShowSearch(initialQuery: string | Ref<string> = '') {
  const query = isRef(initialQuery) ? initialQuery : ref(initialQuery)

  const trimmed = computed(() => query.value.trim())
  const meaningful = computed(() => trimmed.value.length >= MIN_QUERY_LENGTH)

  const debounced = ref(trimmed.value)

  let timer = null as ReturnType<typeof setTimeout> | null

  watch(
    trimmed,
    (value) => {
      if (timer !== null) {
        clearTimeout(timer)
      }

      if (!meaningful.value) {
        debounced.value = ''
        return
      }

      timer = setTimeout(() => {
        debounced.value = value
      }, DEBOUNCE_MS)
    },
    { flush: 'post' }
  )

  const hasQuery = computed(() => debounced.value.length >= MIN_QUERY_LENGTH)

  const ssrKey = computed(() => `search-${trimmed.value}`)

  const {
    data: results,
    pending,
    error,
    refresh,
  } = useAsyncData<ShowItem[]>(
    ssrKey,
    async () => {
      if (!hasQuery.value) return []
      return $fetch(`/api/search?q=${encodeURIComponent(debounced.value)}`)
    },
    {
      default: () => [],
      server: true,
      lazy: false,
      immediate: true,
    }
  )

  const hasResults = computed(() => results.value?.length > 0)

  return {
    query,
    trimmedQuery: trimmed,
    debouncedQuery: debounced,
    hasQuery,
    hasResults,
    results,
    pending,
    error,
    refresh,
  }
}
