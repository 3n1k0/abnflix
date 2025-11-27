import type { GenreBucket, ShowItem, ShowsResponse, TvMazeShow } from '../../types/shows'

const SHOWS_PER_GENRE = 10
const MAX_PAGES = 50
const MAX_GENRES = 4

function sortByRating(shows: ShowItem[]): ShowItem[] {
  return [...shows].sort((a, b) => {
    const ratingA = a.rating ?? -1
    const ratingB = b.rating ?? -1

    if (ratingA !== ratingB) {
      return ratingB - ratingA
    }

    return (a.title || '').localeCompare(b.title || '')
  })
}

function transformShow(show: TvMazeShow): ShowItem {
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

export default cachedEventHandler(
  async () => {
    const allGenres = new Set<string>()
    const genreOrder: string[] = []
    const buckets: Record<string, ShowItem[]> = {}

    let page = 0

    while (page < MAX_PAGES) {
      const response = await $fetch<TvMazeShow[]>(`https://api.tvmaze.com/shows?page=${page}`)

      if (!Array.isArray(response) || response.length === 0) {
        break
      }

      for (const show of response) {
        if (!show.genres?.length) continue

        for (const genre of show.genres) {
          if (!genre) continue

          if (!allGenres.has(genre)) {
            allGenres.add(genre)
            genreOrder.push(genre)
          }

          if (genreOrder.indexOf(genre) >= MAX_GENRES) {
            continue
          }

          const bucket = buckets[genre] || (buckets[genre] = [])

          if (bucket.length < SHOWS_PER_GENRE) {
            bucket.push(transformShow(show))
          }
        }
      }

      page++
    }

    const selectedGenres = genreOrder.slice(0, MAX_GENRES)

    const genres: GenreBucket[] = selectedGenres.map((name) => ({
      name,
      shows: sortByRating(buckets[name] || []),
    }))

    const payload: ShowsResponse = {
      genres,
      totalGenres: allGenres.size,
    }

    return payload
  },
  {
    maxAge: 60 * 60,
  }
)
