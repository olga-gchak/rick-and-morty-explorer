import {z} from 'zod';

import {gqlClient} from '@/lib/graphql/client';
import {CHARACTER_QUERY, CHARACTERS_QUERY} from '@/lib/graphql/queries';

export const statusSchema = z.enum(['Alive', 'Dead', 'unknown']);
export type CharacterStatus = z.infer<typeof statusSchema>;

const infoSchema = z.object({
  count: z.number().nullable(),
  pages: z.number().nullable(),
  next: z.number().nullable(),
  prev: z.number().nullable(),
});

const characterCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: statusSchema.catch('unknown'),
  species: z.string(),
  gender: z.string(),
  image: z.url().catch(''),
});
export type CharacterCard = z.infer<typeof characterCardSchema>;

const locationRefSchema = z.object({
  id: z.string().nullable(),
  name: z.string(),
  type: z.string(),
  dimension: z.string(),
});

const episodeRefSchema = z.object({
  id: z.string(),
  name: z.string(),
  episode: z.string(),
  air_date: z.string(),
});
export type EpisodeRef = z.infer<typeof episodeRefSchema>;

const characterDetailSchema = characterCardSchema.extend({
  type: z.string(),
  origin: locationRefSchema,
  location: locationRefSchema,
  episode: z.array(episodeRefSchema),
});
export type CharacterDetail = z.infer<typeof characterDetailSchema>;

const charactersResponseSchema = z.object({
  characters: z.object({
    info: infoSchema,
    results: z.array(characterCardSchema),
  }),
});

const characterResponseSchema = z.object({
  character: characterDetailSchema.nullable(),
});

export type CharactersPage = z.infer<
  typeof charactersResponseSchema
>['characters'];

export type CharacterFilter = {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
};

const cleanFilter = (filter: CharacterFilter): CharacterFilter =>
  Object.fromEntries(
    Object.entries(filter).filter(([, value]) => Boolean(value?.trim())),
  );

export async function fetchCharacters(
  page: number,
  filter: CharacterFilter = {},
): Promise<CharactersPage> {
  const data = await gqlClient.request(CHARACTERS_QUERY, {
    page,
    filter: cleanFilter(filter),
  });
  return charactersResponseSchema.parse(data).characters;
}

export async function fetchCharacter(
  id: string,
): Promise<CharacterDetail | null> {
  const data = await gqlClient.request(CHARACTER_QUERY, {id});
  return characterResponseSchema.parse(data).character;
}
