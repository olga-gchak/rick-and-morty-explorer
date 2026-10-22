'use client';

import {useState} from 'react';
import Image from 'next/image';

import {cn} from '@/lib/utils/cn';

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

function Placeholder({label}: {label: string}) {
  return (
    <div
      className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-600 to-ink-800"
      role="img"
      aria-label={`${label} — no image available`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-1/3 w-1/3 text-white/15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m3 17 5-5 4 4 3-3 6 6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function CharacterImage({src, alt, sizes, priority, className}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (!src || errored) return <Placeholder label={alt} />;

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 overflow-hidden bg-white/5">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={cn(
          'object-cover transition duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
      />
    </>
  );
}
