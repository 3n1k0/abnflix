export type RatingValue = number | string

export type GenreKey = 'Drama' | 'Comedy' | 'Horror' | 'Thriller'

export interface ShowItem {
  id?: string | number
  slug?: string
  title: string
  year?: string | number
  rating?: RatingValue | null
  imageSrc?: string
  imageFullSrc?: string
  language?: string
  summary?: string
  alt?: string
  url?: string
}

export interface CastMember {
  id: number
  name: string
  character: string
  image?: string
}

export interface TvMazeShow {
  id: number
  url?: string
  language?: string | null
  name: string
  summary?: string | null
  genres?: string[]
  premiered?: string | null
  rating?: {
    average?: number | null
  } | null
  image?: {
    medium?: string | null
    original?: string | null
  } | null
}

export interface ShowsByGenre {
  drama: ShowItem[]
  comedy: ShowItem[]
  horror: ShowItem[]
  thriller: ShowItem[]
}
