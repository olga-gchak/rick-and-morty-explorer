export function CardSkeleton() {
  return (
    <div className="glass overflow-hidden rounded-xl2">
      <div className="relative aspect-square w-full overflow-hidden bg-white/5">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/5" />
      </div>
    </div>
  );
}

export function CardSkeletonGrid({count = 8}: {count?: number}) {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      aria-hidden="true"
    >
      {Array.from({length: count}, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
