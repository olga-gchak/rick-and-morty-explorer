# Use of AI

Here is an honest breakdown of how AI was used in this task.

## Tool

- **Claude Code** (Anthropic's CLI coding agent).

## Guided by the project's rules & skills

All of the AI's work was done according to the project settings, rules and skills
I set up for this repository — `CLAUDE.md` and `.claude/` (settings and the
`skills/` for conventions, data fetching, accessibility and testing), adapted from
our reference project. Every generated component, test and fix follows those
conventions (Server Components first, import grouping, minimal comments, Zod at
the data boundary, WCAG accessibility, Prettier/ESLint style).

## What AI was used for

- **Generating the components and code** — UI components, hooks, the GraphQL
  queries/fetchers and styling — based on the requirements and architecture I
  defined.
- **Writing the tests** — unit (Jest + React Testing Library) and E2E
  (Playwright).
- **Fixing bugs I found** — e.g. invalid anchor/button nesting in the card,
  images not loading, hover rendering artifacts, and making the whole card
  clickable.

## How I verified

I reviewed the generated code against my requirements, tested the app against the
live API, and kept the project green throughout (`lint`, `test`, `build`).
