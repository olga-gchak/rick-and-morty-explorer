import './global.css';

import type {Metadata} from 'next';
import {Inter, Oswald} from 'next/font/google';

import {Header} from '@/components/Header';

import {Providers} from './providers';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: 'Rick & Morty Explorer',
    template: '%s · Rick & Morty Explorer',
  },
  description:
    'Browse, search and filter every character from the Rick and Morty multiverse.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-dvh">
        <Providers>
          <Header />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
