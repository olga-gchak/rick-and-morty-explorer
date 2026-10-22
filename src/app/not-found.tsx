import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <p className="display-title text-7xl text-brand">404</p>
      <h1 className="display-title text-2xl text-white">
        Lost in the multiverse
      </h1>
      <p className="max-w-sm text-white/60">
        This character or page doesn&apos;t exist in any known dimension.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-strong"
      >
        Back to explorer
      </Link>
    </div>
  );
}
