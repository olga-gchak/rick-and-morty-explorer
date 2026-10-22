'use client';

import {useInfiniteQuery} from '@tanstack/react-query';

import {
  fetchCharacters,
  type CharacterFilter,
  type CharactersPage,
} from '@/lib/api/characters';
import {queryKeys} from '@/lib/query-keys';

export function useCharacters(filter: CharacterFilter) {
  return useInfiniteQuery({
    queryKey: queryKeys.characters(filter),
    queryFn: ({pageParam}) => fetchCharacters(pageParam, filter),
    initialPageParam: 1,
    getNextPageParam: (lastPage: CharactersPage) =>
      lastPage.info.next ?? undefined,
  });
}
