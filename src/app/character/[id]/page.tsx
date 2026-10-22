import {cache} from 'react';
import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';

import {fetchCharacter} from '@/lib/api/characters';
import {CharacterImage} from '@/components/CharacterImage';
import {EpisodeList} from '@/components/EpisodeList';
import {FavoriteButton} from '@/components/FavoriteButton';
import {InfoGrid} from '@/components/InfoGrid';
import {StatusBadge} from '@/components/ui/StatusBadge';

type Params = {id: string};

const getCharacter = cache((id: string) =>
  fetchCharacter(id).catch(() => null),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const {id} = await params;
  const character = await getCharacter(id);
  if (!character) return {title: 'Character not found'};
  return {
    title: character.name,
    description: `${character.name} — ${character.species}, ${character.status}. View origin, last known location and episode appearances.`,
    openGraph: {
      title: character.name,
      images: [{url: character.image}],
    },
  };
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const {id} = await params;
  const character = await getCharacter(id);

  if (!character) notFound();

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-brand"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            d="m15 18-6-6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to explorer
      </Link>

      <div className="grid gap-8 md:grid-cols-[320px_1fr]">
        <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-xl2 border border-white/10 shadow-glow-soft md:mx-0">
          <CharacterImage
            src={character.image}
            alt={character.name}
            sizes="320px"
            priority
          />
          <FavoriteButton
            id={character.id}
            name={character.name}
            className="absolute right-3 top-3 h-11 w-11"
          />
        </div>

        <div className="space-y-6">
          <header className="space-y-3">
            <div className="flex items-center gap-3">
              <StatusBadge status={character.status} />
              <span className="text-sm text-white/40">#{character.id}</span>
            </div>
            <h1 className="display-title text-4xl text-white sm:text-5xl">
              {character.name}
            </h1>
            <p className="text-white/60">
              {character.species}
              {character.type ? ` · ${character.type}` : ''} ·{' '}
              {character.gender}
            </p>
          </header>

          <InfoGrid character={character} />
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="display-title text-2xl text-white">
          Episodes{' '}
          <span className="text-base font-normal text-white/40">
            ({character.episode.length})
          </span>
        </h2>
        <EpisodeList episodes={character.episode} />
      </section>
    </div>
  );
}
