export interface UseUrlSearchSyncOptions {
  router: ReturnType<typeof useRouter>
  route: ReturnType<typeof useRoute>
  queryParam?: string
}

export interface UseUrlSearchSync {
  searchInput: Ref<string>
}

export function useUrlSearchSync({
  router,
  route,
  queryParam = 'q',
}: UseUrlSearchSyncOptions): UseUrlSearchSync {
  const searchInput = ref('')

  const getQueryValue = () => {
    const raw = route.query[queryParam]
    return typeof raw === 'string' ? raw : ''
  }

  const syncFromRoute = () => {
    const urlValue = getQueryValue()
    if (urlValue !== searchInput.value) {
      searchInput.value = urlValue
    }
  }

  const syncToRoute = (value: string) => {
    const normalized = value.trim()
    const currentValue = getQueryValue()

    if (normalized === currentValue) return

    router.replace({
      path: route.path,
      query: normalized ? { [queryParam]: normalized } : {},
    })
  }

  watch(() => route.query[queryParam], syncFromRoute)
  watch(searchInput, syncToRoute)

  syncFromRoute()

  return { searchInput }
}
