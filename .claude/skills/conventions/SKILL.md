---
name: conventions
description: 'Next.js App Router component patterns and project conventions'
---

# Conventions

## Server vs Client Components

- **Server Component is the default** (no `'use client'`). Use it for data
  fetching, static markup, and anything without interactivity.
- Add `'use client'` only when the component needs hooks, JSX event handlers,
  browser APIs, or a client store (react-query / Zustand). Keep it on the first
  line, followed by one blank line before imports.
- Pass only serialisable props from Server to Client Components.

## Files & naming

- One component per file, PascalCase (`CharacterCard.tsx`). Co-locate a unit
  test next to it (`CharacterCard.spec.tsx`).
- Shared logic goes in `lib/` (`api`, `graphql`, `store`, `utils`); reusable
  hooks in `hooks/`; presentational primitives in `components/ui/`.
- Avoid barrel `index.ts` files that only re-export, vague `utils.ts` dumping
  grounds, abbreviations, and deep nesting.

## Imports

External packages → `@/` alias → relative, each group separated by one blank
line (only the groups that exist).

## Comments

Minimal. Only where the code cannot explain itself. No narration, no JSDoc on
self-explanatory props.

## Styling

- Tailwind with the project tokens (`ink-*`, `brand*`, `status-*`) — no ad-hoc
  hex values in components.
- Merge conditional classes with `cn()` (`clsx` + `tailwind-merge`).
- Design is dark, bold, high-contrast (hardrock.com-inspired) — glass surfaces,
  magenta→violet accent.

## Routing (App Router)

- `app/page.tsx` — home; `app/character/[id]/page.tsx` — detail.
- `params` and `searchParams` are **Promises** in Next 16 — `await` them.
- Provide `loading.tsx`, `error.tsx`, and `not-found.tsx` for resilient UX.
- Add `generateMetadata` (incl. Open Graph) on detail routes.
