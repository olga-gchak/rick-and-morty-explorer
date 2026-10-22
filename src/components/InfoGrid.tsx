import type {CharacterDetail} from '@/lib/api/characters';

function displayValue(value: string): string {
  const trimmed = value.trim();
  return !trimmed || trimmed.toLowerCase() === 'unknown' ? '—' : trimmed;
}

function InfoRow({label, value}: {label: string; value: string}) {
  return (
    <div className="glass rounded-xl p-4">
      <dt className="text-xs uppercase tracking-widest text-white/40">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-white">{displayValue(value)}</dd>
    </div>
  );
}

export function InfoGrid({character}: {character: CharacterDetail}) {
  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <InfoRow label="Origin" value={character.origin.name} />
      <InfoRow label="Last known location" value={character.location.name} />
      <InfoRow label="Origin dimension" value={character.origin.dimension} />
      <InfoRow
        label="Location dimension"
        value={character.location.dimension}
      />
    </dl>
  );
}
