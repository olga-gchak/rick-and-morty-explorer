'use client';

import {useMemo} from 'react';
import {useSearchParams} from 'next/navigation';

import type {CharacterFilter} from '@/lib/api/characters';
import {useCharacters} from '@/hooks/useCharacters';
import {useIntersection} from '@/hooks/useIntersection';
import {CharacterCard} from '@/components/CharacterCard';
import {CardSkeletonGrid} from '@/components/ui/CardSkeleton';
import {Message} from '@/components/ui/Message';
import {Spinner} from '@/components/ui/Spinner';

export function CharacterList() {
  const searchParams = useSearchParams();

  const filter = useMemo<CharacterFilter>(
    () => ({
      name: searchParams.get('name') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      species: searchParams.get('species') ?? undefined,
      gender: searchParams.get('gender') ?? undefined,
    }),
    [searchParams],
  );

  const {
    data,
    error,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useCharacters(filter);

  const sentinelRef = useIntersection<HTMLDivElement>(
    () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    {enabled: hasNextPage && !isFetchingNextPage},
  );

  if (isPending) return <CardSkeletonGrid />;

  if (isError) {
    return (
      <Message
        title="Something went wrong"
        action={
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-strong"
          >
            Try again
          </button>
        }
      >
        {String(error?.message ?? 'Failed to load characters.')}
      </Message>
    );
  }

  const characters = data.pages.flatMap((page) => page.results);

  if (characters.length === 0) {
    return (
      <Message title="No characters found">
        Nothing matches these filters. Try a different name or combination.
      </Message>
    );
  }

  const total = data.pages[0]?.info.count ?? characters.length;

  return (
    <div className="space-y-6">
      <p className="text-sm text-white/50" aria-live="polite">
        {total} character{total === 1 ? '' : 's'} found
      </p>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {characters.map((character, index) => (
          <li key={character.id} className="animate-fade-up">
            <CharacterCard character={character} priority={index < 4} />
          </li>
        ))}
      </ul>

      <div
        ref={sentinelRef}
        className="flex h-16 items-center justify-center"
        aria-hidden={!hasNextPage}
      >
        {isFetchingNextPage ? (
          <Spinner />
        ) : hasNextPage ? (
          <button
            type="button"
            onClick={() => fetchNextPage()}
            className="rounded-full border border-white/15 px-6 py-2 text-sm text-white/70 transition hover:border-brand/60 hover:text-white"
          >
            Load more
          </button>
        ) : (
          <span className="text-xs uppercase tracking-widest text-white/30">
            End of the multiverse
          </span>
        )}
      </div>
    </div>
  );
}
