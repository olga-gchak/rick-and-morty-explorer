'use client';

import {useEffect, useState} from 'react';

import {useDebouncedValue} from '@/hooks/useDebouncedValue';
import {useFilterNavigation} from '@/hooks/useFilterNavigation';

export function SearchBar() {
  const {searchParams, setParam} = useFilterNavigation();
  const urlValue = searchParams.get('name') ?? '';

  const [value, setValue] = useState(urlValue);
  const debounced = useDebouncedValue(value, 400);

  useEffect(() => {
    if (debounced !== urlValue) setParam('name', debounced);
  }, [debounced, urlValue, setParam]);

  useEffect(() => {
    setValue(urlValue);
  }, [urlValue]);

  return (
    <div className="relative w-full">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3-3" strokeLinecap="round" />
      </svg>
      <label htmlFor="character-search" className="sr-only">
        Search characters by name
      </label>
      <input
        id="character-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search characters…"
        autoComplete="off"
        className="glass h-12 w-full rounded-full pl-12 pr-4 text-sm text-white transition-colors placeholder:text-white/40 hover:border-white/25 hover:bg-white/[0.06] focus:border-brand/60"
      />
    </div>
  );
}
