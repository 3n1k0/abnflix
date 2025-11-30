import type { ShowItem, TvMazeShow } from '../../types/shows'
import { sortShowsByRating, transformShow } from '../utils/shows'

const SHOWS_PER_GENRE = 10
const MAX_PAGES = 200
const MAX_GENRES = 8

export default cachedEventHandler(async () => {
  const buckets: Record<string, ShowItem[]> = {}

  const pages = await Promise.allSettled(
    Array.from({ length: MAX_PAGES }, (_, i) =>
      $fetch<TvMazeShow[]>(`https://api.tvmaze.com/shows?page=${i}`).catch(() => null)
    )
  )

  for (const result of pages) {
    if (result.status !== 'fulfilled' || !Array.isArray(result.value)) continue
    for (const show of result.value) {
      for (const g of show.genres || []) {
        const genre = g.toLowerCase()
        if (!genre) continue
        buckets[genre] = buckets[genre] || []
        buckets[genre].push(transformShow(show))
      }
    }
  }

  const selected = Object.keys(buckets)
    .sort((a, b) => buckets[b].length - buckets[a].length)
    .slice(0, MAX_GENRES)

  return {
    genres: selected.map((name) => ({
      name,
      shows: sortShowsByRating(buckets[name]).slice(0, SHOWS_PER_GENRE),
    })),
  }
})
