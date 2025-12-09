import type { ShowsResponse } from '../../types/shows'
import { computed } from 'vue'
import { useAsyncData } from 'nuxt/app'

export function useShows() {
  const {
    data: rawShows,
    pending,
    error,
    refresh,
  } = useAsyncData<ShowsResponse>('shows-v4', () => $fetch<ShowsResponse>('/api/shows?v=4'))

  const genres = computed(() => rawShows.value?.genres || [])
  const allShows = computed(() => genres.value.flatMap((genre) => genre.shows || []))

  return {
    rawShows,
    pending,
    error,
    refresh,
    genres,
    allShows,
  }
}
