import type { ShowsByGenre } from '../../types/shows'
import { computed } from 'vue'
import { useAsyncData } from 'nuxt/app'

export function useShows() {
  const {
    data: rawShows,
    pending,
    error,
  } = useAsyncData<ShowsByGenre>('shows', () => $fetch('/api/shows'))

  const dramaShows = computed(() => rawShows.value?.drama || [])

  const comedy = computed(() => rawShows.value?.comedy || [])

  const horror = computed(() => rawShows.value?.horror || [])

  const thriller = computed(() => rawShows.value?.thriller || [])

  return {
    rawShows,
    pending,
    error,
    dramaShows,
    comedy,
    horror,
    thriller,
  }
}
