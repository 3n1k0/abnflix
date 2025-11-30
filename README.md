# TV Shows Dashboard

<p align="center">
  <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmU1ZmhsbHgwNWt0ZWZjcnV3YWJtNm9oOGtlc2Zya3d5OThwM3JpcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13ZVRnWnmSMaRy/giphy.gif" width="420" />
</p>

A Nuxt 4 / Vue 3 application for browsing and searching TV shows using the TVMaze API.
Shows are grouped by genre, sorted by rating, searchable by name, and each show has a detail page with cast information.

The goal of the project is to demonstrate clean architecture, reusable composables, good frontend patterns, and a mobile-friendly, accessible UI.

## Screenshots

### **Home Page - desktop**

<div>
<img width="1353" height="888" alt="Screenshot 2025-11-30 at 20 00 48" src="https://github.com/user-attachments/assets/6c3c2d73-bb9e-442b-b798-7d15c136cab4" />

### **Home Page - mobile**

<img width="411" height="891" alt="Screenshot 2025-11-30 at 20 01 54" src="https://github.com/user-attachments/assets/33f8d982-f573-4d06-b4b5-fb58e71d8ef7" />
</div>

## Tech Stack & Architecture

### **Framework**

- **Nuxt 4 (Vue 3 + Vite)**  
  Chosen for:
  - File-based routing
  - First-class server routes (Nitro)
  - Built-in SSR and caching
  - Clean composable architecture

### **Styling**

- Hand-written CSS with design tokens
- Minimal dependencies
- Responsive layout down to mobile

### **Data Layer**

Server routes under `server/api` wrap TVMaze endpoints:

- Aggregation logic (genre bucketing)
- Fallback search strategies
- Normalization (via `transformShow`)
- Caching with `cachedEventHandler`

### **Images**

- Nuxt Image module for responsive poster rendering

### **State & Logic**

- Composables for:
  - URL/query syncing
  - Search view state
  - Debounced search input
  - Show detail fetching
  - Horizontal scroll behavior

### **Testing**

- Vitest + Vue Test Utils
- Tests for base components and key logic

## ✔ Requirements Coverage

### **Genres + Ratings**

- `/api/shows` scans the TVMaze show index
- Groups shows by genre
- Sorts by rating
- Returns only the top shows per genre

### **Detail View**

- `/shows/[slug]` fetches:
  - show detail
  - cast list
- Includes graceful fallbacks and image error handling

### **Search**

- Debounced client-side search input
- Queries Nuxt API via `/api/search`
- Loading, empty, and error states
- URL-sync enabled (`?q=`)

### **Responsive UI**

- Horizontal lists with scroll buttons
- Fully mobile-friendly layout
- Skeleton placeholders for loading

### **Clean Code**

- Small components
- Typed server routes
- Encapsulated logic in composables
- Clear data flow

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
