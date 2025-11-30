import type { ShowItem, TvMazeShow } from '../../types/shows'
import { transformShow } from '../utils/shows'

interface TvMazeSearchResult {
  score?: number | null
  show?: TvMazeShow | null
}

export default cachedEventHandler(
  async (event) => {
    const q = getQuery(event).q
    const query = typeof q === 'string' ? q.trim() : ''

    if (!query) {
      throw createError({ statusCode: 400, statusMessage: 'Query parameter "q" is required' })
    }

    try {
      const data = await $fetch<TvMazeSearchResult[]>(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`,
        { ignoreResponseError: true }
      )

      if (!Array.isArray(data)) return []

      return data
        .map((item) => (item.show ? transformShow(item.show) : null))
        .filter(Boolean) as ShowItem[]
    } catch (err) {
      console.error('Search request failed:', err)
      throw createError({
        statusCode: 503,
        statusMessage: 'Service Unavailable',
      })
    }
  },
  {
    maxAge: 15 * 60,
    getKey: (event) => `search:${getQuery(event).q}`,
  }
)
