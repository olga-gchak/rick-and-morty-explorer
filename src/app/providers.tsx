'use client';

import {type PropsWithChildren} from 'react';
import {QueryClientProvider} from '@tanstack/react-query';

import {getQueryClient} from '@/lib/get-query-client';

export function Providers({children}: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
