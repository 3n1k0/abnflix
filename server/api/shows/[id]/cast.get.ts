import type { CastMember } from '../../../../types/shows'

interface TvMazeCastResponseItem {
  person?: {
    id?: number
    name?: string
    image?: { medium?: string | null; original?: string | null } | null
  } | null
  character?: {
    name?: string
  } | null
}

export default cachedEventHandler(
  async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Show id is required' })
    }

    try {
      const data = await $fetch<TvMazeCastResponseItem[]>(
        `https://api.tvmaze.com/shows/${id}/cast`,
        { ignoreResponseError: true }
      )

      if (!Array.isArray(data)) return []

      return data
        .map((item): CastMember | null => {
          const p = item.person
          if (!p?.id || !p.name) return null

          return {
            id: p.id,
            name: p.name.trim(),
            character: item.character?.name?.trim() || 'Unknown role',
            image: p.image?.original || p.image?.medium || undefined,
          }
        })
        .filter(Boolean) as CastMember[]
    } catch (err) {
      console.error(`Cast fetch failed for show ${id}:`, err)
      return []
    }
  },
  { maxAge: 60 * 60 }
)
