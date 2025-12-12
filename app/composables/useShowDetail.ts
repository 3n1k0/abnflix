import type { ShowItem } from '../../types/shows'

export function useShowDetail(slugParam: Ref<string>) {
  const fetchShow = async () => {
    try {
      return await $fetch(`/api/shows/${encodeURIComponent(slugParam.value)}`)
    } catch {
      return null
    }
  }

  const { data: fetchedShow, pending: isPending } = useAsyncData(
    () => `show-detail-${slugParam.value}`,
    fetchShow,
    {
      watch: [slugParam],
      default: () => null,
    }
  )

  const show = computed(() => fetchedShow.value as ShowItem | null)

  const isLoading = computed(() => isPending.value && !show.value)

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
