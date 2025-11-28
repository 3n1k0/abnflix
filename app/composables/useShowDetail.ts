export function useShowDetail(slugParam: Ref<string>) {
  const { allShows, pending: listPending } = useShows()

  const cachedShow = computed(() =>
    allShows.value.find((s) => s.slug === slugParam.value || String(s.id) === slugParam.value)
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

  const showId = computed(() => show.value?.id)

  const { data: cast } = useAsyncData(
    () => `cast-${showId.value}`,
    () => (showId.value ? $fetch(`/api/shows/${showId.value}/cast`) : Promise.resolve(null)),
    { watch: [showId], default: () => null }
  )

  const castCount = computed(() => (cast.value == null ? null : cast.value.length))
  const detailGenres = computed(() => show.value?.genres || [])
  const summaryText = computed(() => show.value?.summary || '')
  const episodeCount = computed(() => 5)

  return {
    show,
    isLoading,
    summaryText,
    detailGenres,
    cast,
    castCount,
    episodeCount,
  }
}
