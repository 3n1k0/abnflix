import { transformShow } from '../../utils/shows'
import type { TvMazeShow } from '../../../types/shows'

export default cachedEventHandler(
  async (event) => {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Show id or slug is required' })
    }

    const numericId = Number(id)

    if (!Number.isNaN(numericId)) {
      try {
        const response = await $fetch<TvMazeShow | null>(
          `https://api.tvmaze.com/shows/${numericId}`,
          { ignoreResponseError: true }
        )
        if (response) return transformShow(response)
      } catch (err) {
        // fall through to slug handling
      }
    }

    const normalizedSlug = String(id).trim().toLowerCase()
    const searchVariants = Array.from(
      new Set([normalizedSlug, normalizedSlug.replace(/-/g, ' ')].filter(Boolean))
    )

    // Try singlesearch first (best match), then fall back to search list.
    for (const variant of searchVariants) {
      try {
        const single = await $fetch<TvMazeShow | null>(
          `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(variant)}`,
          { ignoreResponseError: true }
        )

        if (single) {
          return transformShow(single)
        }
      } catch (err) {
        // continue to next variant
      }
    }

    for (const variant of searchVariants) {
      try {
        const searchResults = await $fetch<{ score?: number; show?: TvMazeShow }[]>(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(variant)}`,
          { ignoreResponseError: true }
        )

        if (Array.isArray(searchResults) && searchResults.length) {
          const match = searchResults.find((entry) => {
            const show = entry.show
            if (!show) return false
            const slugFromUrl = show.url?.split('/').pop()?.toLowerCase()
            const nameMatch = show.name?.toLowerCase() === normalizedSlug
            return slugFromUrl === normalizedSlug || nameMatch
          })

          if (match?.show) {
            return transformShow(match.show)
          }

          if (searchResults[0]?.show) {
            return transformShow(searchResults[0].show)
          }
        }
      } catch (err) {
        // continue to next variant
      }
    }

    throw createError({ statusCode: 404, statusMessage: 'Show not found' })
  },
  {
    maxAge: 60 * 60,
  }
)
