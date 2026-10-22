'use client';

import {useFilterNavigation} from '@/hooks/useFilterNavigation';
import {GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS} from '@/lib/filters';

function FilterSelect({
  name,
  label,
  options,
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <label htmlFor={`filter-${name}`} className="sr-only">
        {label}
      </label>
      <select
        id={`filter-${name}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="glass h-11 w-full cursor-pointer appearance-none rounded-full pl-4 pr-9 text-sm text-white/90 transition-colors hover:border-white/25 hover:bg-white/[0.06] focus:border-brand/60 sm:w-auto"
      >
        <option value="">{label}: All</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-ink-700 text-white">
            {option === 'unknown' ? 'Unknown' : option}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function Filters() {
  const {searchParams, setParam, clearAll} = useFilterNavigation();

  const status = searchParams.get('status') ?? '';
  const species = searchParams.get('species') ?? '';
  const gender = searchParams.get('gender') ?? '';
  const anyActive = Boolean(
    status || species || gender || searchParams.get('name'),
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterSelect
        name="status"
        label="Status"
        options={STATUS_OPTIONS}
        value={status}
        onChange={(v) => setParam('status', v)}
      />
      <FilterSelect
        name="species"
        label="Species"
        options={SPECIES_OPTIONS}
        value={species}
        onChange={(v) => setParam('species', v)}
      />
      <FilterSelect
        name="gender"
        label="Gender"
        options={GENDER_OPTIONS}
        value={gender}
        onChange={(v) => setParam('gender', v)}
      />
      {anyActive ? (
        <button
          type="button"
          onClick={clearAll}
          className="h-11 rounded-full px-4 text-sm font-medium text-white/60 transition hover:text-brand"
        >
          Clear all
        </button>
      ) : null}
    </div>
  );
}
