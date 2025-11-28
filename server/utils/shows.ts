import type { ShowItem, TvMazeShow } from '../../types/shows'

export function sortShowsByRating(shows: ShowItem[]): ShowItem[] {
  return [...shows].sort((a, b) => {
    const ra = typeof a.rating === 'number' ? a.rating : -1
    const rb = typeof b.rating === 'number' ? b.rating : -1
    return rb !== ra ? rb - ra : (a.title || '').localeCompare(b.title || '')
  })
}

export function transformShow(show: TvMazeShow): ShowItem {
  const summary = show.summary?.replace(/<[^>]+>/g, '').trim()

  return {
    id: show.id,
    slug: show.url?.split('/').pop() || String(show.id),
    title: show.name,
    year: show.premiered ? new Date(show.premiered).getFullYear() : undefined,
    rating: show.rating?.average || null,
    imageSrc: show.image?.medium || show.image?.original || undefined,
    imageFullSrc: show.image?.original || show.image?.medium || undefined,
    language: show.language || undefined,
    summary: summary || undefined,
    url: show.url,
    genres: show.genres || [],
  }
}
