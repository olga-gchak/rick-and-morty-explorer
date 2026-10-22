import Link from 'next/link';

import type {CharacterCard as CharacterCardType} from '@/lib/api/characters';
import {CharacterImage} from '@/components/CharacterImage';
import {FavoriteButton} from '@/components/FavoriteButton';
import {StatusBadge} from '@/components/ui/StatusBadge';

export function CharacterCard({
  character,
  priority = false,
}: {
  character: CharacterCardType;
  priority?: boolean;
}) {
  return (
    <article className="group relative overflow-hidden rounded-xl2 border border-white/10 bg-ink-700 transition duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-glow">
      <div className="relative aspect-square w-full overflow-hidden">
        <CharacterImage
          src={character.image}
          alt={character.name}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="scale-[1.02] group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-700 to-transparent" />
        <FavoriteButton
          id={character.id}
          name={character.name}
          className="absolute right-2 top-2 z-20"
        />
      </div>

      <div className="relative -mt-px space-y-1 bg-ink-700 p-4">
        <h3 className="display-title truncate text-lg text-white group-hover:text-brand-soft">
          {character.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm text-white/60">
            {character.species}
          </span>
          <StatusBadge status={character.status} />
        </div>
      </div>

      <Link
        href={`/character/${character.id}`}
        aria-label={character.name}
        className="absolute inset-0 z-10"
      />
    </article>
  );
}
