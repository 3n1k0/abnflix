import { transformShow } from '../../utils/shows'
import type { TvMazeShow } from '../../../types/shows'

export default cachedEventHandler(
  async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Show id or slug is required' })
    }

    const normalized = String(id).trim().toLowerCase()
    const variants = [normalized, normalized.replace(/-/g, ' ')].filter(Boolean)

    const num = Number(id)
    if (!Number.isNaN(num)) {
      const show = await $fetch<TvMazeShow | null>(`https://api.tvmaze.com/shows/${num}`, {
        ignoreResponseError: true,
      })
      if (show) return transformShow(show)
    }

    for (const v of variants) {
      const show = await $fetch<TvMazeShow | null>(
        `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(v)}`,
        { ignoreResponseError: true }
      )
      if (show) return transformShow(show)
    }

    for (const v of variants) {
      const list = await $fetch<{ show?: TvMazeShow }[]>(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(v)}`,
        { ignoreResponseError: true }
      )

      if (!Array.isArray(list) || !list.length) continue

      const exact = list.find((entry) => {
        const s = entry.show
        if (!s) return false
        const slug = s.url?.split('/').pop()?.toLowerCase()
        return slug === normalized || s.name?.toLowerCase() === normalized
      })

      if (exact?.show) return transformShow(exact.show)
      if (list[0]?.show) return transformShow(list[0].show)
    }

    throw createError({ statusCode: 404, statusMessage: 'Show not found' })
  },
  { maxAge: 60 * 60 }
)
