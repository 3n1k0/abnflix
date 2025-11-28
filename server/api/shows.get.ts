import type { GenreBucket, ShowItem, ShowsResponse, TvMazeShow } from '../../types/shows'
import { sortShowsByRating, transformShow } from '../utils/shows'

const SHOWS_PER_GENRE = 10
const MAX_PAGES = 50
const MAX_GENRES = 4

export default cachedEventHandler(
  async () => {
    const genreList: string[] = []
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

            if (!genreList.includes(genre)) genreList.push(genre)
            if (genreList.indexOf(genre) >= MAX_GENRES) continue

            const bucket = buckets[genre] || (buckets[genre] = [])
            if (bucket.length < SHOWS_PER_GENRE) {
              bucket.push(transformShow(show))
            }
          }
        }

        page++
      }

      const selected = genreList.slice(0, MAX_GENRES)

      const genres: GenreBucket[] = selected.map((name) => ({
        name,
        shows: sortShowsByRating(buckets[name] || []),
      }))

      return {
        genres,
        totalGenres: genreList.length,
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
