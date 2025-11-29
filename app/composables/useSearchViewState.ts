import type { Ref, ComputedRef } from 'vue'

export type SearchState = 'idle' | 'loading' | 'results' | 'no-results' | 'error'

export interface SearchViewStateOptions {
  trimmedQuery: Ref<string> | ComputedRef<string>
  results: Ref<unknown[]>
  error: Ref<Error | null>
  pending?: Ref<boolean>
}

export interface SearchViewState {
  searchState: ComputedRef<SearchState>
  hintMessage: ComputedRef<string>
  stateMessage: ComputedRef<string>
}

export function useSearchViewState(options: SearchViewStateOptions): SearchViewState {
  const { trimmedQuery, results, error, pending } = options

  const hasQuery = computed(() => trimmedQuery.value.length > 0)
  const hasResults = computed(() => results.value.length > 0)
  const isLoading = computed(() => pending?.value === true)

  const searchState = computed<SearchState>(() => {
    if (error.value) return 'error'
    if (!hasQuery.value) return 'idle'
    if (isLoading.value) return 'loading'
    if (hasResults.value) return 'results'
    return 'no-results'
  })

  const hintMessage = computed(() => {
    if (!hasQuery.value) {
      return 'Try "The Office", "Game of Thrones", or "Stranger Things".'
    }

    if (hasResults.value) {
      const count = results.value.length
      const plural = count === 1 ? 'result' : 'results'
      return `${count} ${plural} for "${trimmedQuery.value}"`
    }

    if (isLoading.value) {
      return `Searching for "${trimmedQuery.value}"...`
    }

    return `No matches for "${trimmedQuery.value}" yet.`
  })

  const stateMessage = computed(() => {
    switch (searchState.value) {
      case 'error':
        return "We couldn't search right now. Please try again."
      case 'idle':
        return 'Start typing a show name to see matches.'
      case 'loading':
        return `Searching for "${trimmedQuery.value}"...`
      case 'no-results':
        return `No shows found for "${trimmedQuery.value}".`
      case 'results':
      default:
        return ''
    }
  })

  return {
    searchState,
    hintMessage,
    stateMessage,
  }
}
