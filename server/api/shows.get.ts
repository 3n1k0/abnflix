import type { GenreBucket, ShowItem, ShowsResponse, TvMazeShow } from '../../types/shows'

const SHOWS_PER_GENRE = 10
const MAX_PAGES = 50
const MAX_GENRES = 4

function sortByRating(list: ShowItem[]): ShowItem[] {
  return [...list].sort((a, b) => {
    const ra = typeof a.rating === 'number' ? a.rating : parseFloat(String(a.rating)) || -1
    const rb = typeof b.rating === 'number' ? b.rating : parseFloat(String(b.rating)) || -1
    return rb !== ra ? rb - ra : (a.title || '').localeCompare(b.title || '')
  })
}

function transformShow(show: TvMazeShow): ShowItem {
  const clean = show.summary?.replace(/<[^>]+>/g, '').trim()

  return {
    id: show.id,
    slug: show.url?.split('/').pop() || String(show.id),
    title: show.name,
    year: show.premiered ? new Date(show.premiered).getFullYear() : undefined,
    rating: show.rating?.average || null,
    imageSrc: show.image?.medium || show.image?.original || undefined,
    imageFullSrc: show.image?.original || show.image?.medium || undefined,
    language: show.language || undefined,
    summary: clean || undefined,
    url: show.url,
    genres: show.genres || [],
  }
}

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
        shows: sortByRating(buckets[name] || []),
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
