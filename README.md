# Rick & Morty Explorer

A small web app to browse, search and filter every character from the
[Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql). Built with
**Next.js 16 (App Router) · React 19 · TypeScript**.

---

## Features

- **Character grid** — image + name cards on the home page.
- **Infinite scroll** — server-side paginated results loaded lazily as you
  scroll (with a `Load more` fallback), on top of the API's own pagination.
- **Search by name** — debounced, querying the API server-side.
- **Filters** — status, species and gender, combined with search, all through
  the API.
- **Filters live in the URL** (`?name=rick&status=Alive`) — shareable, reload-
  safe, back-button friendly, and used directly as the react-query cache key.
- **Character detail page** — full info: status, species, type, gender, origin
  & last known location (with dimensions) and every episode appearance.
- **Favourites** — mark characters; persisted in `localStorage` (Zustand).
- **SSR + hydration** — the first page of results is prefetched on the server
  and hydrated into the client cache, so content paints immediately.
- **Accessible** — semantic landmarks, labelled controls, keyboard-navigable,
  visible focus rings, `aria-live` result counts.
- **Responsive** — 2→4 column grid from phone to desktop.

## Tech stack

| Concern       | Choice                                                     |
| ------------- | ---------------------------------------------------------- |
| Framework     | Next.js 16 (App Router) + React 19                         |
| Language      | TypeScript (strict)                                        |
| Data fetching | GraphQL via `graphql-request` + `@tanstack/react-query` v5 |
| Validation    | Zod (responses validated at the boundary)                  |
| Client state  | Zustand (favourites, persisted)                            |
| Styling       | Tailwind CSS 3                                             |
| Unit tests    | Jest + React Testing Library                               |
| E2E tests     | Playwright                                                 |
| CI            | GitHub Actions (lint · test · build · e2e)                 |

### Why `graphql-request` (and not Apollo)?

The task requires GraphQL. `graphql-request` is a ~5 KB wrapper over `fetch`,
so the query layer stays as light as plain HTTP while react-query owns caching,
pagination and revalidation. Apollo/urql would add a second normalized cache
that duplicates react-query — unnecessary for an app this size.

### Why URL for filters but Zustand for favourites?

Filters describe _what the server should return_, so they belong in the URL and
feed the react-query key. Favourites are per-visitor client state with no server
owner that must survive reloads — a genuine fit for a persisted Zustand store.

## Project structure

```
src/
  app/
    layout.tsx              Root layout: fonts, providers, header
    page.tsx                Home — SSR-prefetches page 1, renders search+filters+list
    character/[id]/page.tsx Character detail (server component) + generateMetadata
    loading.tsx             Route-transition skeleton
    error.tsx               Route error boundary (client)
    not-found.tsx
    providers.tsx           react-query provider (client)
    global.css              Tailwind + base theme
  components/
    CharacterList.tsx       Infinite list (useInfiniteQuery + IntersectionObserver)
    CharacterCard.tsx       Grid card
    SearchBar.tsx           Debounced search → URL
    Filters.tsx             Status/species/gender selects → URL
    FavoriteButton.tsx      Zustand toggle
    Header.tsx              Sticky header + favourites count
    InfoGrid.tsx / EpisodeList.tsx
    ui/                     StatusBadge, Spinner, CardSkeleton, Message
  hooks/
    useCharacters.ts        Infinite query, keyed by filter
    useDebouncedValue.ts
    useIntersection.ts
    useFilterNavigation.ts  Read/write filter query string
  lib/
    graphql/                client + queries
    api/characters.ts       Fetchers + Zod schemas + types
    store/favorites.ts      Zustand store (persisted)
    filters.ts              Parse/serialise filters
    query-keys.ts
    get-query-client.ts     SSR-safe QueryClient factory
    utils/cn.ts
e2e/                        Playwright specs
```

## Getting started

Requires **Node 20.9+** (LTS 22 recommended) and npm.

```bash
# 1. install
npm install

# 2. (optional) configure the endpoint — defaults to the public API
cp .env.example .env.local

# 3. run the dev server → http://localhost:3000
npm run dev
```

### Scripts

```bash
npm run dev        # start the dev server
npm run build      # production build + typecheck
npm run start      # serve the production build
npm test           # unit tests (Jest + RTL)
npm run e2e        # end-to-end tests (Playwright)
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run format     # Prettier (write) / npm run codestyle (check)
```

## Testing

- **Unit (Jest + RTL):** filter parsing/serialisation, the favourites store,
  and component rendering/accessibility (`StatusBadge`, `CharacterCard`).
- **E2E (Playwright):** home list renders, search updates the URL and results,
  and navigating into a character detail page works.

## Continuous integration

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push and PR:
a `verify` job (lint → unit tests → build) and an `e2e` job (Playwright on
Chromium).

## Accessibility & performance notes

- Semantic HTML (`header`, `main`, `nav`-like landmarks, lists), labelled
  inputs/selects, `aria-pressed` on the favourite toggle, `aria-live` counts,
  and a global visible focus ring.
- `next/image` with responsive `sizes` and above-the-fold `priority`; skeleton
  placeholders; react-query caching + `staleTime` to avoid refetch churn.
- Character avatars are served with `unoptimized` — they are already small,
  immutable CDN JPEGs, so this skips the Next optimizer (and the rate-limiting it
  hits when a page requests ~20 at once) while keeping the loading/placeholder UX.

## Code style & conventions

- **Prettier** — single quotes, no bracket spacing (`{foo}`). Run `npm run format`
  / check with `npm run codestyle`.
- **ESLint** (flat config) — Next core-web-vitals + `jsx-a11y`, plus `no-console`
  and `@typescript-eslint/consistent-type-definitions: 'type'`.
- **Comments** are kept minimal — added only where the code can't explain itself.
- **Import grouping**, separated by a blank line: external packages → `@/` alias
  → relative imports. `'use client'` stays on the first line.

## Use of AI

See [AI-NOTES.md](AI-NOTES.md).
