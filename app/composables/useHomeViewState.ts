export type HomeViewState = 'error' | 'loading' | 'empty' | 'ready'

interface HomeStateInput {
  error: Ref<unknown>
  pending: Ref<boolean>
  genres: Ref<unknown[] | undefined>
}

export function useHomeViewState({ error, pending, genres }: HomeStateInput) {
  const hasGenres = computed(() => (genres.value?.length || 0) > 0)

  const viewState = computed<HomeViewState>(() => {
    if (error.value) return 'error'
    if (pending.value) return 'loading'
    if (hasGenres.value) return 'ready'
    return 'empty'
  })

  const isError = computed(() => viewState.value === 'error')
  const isLoading = computed(() => viewState.value === 'loading')
  const isEmpty = computed(() => viewState.value === 'empty')
  const isReady = computed(() => viewState.value === 'ready')

  return {
    viewState,
    hasGenres,
    isError,
    isLoading,
    isEmpty,
    isReady,
  }
}
