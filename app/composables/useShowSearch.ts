import { ref, computed, watch, isRef, type Ref } from 'vue'
import { useAsyncData } from 'nuxt/app'
import type { ShowItem } from '../../types/shows'

const MIN_QUERY_LENGTH = 2
const DEBOUNCE_MS = 250

function normalizeQuery(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function isMeaningfulQuery(value: string) {
  return value.length >= MIN_QUERY_LENGTH && /[a-zA-Z0-9]/.test(value)
}

export function useShowSearch(initialQuery: string | Ref<string> = '') {
  const query = isRef(initialQuery) ? initialQuery : ref(initialQuery)
  const trimmedQuery = computed(() => normalizeQuery(query.value))
  const meetsMinLength = computed(() => isMeaningfulQuery(trimmedQuery.value))

  const debouncedQuery = ref('')
  const lastQueried = ref('')
  let debounceHandle: ReturnType<typeof setTimeout> | undefined

  watch(
    trimmedQuery,
    (value) => {
      if (debounceHandle) clearTimeout(debounceHandle)

      if (!isMeaningfulQuery(value)) {
        debouncedQuery.value = ''
        return
      }

      debounceHandle = setTimeout(() => {
        debouncedQuery.value = value
      }, DEBOUNCE_MS)
    },
    { immediate: true }
  )

  const hasQuery = computed(() => debouncedQuery.value.length >= MIN_QUERY_LENGTH)

  const searchKey = computed(() =>
    hasQuery.value ? `search-shows-${debouncedQuery.value}` : 'search-shows-empty'
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
      return $fetch(`/api/search?q=${encodeURIComponent(debouncedQuery.value)}`)
    },
    {
      default: () => [],
      immediate: false,
    }
  )

  watch(
    debouncedQuery,
    async (value) => {
      if (!isMeaningfulQuery(value)) {
        results.value = []
        lastQueried.value = ''
        return
      }

      if (value === lastQueried.value) {
        return
      }

      lastQueried.value = value
      await refresh()
    },
    { immediate: true }
  )

  const hasResults = computed(() => Array.isArray(results.value) && results.value.length > 0)

  return {
    query,
    trimmedQuery,
    debouncedQuery,
    hasQuery,
    meetsMinLength,
    results,
    pending,
    error,
    refresh,
    hasResults,
  }
}
