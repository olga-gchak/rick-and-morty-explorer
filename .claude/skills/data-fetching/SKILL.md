---
name: data-fetching
description: 'GraphQL data layer — graphql-request + react-query + Zod'
---

# Data Fetching

GraphQL over the public Rick and Morty API. The query layer is intentionally
thin (`graphql-request` ≈ fetch); **react-query** owns caching, pagination and
revalidation; **Zod** validates every response at the boundary.

## Layering

```
lib/graphql/client.ts     # one GraphQLClient (works on server + client)
lib/graphql/queries.ts    # gql documents
lib/api/characters.ts     # Zod schemas + typed fetchers
hooks/useCharacters.ts    # react-query hooks (client)
lib/query-keys.ts         # centralised query keys
lib/get-query-client.ts   # SSR-safe QueryClient factory
```

## Fetcher pattern

Fetchers validate with Zod and return trusted, typed data:

```ts
export async function fetchCharacters(
  page: number,
  filter: CharacterFilter = {},
) {
  const data = await gqlClient.request(CHARACTERS_QUERY, {
    page,
    filter: cleanFilter(filter),
  });
  return charactersResponseSchema.parse(data).characters;
}
```

- Make schemas **tolerant** where a single bad field shouldn't break a list
  (e.g. `image: z.url().catch('')`) and handle the empty case in the UI.
- Never send empty-string filters to the API — strip them first.

## react-query

- Infinite lists map the API cursor (`info.next`) onto `getNextPageParam`.
- Keys come from `lib/query-keys.ts`; include the filter so the cache keys by it.
- Default options live in `get-query-client.ts` (`staleTime`, `retry: 1`, no
  refetch on focus).
- **No results is a success, not an error**: the API returns HTTP 200 with
  `results: []` and `info.*: null`, so `info` fields are nullable in the schema
  and the UI shows the empty state from `results.length === 0`.

## SSR

Prefetch the first page in the Server Component and hydrate:

```tsx
const queryClient = getQueryClient();
await queryClient.prefetchInfiniteQuery({
  queryKey,
  queryFn,
  initialPageParam: 1,
});
return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <List />
  </HydrationBoundary>
);
```

On detail pages, wrap the server fetch in React `cache()` so `generateMetadata`
and the page share one request.

## State that is NOT server data

Filters live in the **URL** (shareable, reload-safe, feed the query key).
Per-visitor client state that must persist (favourites) lives in a **Zustand**
store with `persist`, not in the URL or the query cache.
