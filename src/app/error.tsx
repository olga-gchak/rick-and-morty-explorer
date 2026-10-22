'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="display-title text-2xl text-white">
        Something went wrong
      </h1>
      <p className="max-w-sm text-white/60">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-strong"
      >
        Try again
      </button>
    </div>
  );
}
