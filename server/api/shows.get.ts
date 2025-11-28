import type { GenreBucket, ShowItem, ShowsResponse, TvMazeShow } from '../../types/shows'
import { sortShowsByRating, transformShow } from '../utils/shows'

const SHOWS_PER_GENRE = 10
const MAX_PAGES = 200
const MAX_GENRES = 8

export default cachedEventHandler(
  async () => {
    const buckets: Record<string, ShowItem[]> = {}

    let page = 0

    try {
      while (page < MAX_PAGES) {
        const shows = await $fetch<TvMazeShow[]>(`https://api.tvmaze.com/shows?page=${page}`, {
          ignoreResponseError: true,
        })

        if (!Array.isArray(shows) || !shows.length) break

        for (const show of shows) {
          if (!show.genres?.length) continue

          for (const genre of show.genres) {
            if (!genre) continue

            const bucket = buckets[genre] || (buckets[genre] = [])
            bucket.push(transformShow(show))
          }
        }

        page++
      }

      const allGenres = Object.keys(buckets)

      const selected = allGenres
        .sort((a, b) => (buckets[b]?.length || 0) - (buckets[a]?.length || 0))
        .slice(0, MAX_GENRES)

      const genres: GenreBucket[] = selected.map((name) => ({
        name,
        shows: sortShowsByRating(buckets[name] || []).slice(0, SHOWS_PER_GENRE),
      }))

      return {
        genres,
        totalGenres: allGenres.length,
      } satisfies ShowsResponse
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
