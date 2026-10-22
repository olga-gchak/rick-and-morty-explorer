import type {CharacterFilter} from '@/lib/api/characters';

export const queryKeys = {
  characters: (filter: CharacterFilter) => ['characters', filter] as const,
  character: (id: string) => ['character', id] as const,
};
