---
name: testing
description: 'Testing standards — Jest + React Testing Library and Playwright'
---

# Testing

- **Unit / component**: Jest + React Testing Library (jsdom).
- **E2E**: Playwright (`e2e/`).

## What to test

- New features get tests; bug fixes get a regression test.
- Prefer **pure logic** and **behaviour/accessibility** over implementation
  details — query by role/text, assert what the user sees.

## Unit (Jest + RTL)

- Co-locate: `filters.ts` → `filters.spec.ts`, `CharacterCard.tsx` →
  `CharacterCard.spec.tsx`.
- Import `@testing-library/jest-dom` at the top of component specs for matchers.
- Query by accessible role/name where possible:

```tsx
expect(screen.getByRole('link')).toHaveAttribute('href', '/character/1');
expect(
  screen.getByRole('button', {name: /add rick sanchez to favourites/i}),
).toBeInTheDocument();
```

- Reset shared state between tests (e.g. `useFavoritesStore.setState({ids: {}})`
  in `beforeEach`).
- Keep tests fast and offline — don't hit the real API.

## E2E (Playwright)

- Cover the real user flows: list renders, search updates the URL and results,
  navigating into a character detail page.
- Assert via roles/visible text, not CSS selectors.

## Running

```bash
npm test          # all unit tests
npm run e2e       # Playwright
```
