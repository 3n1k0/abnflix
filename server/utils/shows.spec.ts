import { describe, expect, it } from 'vitest'
import { sortShowsByRating, transformShow } from './shows'
import type { ShowItem, TvMazeShow } from '../../types/shows'

describe('sortShowsByRating', () => {
  it('sorts shows by rating in descending order', () => {
    const shows: ShowItem[] = [
      { id: 1, title: 'Show A', rating: 5.5, slug: 'show-a' },
      { id: 2, title: 'Show B', rating: 9.2, slug: 'show-b' },
      { id: 3, title: 'Show C', rating: 7.8, slug: 'show-c' },
    ]

    const sorted = sortShowsByRating(shows)

    expect(sorted[0].rating).toBe(9.2)
    expect(sorted[1].rating).toBe(7.8)
    expect(sorted[2].rating).toBe(5.5)
  })

  it('sorts by title alphabetically when ratings are equal', () => {
    const shows: ShowItem[] = [
      { id: 1, title: 'Zebra Show', rating: 8.0, slug: 'zebra' },
      { id: 2, title: 'Apple Show', rating: 8.0, slug: 'apple' },
      { id: 3, title: 'Mango Show', rating: 8.0, slug: 'mango' },
    ]

    const sorted = sortShowsByRating(shows)

    expect(sorted[0].title).toBe('Apple Show')
    expect(sorted[1].title).toBe('Mango Show')
    expect(sorted[2].title).toBe('Zebra Show')
  })

  it('handles null ratings by treating them as -1', () => {
    const shows: ShowItem[] = [
      { id: 1, title: 'Show A', rating: null, slug: 'show-a' },
      { id: 2, title: 'Show B', rating: 7.5, slug: 'show-b' },
      { id: 3, title: 'Show C', rating: null, slug: 'show-c' },
    ]

    const sorted = sortShowsByRating(shows)

    expect(sorted[0].rating).toBe(7.5)
    expect(sorted[1].rating).toBe(null)
    expect(sorted[2].rating).toBe(null)
  })

  it('handles string ratings by parsing them', () => {
    const shows: ShowItem[] = [
      { id: 1, title: 'Show A', rating: '8.5', slug: 'show-a' },
      { id: 2, title: 'Show B', rating: '6.2', slug: 'show-b' },
      { id: 3, title: 'Show C', rating: 9.1, slug: 'show-c' },
    ]

    const sorted = sortShowsByRating(shows)

    expect(sorted[0].rating).toBe(9.1)
    expect(sorted[1].rating).toBe('8.5')
    expect(sorted[2].rating).toBe('6.2')
  })

  it('handles invalid string ratings as -1', () => {
    const shows: ShowItem[] = [
      { id: 1, title: 'Show A', rating: 'invalid', slug: 'show-a' },
      { id: 2, title: 'Show B', rating: 7.5, slug: 'show-b' },
      { id: 3, title: 'Show C', rating: 'also-invalid', slug: 'show-c' },
    ]

    const sorted = sortShowsByRating(shows)

    expect(sorted[0].rating).toBe(7.5)
    expect(sorted[1].rating).toBe('invalid')
    expect(sorted[2].rating).toBe('also-invalid')
  })

  it('returns empty array when given empty array', () => {
    const shows: ShowItem[] = []
    const sorted = sortShowsByRating(shows)

    expect(sorted).toEqual([])
  })

  it('handles single show array', () => {
    const shows: ShowItem[] = [{ id: 1, title: 'Only Show', rating: 8.0, slug: 'only' }]

    const sorted = sortShowsByRating(shows)

    expect(sorted).toHaveLength(1)
    expect(sorted[0].title).toBe('Only Show')
  })

  it('does not mutate the original array', () => {
    const shows: ShowItem[] = [
      { id: 1, title: 'Show A', rating: 5.5, slug: 'show-a' },
      { id: 2, title: 'Show B', rating: 9.2, slug: 'show-b' },
    ]

    const original = [...shows]
    sortShowsByRating(shows)

    expect(shows).toEqual(original)
  })

  it('handles shows with undefined titles in secondary sort', () => {
    const shows: ShowItem[] = [
      { id: 1, title: undefined as any, rating: 8.0, slug: 'show-a' },
      { id: 2, title: 'Show B', rating: 8.0, slug: 'show-b' },
    ]

    const sorted = sortShowsByRating(shows)

    expect(sorted[0].title).toBe(undefined)
    expect(sorted[1].title).toBe('Show B')
  })
})

describe('transformShow', () => {
  it('transforms a complete TvMazeShow object', () => {
    const tvMazeShow: TvMazeShow = {
      id: 123,
      name: 'Breaking Bad',
      url: 'https://www.tvmaze.com/shows/169/breaking-bad',
      premiered: '2008-01-20',
      rating: { average: 9.3 },
      image: {
        medium: 'https://example.com/medium.jpg',
        original: 'https://example.com/original.jpg',
      },
      language: 'English',
      summary: '<p>A high school chemistry teacher turned meth producer.</p>',
      genres: ['Drama', 'Crime', 'Thriller'],
    }

    const result = transformShow(tvMazeShow)

    expect(result).toEqual({
      id: 123,
      slug: 'breaking-bad',
      title: 'Breaking Bad',
      year: 2008,
      rating: 9.3,
      imageSrc: 'https://example.com/medium.jpg',
      imageFullSrc: 'https://example.com/original.jpg',
      language: 'English',
      summary: 'A high school chemistry teacher turned meth producer.',
      url: 'https://www.tvmaze.com/shows/169/breaking-bad',
      genres: ['Drama', 'Crime', 'Thriller'],
    })
  })

  it('strips HTML tags from summary', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
      summary: '<p>Hello <b>world</b> with <i>tags</i></p>',
    }

    const result = transformShow(tvMazeShow)

    expect(result.summary).toBe('Hello world with tags')
  })

  it('handles missing summary', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
    }

    const result = transformShow(tvMazeShow)

    expect(result.summary).toBeUndefined()
  })

  it('handles empty summary after HTML stripping', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
      summary: '<p></p>',
    }

    const result = transformShow(tvMazeShow)

    expect(result.summary).toBeUndefined()
  })

  it('falls back to id for slug when url is missing', () => {
    const tvMazeShow: TvMazeShow = {
      id: 456,
      name: 'Test Show',
    }

    const result = transformShow(tvMazeShow)

    expect(result.slug).toBe('456')
  })

  it('extracts slug from url correctly', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
      url: 'https://www.tvmaze.com/shows/123/friends',
    }

    const result = transformShow(tvMazeShow)

    expect(result.slug).toBe('friends')
  })

  it('handles missing premiered date', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
    }

    const result = transformShow(tvMazeShow)

    expect(result.year).toBeUndefined()
  })

  it('extracts year from premiered date', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
      premiered: '2020-03-15',
    }

    const result = transformShow(tvMazeShow)

    expect(result.year).toBe(2020)
  })

  it('handles missing rating', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
    }

    const result = transformShow(tvMazeShow)

    expect(result.rating).toBe(null)
  })

  it('handles null rating.average', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
      rating: { average: null },
    }

    const result = transformShow(tvMazeShow)

    expect(result.rating).toBe(null)
  })

  it('uses medium image when both are available', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
      image: {
        medium: 'https://example.com/medium.jpg',
        original: 'https://example.com/original.jpg',
      },
    }

    const result = transformShow(tvMazeShow)

    expect(result.imageSrc).toBe('https://example.com/medium.jpg')
    expect(result.imageFullSrc).toBe('https://example.com/original.jpg')
  })

  it('falls back to original for imageSrc when medium is missing', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
      image: {
        original: 'https://example.com/original.jpg',
      },
    }

    const result = transformShow(tvMazeShow)

    expect(result.imageSrc).toBe('https://example.com/original.jpg')
    expect(result.imageFullSrc).toBe('https://example.com/original.jpg')
  })

  it('falls back to medium for imageFullSrc when original is missing', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
      image: {
        medium: 'https://example.com/medium.jpg',
      },
    }

    const result = transformShow(tvMazeShow)

    expect(result.imageSrc).toBe('https://example.com/medium.jpg')
    expect(result.imageFullSrc).toBe('https://example.com/medium.jpg')
  })

  it('handles missing image object', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
    }

    const result = transformShow(tvMazeShow)

    expect(result.imageSrc).toBeUndefined()
    expect(result.imageFullSrc).toBeUndefined()
  })

  it('handles missing language', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
    }

    const result = transformShow(tvMazeShow)

    expect(result.language).toBeUndefined()
  })

  it('handles empty genres array', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
      genres: [],
    }

    const result = transformShow(tvMazeShow)

    expect(result.genres).toEqual([])
  })

  it('handles missing genres', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
    }

    const result = transformShow(tvMazeShow)

    expect(result.genres).toEqual([])
  })

  it('preserves multiple genres', () => {
    const tvMazeShow: TvMazeShow = {
      id: 1,
      name: 'Test Show',
      genres: ['Action', 'Adventure', 'Sci-Fi'],
    }

    const result = transformShow(tvMazeShow)

    expect(result.genres).toEqual(['Action', 'Adventure', 'Sci-Fi'])
  })
})
