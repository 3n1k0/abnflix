import type { ShowItem, TvMazeShow } from '../../types/shows'
import { transformShow } from '../utils/shows'

interface TvMazeSearchResult {
  score?: number | null
  show?: TvMazeShow | null
}

export default cachedEventHandler(
  async (event) => {
    const queryParam = getQuery(event).q
    const query = typeof queryParam === 'string' ? queryParam.trim() : ''

    if (!query) {
      throw createError({ statusCode: 400, statusMessage: 'Query parameter "q" is required' })
    }

    try {
      const response = await $fetch<TvMazeSearchResult[]>(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
      )

      if (!Array.isArray(response)) return []

      const results: ShowItem[] = response
        .map((entry) => (entry.show ? transformShow(entry.show) : null))
        .filter((show): show is ShowItem => Boolean(show))

      return results
    } catch (error) {
      console.error('Failed to search shows from TVMaze API:', error)

      throw createError({
        statusCode: 503,
        statusMessage: 'Service Unavailable',
        message: 'Failed to search shows from external API. Please try again later.',
      })
    }
  },
  {
    maxAge: 15 * 60,
  }
)
