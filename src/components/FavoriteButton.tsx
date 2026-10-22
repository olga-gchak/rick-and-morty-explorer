'use client';

import {useEffect, useState} from 'react';

import {useFavoritesStore} from '@/lib/store/favorites';
import {cn} from '@/lib/utils/cn';

export function FavoriteButton({
  id,
  name,
  className,
}: {
  id: string;
  name: string;
  className?: string;
}) {
  const toggle = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => Boolean(s.ids[id]));

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active = mounted && isFavorite;

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={active}
      aria-label={
        active ? `Remove ${name} from favourites` : `Add ${name} to favourites`
      }
      title={active ? 'Remove from favourites' : 'Add to favourites'}
      className={cn(
        'grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-ink-900/60 backdrop-blur transition',
        'hover:scale-110 hover:border-brand/60',
        active ? 'text-brand' : 'text-white/70',
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 21s-6.7-4.35-9.33-8.02C.9 10.27 1.6 6.6 4.6 5.3c2.03-.88 4.1-.2 5.4 1.47L12 8.7l2-1.93c1.3-1.67 3.37-2.35 5.4-1.47 3 1.3 3.7 4.97 1.93 7.68C18.7 16.65 12 21 12 21z" />
      </svg>
    </button>
  );
}
