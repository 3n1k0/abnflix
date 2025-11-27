import type { ShowsResponse } from '../../types/shows'
import { computed } from 'vue'
import { useAsyncData } from 'nuxt/app'

export function useShows() {
  const {
    data: rawShows,
    pending,
    error,
  } = useAsyncData<ShowsResponse>('shows-v4', () => $fetch('/api/shows?v=4'))

  const genres = computed(() => rawShows.value?.genres || [])
  const totalGenres = computed(() => rawShows.value?.totalGenres || 0)
  const allShows = computed(() => genres.value.flatMap((genre) => genre.shows || []))

  return {
    rawShows,
    pending,
    error,
    genres,
    totalGenres,
    allShows,
  }
}
