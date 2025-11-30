import type { GenreBucket, ShowItem, TvMazeShow } from '../../types/shows'
import { sortShowsByRating, transformShow } from '../utils/shows'

const SHOWS_PER_GENRE = 10
const MAX_PAGES = 200
const MAX_GENRES = 8
const BATCH_SIZE = 5

async function fetchPage(page: number) {
  try {
    return await $fetch<TvMazeShow[]>(`https://api.tvmaze.com/shows?page=${page}`, {
      ignoreResponseError: true,
    })
  } catch {
    return null
  }
}

function bucketShows(shows: TvMazeShow[], buckets: Record<string, ShowItem[]>) {
  for (const show of shows) {
    const genres = show.genres || []
    for (const name of genres) {
      if (!name) continue

      const genre = name.trim().toLowerCase()
      if (!genre) continue

      if (!buckets[genre]) {
        buckets[genre] = []
      }

      buckets[genre].push(transformShow(show))
    }
  }
}

export default cachedEventHandler(
  async () => {
    const buckets: Record<string, ShowItem[]> = {}
    let page = 0

    try {
      while (page < MAX_PAGES) {
        const batch = Array.from({ length: BATCH_SIZE }, (_, i) => page + i)

        const results = await Promise.allSettled(batch.map(fetchPage))

        let foundValid = false

        for (const res of results) {
          if (res.status === 'fulfilled' && Array.isArray(res.value) && res.value.length) {
            foundValid = true
            bucketShows(res.value, buckets)
          }
        }

        if (!foundValid) break

        page += BATCH_SIZE
      }

      const allGenres = Object.keys(buckets)

      const selected = allGenres
        .sort((a, b) => (buckets[b]?.length || 0) - (buckets[a]?.length || 0))
        .slice(0, MAX_GENRES)

      const genres: GenreBucket[] = selected.map((name) => ({
        name,
        shows: sortShowsByRating(buckets[name]).slice(0, SHOWS_PER_GENRE),
      }))

      return {
        genres,
        totalGenres: allGenres.length,
      }
    } catch (err) {
      console.error('TVMaze fetch failed:', err)
      throw createError({
        statusCode: 503,
        statusMessage: 'Service Unavailable',
      })
    }
  },
  { maxAge: 60 * 60 }
)
