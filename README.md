# TV Shows Dashboard

Nuxt 4 / Vue 3 single-page app that browses TVMaze shows by genre, highlights the highest-rated titles per genre, provides search, and shows detail pages with cast.

## Stack & Architecture

- **Framework**: Nuxt 4 (Vue 3, Vite) for file-based routing, SSR/ISR caching, and composables.
- **Styling**: Hand-rolled CSS with design tokens, minimal dependencies.
- **Data**: Server endpoints in `server/api` wrap the public TVMaze API. Shows are fetched server-side, bucketed by genre, sorted by rating, and cached.
- **Images**: `@nuxt/image` for responsive posters/placeholders.
- **Tests**: Vitest + Vue Test Utils covering core components/pages.

## Requirements Coverage

- **Genres + ratings**: `/api/shows` aggregates all TVMaze pages and returns top-rated shows per genre (sorted then trimmed).
- **Detail view**: `/shows/[slug]` fetches show detail and cast via API routes.
- **Search**: `/search` uses debounced queries against `/api/search`.
- **Responsiveness**: Layouts adapt down to mobile, horizontal scroll lists use scroll buttons.
- **Clean code**: Components are small, props-driven, composables encapsulate data fetching and UI logic.

## Getting Started

- Node: v22.19.0 tested (LTS-compatible). NPM: comes with Node.

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm test` – Vitest unit tests (jsdom)
- `npm run lint` – ESLint
- `npm run format` – Prettier write

## API Routes (server-side)

- `GET /api/shows` – returns genre buckets, sorted by rating (cached 1h)
- `GET /api/shows/:id` – show detail by id/slug with fallbacks (cached 1h)
- `GET /api/shows/:id/cast` – cast list (cached 1h)
- `GET /api/search?q=` – search shows

## Notes / Decisions

- Capped pages and genres to balance coverage with API load (`MAX_PAGES`, `MAX_GENRES`, `SHOWS_PER_GENRE` in `server/api/shows.get.ts`).
- Strip HTML from TVMaze summaries for clean text.
- Debounced search to reduce API chatter; minimum 2 chars.
- Horizontal lists use a composable for scroll state and smooth scroll.

## Testing

```bash
npm test
```

## Limitations / Future Work

- Episodes tab is a stub, TVMaze episode data can be added similarly to cast.
- “View All” could deep link to a genre page.
- Consider persistence for “My List” if expanding features.
