import type { GenreKey, ShowItem, ShowsByGenre, TvMazeShow } from '../../types/shows'

const TARGET_GENRES: GenreKey[] = ['Drama', 'Comedy', 'Horror', 'Thriller']
const GENRE_BUCKETS: Record<GenreKey, keyof ShowsByGenre> = {
  Drama: 'drama',
  Comedy: 'comedy',
  Horror: 'horror',
  Thriller: 'thriller',
}

const SHOWS_PER_GENRE = 10
const MAX_PAGES = 50

function hasEnoughShows(groups: ShowsByGenre): boolean {
  return (
    groups.drama.length >= SHOWS_PER_GENRE &&
    groups.comedy.length >= SHOWS_PER_GENRE &&
    groups.horror.length >= SHOWS_PER_GENRE &&
    groups.thriller.length >= SHOWS_PER_GENRE
  )
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
  }
}

export default cachedEventHandler(
  async () => {
    const showsByGenre: ShowsByGenre = {
      drama: [],
      comedy: [],
      horror: [],
      thriller: [],
    }

    let page = 0

    while (page < MAX_PAGES && !hasEnoughShows(showsByGenre)) {
      const response = await $fetch<TvMazeShow[]>(`https://api.tvmaze.com/shows?page=${page}`)

      if (!Array.isArray(response) || response.length === 0) {
        break
      }

      for (const show of response) {
        if (!show.genres?.length) continue

        for (const genre of TARGET_GENRES) {
          if (!show.genres.includes(genre)) continue

          const bucket = GENRE_BUCKETS[genre]

          if (showsByGenre[bucket].length < SHOWS_PER_GENRE) {
            showsByGenre[bucket].push(transformShow(show))
          }
        }
      }

      page++
    }

    return showsByGenre
  },
  {
    maxAge: 60 * 60,
  }
)
