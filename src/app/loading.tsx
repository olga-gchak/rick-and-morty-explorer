import {CardSkeletonGrid} from '@/components/ui/CardSkeleton';

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="h-12 w-2/3 rounded bg-white/5" />
      <CardSkeletonGrid />
    </div>
  );
}
