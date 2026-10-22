'use client';

import {useEffect, useRef} from 'react';

export function useIntersection<T extends HTMLElement>(
  onIntersect: () => void,
  {enabled = true, rootMargin = '600px'} = {},
) {
  const ref = useRef<T | null>(null);
  const callbackRef = useRef(onIntersect);
  callbackRef.current = onIntersect;

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) callbackRef.current();
      },
      {rootMargin},
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, rootMargin]);

  return ref;
}
