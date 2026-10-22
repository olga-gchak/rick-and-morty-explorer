import {dehydrate, HydrationBoundary} from '@tanstack/react-query';

import {fetchCharacters} from '@/lib/api/characters';
import {parseFilters} from '@/lib/filters';
import {getQueryClient} from '@/lib/get-query-client';
import {queryKeys} from '@/lib/query-keys';
import {CharacterList} from '@/components/CharacterList';
import {Filters} from '@/components/Filters';
import {SearchBar} from '@/components/SearchBar';

type SearchParams = Record<string, string | string[] | undefined>;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filter = parseFilters(await searchParams);

  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeys.characters(filter),
    queryFn: () => fetchCharacters(1, filter),
    initialPageParam: 1,
  });

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="display-title text-4xl leading-none text-white sm:text-6xl">
          Explore the{' '}
          <span className="bg-gradient-to-r from-brand to-brand-violet bg-clip-text text-transparent">
            multiverse
          </span>
        </h1>
        <p className="max-w-xl text-white/60">
          Search and filter every character from Rick and Morty. Data served by
          the public GraphQL API.
        </p>
      </section>

      <section className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="lg:max-w-md lg:flex-1">
          <SearchBar />
        </div>
        <Filters />
      </section>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CharacterList />
      </HydrationBoundary>
    </div>
  );
}
