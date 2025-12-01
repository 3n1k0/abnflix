export function useShowDetail(slugParam: Ref<string>) {
  const { allShows, pending: listPending } = useShows()

  const cachedShow = computed(() =>
    allShows.value.find(
      (s: { slug: string; id: unknown }) =>
        s.slug === slugParam.value || String(s.id) === slugParam.value
    )
  )

  const shouldFetch = computed(() => !cachedShow.value && Boolean(slugParam.value))

  const fetchShow = async () => {
    if (!shouldFetch.value) return null
    try {
      return await $fetch(`/api/shows/${encodeURIComponent(slugParam.value)}`)
    } catch {
      return null
    }
  }

  const { data: fetchedShow, pending: fetching } = useAsyncData(
    () => `show-detail-${slugParam.value}`,
    fetchShow,
    {
      watch: [slugParam],
      default: () => null,
    }
  )

  const show = computed(() => cachedShow.value || fetchedShow.value)

  const isLoading = computed(() => (listPending.value || fetching.value) && !show.value)

  const castCount = computed(() => null)
  const detailGenres = computed(() => show.value?.genres || [])
  const summaryText = computed(() => show.value?.summary || '')
  const episodeCount = computed(() => null)

  return {
    show,
    isLoading,
    summaryText,
    detailGenres,
    castCount,
    episodeCount,
  }
}
