import type {CharacterFilter} from '@/lib/api/characters';

export const STATUS_OPTIONS = ['Alive', 'Dead', 'unknown'] as const;

export const SPECIES_OPTIONS = [
  'Human',
  'Alien',
  'Humanoid',
  'Robot',
  'Animal',
  'Mythological Creature',
  'Poopybutthole',
  'Cronenberg',
  'Disease',
] as const;

export const GENDER_OPTIONS = [
  'Female',
  'Male',
  'Genderless',
  'unknown',
] as const;

export function parseFilters(
  params: Record<string, string | string[] | undefined>,
): CharacterFilter {
  const read = (key: string): string | undefined => {
    const value = params[key];
    const raw = Array.isArray(value) ? value[0] : value;
    return raw?.trim() ? raw.trim() : undefined;
  };

  return {
    name: read('name'),
    status: read('status'),
    species: read('species'),
    gender: read('gender'),
  };
}

export function filtersToSearchParams(
  filter: CharacterFilter,
): URLSearchParams {
  const params = new URLSearchParams();
  for (const key of ['name', 'status', 'species', 'gender'] as const) {
    const value = filter[key];
    if (value?.trim()) params.set(key, value.trim());
  }
  return params;
}

export const hasActiveFilters = (filter: CharacterFilter): boolean =>
  Object.values(filter).some((value) => Boolean(value?.trim()));
