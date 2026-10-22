'use client';

import {useCallback} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

export function useFilterNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value?.trim()) {
        params.set(key, value.trim());
      } else {
        params.delete(key);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const clearAll = useCallback(() => {
    router.replace(pathname, {scroll: false});
  }, [pathname, router]);

  return {searchParams, setParam, clearAll};
}
