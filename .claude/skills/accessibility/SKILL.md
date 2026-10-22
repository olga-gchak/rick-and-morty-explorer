---
name: accessibility
description: 'Accessibility standards (WCAG 2.1 AA) for the app'
---

# Accessibility

Target **WCAG 2.1 Level AA**.

## Core rules

- **Semantic HTML**: `main`, `article`, lists for grids, real `button`s, labelled
  `input`/`select` (use `sr-only` labels when the design hides them).
- **Keyboard**: every interactive element is reachable and operable by keyboard.
- **Visible focus**: a global `:focus-visible` ring is defined in `global.css`;
  don't remove outlines without a replacement.
- **Color contrast**: keep text/UI legible on the dark theme.
- **ARIA where context is missing**: `aria-label` on icon-only buttons,
  `aria-pressed` on toggles (favourite), `aria-live="polite"` on the result
  count, `aria-hidden` on decorative SVGs.

## Never nest interactive elements

A `<button>` inside an `<a>` is invalid and breaks screen readers. For a fully
clickable card, use the **overlay link** pattern:

```tsx
<article className="group relative ...">
  {/* image, content ... */}
  <FavoriteButton className="... z-20" />      {/* above the link */}
  <Link href={...} aria-label={name} className="absolute inset-0 z-10" />
</article>
```

The link overlay covers the whole card; interactive controls sit above it with a
higher `z-index`.

## Images

Always provide a meaningful `alt`. When an image is missing or fails to load,
render an accessible placeholder (`role="img"` + `aria-label`) rather than a
broken image.
