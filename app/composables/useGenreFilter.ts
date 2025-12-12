import { computed, ref } from 'vue'
import type { Ref } from 'vue'

interface Genre {
  name: string
  shows: unknown[]
}

export function useGenreFilter(genres: Ref<Genre[]>) {
  const selectedGenre = ref<string | null>(null)

  const availableGenres = computed(() => {
    return genres.value.map((genre) => genre.name).sort()
  })

  const filteredGenres = computed(() => {
    if (selectedGenre.value === null) {
      return genres.value
    }
    return genres.value.filter((genre) => genre.name === selectedGenre.value)
  })

  function setSelectedGenre(genre: string | null) {
    selectedGenre.value = genre
  }

  function clearFilter() {
    selectedGenre.value = null
  }

  return {
    selectedGenre,
    availableGenres,
    filteredGenres,
    setSelectedGenre,
    clearFilter,
  }
}
