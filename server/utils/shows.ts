import type { ShowItem, TvMazeShow } from '../../types/shows'

export function sortShowsByRating(shows: ShowItem[]): ShowItem[] {
  return [...shows].sort((a, b) => {
    const ratingA = a.rating ?? -1
    const ratingB = b.rating ?? -1

    if (ratingA !== ratingB) {
      return ratingB - ratingA
    }

    return (a.title || '').localeCompare(b.title || '')
  })
}

export function transformShow(show: TvMazeShow): ShowItem {
  const plainSummary = show.summary?.replace(/<[^>]*>/g, '').trim()

  return {
    id: show.id,
    slug: show.url ? show.url.split('/').pop() : String(show.id),
    title: show.name,
    year: show.premiered ? new Date(show.premiered).getFullYear() : undefined,
    rating: show.rating?.average || null,
    imageSrc: show.image?.medium || show.image?.original || undefined,
    imageFullSrc: show.image?.original || show.image?.medium || undefined,
    language: show.language || undefined,
    summary: plainSummary || undefined,
    url: show.url,
    genres: show.genres || [],
  }
}
