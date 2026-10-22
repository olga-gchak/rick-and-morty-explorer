'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';

import {selectFavoriteCount, useFavoritesStore} from '@/lib/store/favorites';

export function Header() {
  const count = useFavoritesStore(selectFavoriteCount);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const displayCount = mounted ? count : 0;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink-900/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-violet font-display text-lg font-bold text-white shadow-glow-soft">
            R
          </span>
          <span className="display-title text-lg leading-none text-white">
            Rick&nbsp;&amp;&nbsp;Morty
            <span className="block text-[0.6rem] font-normal tracking-[0.3em] text-white/40">
              EXPLORER
            </span>
          </span>
        </Link>

        <span className="flex items-center gap-2 text-sm text-white/60">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-brand"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 21s-6.7-4.35-9.33-8.02C.9 10.27 1.6 6.6 4.6 5.3c2.03-.88 4.1-.2 5.4 1.47L12 8.7l2-1.93c1.3-1.67 3.37-2.35 5.4-1.47 3 1.3 3.7 4.97 1.93 7.68C18.7 16.65 12 21 12 21z" />
          </svg>
          <span className="tabular-nums">{displayCount}</span>
          <span className="hidden sm:inline">
            {displayCount === 1 ? 'favourite' : 'favourites'}
          </span>
        </span>
      </div>
    </header>
  );
}
