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

    const response = await $fetch<TvMazeCastResponseItem[]>(
      `https://api.tvmaze.com/shows/${id}/cast`
    )

    if (!Array.isArray(response)) return []

    const cast: CastMember[] = response
      .map((item) => {
        const personId = item.person?.id
        const name = item.person?.name?.trim()
        const character = item.character?.name?.trim()

        if (!personId || !name) return null

        const castMember: CastMember = {
          id: personId,
          name,
          character: character || 'Unknown role',
        }

        const imageUrl = item.person?.image?.original || item.person?.image?.medium
        if (imageUrl) {
          castMember.image = imageUrl
        }

        return castMember
      })
      .filter((entry): entry is CastMember => Boolean(entry))

    return cast
  },
  {
    maxAge: 60 * 60,
  }
)
