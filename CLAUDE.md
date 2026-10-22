# Project Guide for Claude

Rick & Morty Explorer — a **Next.js 16 (App Router) + React 19 + TypeScript**
app that browses the public Rick and Morty **GraphQL** API.

Stack: `graphql-request` + `@tanstack/react-query` (data), **Zod** (validation),
**Zustand** (favourites), **Tailwind CSS** (styling), **Jest + React Testing
Library** (unit), **Playwright** (e2e).

## Workflow

1. **Understand first** — check the task and the current code before editing.
2. **Implement** following the conventions below.
3. **Verify** — keep the project green (see Commands). New features get tests;
   bug fixes get a regression test.

## Conventions

### Components

- **Prefer Server Components.** Add `'use client'` only when the component uses
  hooks, event handlers, browser APIs, or a client store (Zustand / react-query
  hooks). Keep `'use client'` as the first line, then one blank line, then imports.
- Validate external data with **Zod at the boundary** (`lib/api/*`); the rest of
  the app works with typed, trusted data.
- Fetch on the server where possible; prefetch + `HydrationBoundary` for lists.

### Imports

Group in this order, separated by one blank line (include only groups present):

1. external packages (`react`, `next/*`, `@tanstack/*`, …);
2. `@/` alias modules (`@/lib/*`, `@/components/*`, `@/hooks/*`);
3. relative imports (`./…`, `../…`).

### Comments

Keep comments minimal — add one only when the code cannot explain itself
(non-obvious logic, a workaround, overriding default behaviour, or a `TODO` with
context). Do not narrate what the code does or restate names/types.

### Style

- **Prettier**: single quotes, no bracket spacing (`{foo}`). Run `npm run format`.
- **Types**: use `type`, not `interface` (enforced by ESLint).
- No `console.*` in committed code (ESLint `no-console`).
- **Tailwind tokens**: use the project palette (`ink-*`, `brand*`, `status-*`)
  from `tailwind.config.ts` instead of ad-hoc colours.

### Accessibility (WCAG 2.1 AA)

- Semantic HTML (`main`, `article`, lists, `button`, labelled inputs/selects).
- Never nest interactive elements (e.g. a `<button>` inside an `<a>`); use the
  overlay/stretched-link pattern for clickable cards.
- Keyboard-reachable with a visible focus ring; `aria-label`/`aria-pressed`/
  `aria-live` where context is needed.

## Commands

```bash
npm run dev          # next dev — http://localhost:3000
npm run build        # next build (production build + typecheck)
npm test             # jest (unit + RTL)
npm run e2e          # playwright (end-to-end)
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run format       # prettier -w .
npm run codestyle    # prettier -c .
```

## Project structure

See [README.md](README.md). In short: `src/app` (routes + boundaries),
`src/components`, `src/hooks`, `src/lib` (`api`, `graphql`, `store`, `utils`).
Detailed guidance lives in `.claude/skills/`.
