import {cn} from '@/lib/utils/cn';
import type {CharacterStatus} from '@/lib/api/characters';

const STATUS_STYLES: Record<CharacterStatus, {dot: string; label: string}> = {
  Alive: {
    dot: 'bg-status-alive shadow-[0_0_8px_var(--tw-shadow-color)] shadow-status-alive',
    label: 'Alive',
  },
  Dead: {
    dot: 'bg-status-dead shadow-[0_0_8px_var(--tw-shadow-color)] shadow-status-dead',
    label: 'Dead',
  },
  unknown: {dot: 'bg-status-unknown', label: 'Unknown'},
};

export function StatusBadge({
  status,
  className,
}: {
  status: CharacterStatus;
  className?: string;
}) {
  const style = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium text-white/80',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('h-2 w-2 rounded-full', style.dot)}
      />
      {style.label}
    </span>
  );
}
