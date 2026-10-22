import type {EpisodeRef} from '@/lib/api/characters';

export function EpisodeList({episodes}: {episodes: EpisodeRef[]}) {
  if (episodes.length === 0) {
    return <p className="text-sm text-white/50">No episode data available.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {episodes.map((episode) => (
        <li
          key={episode.id}
          className="glass flex items-center justify-between gap-3 rounded-xl px-4 py-3"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {episode.name}
            </p>
            <p className="text-xs text-white/40">{episode.air_date}</p>
          </div>
          <span className="shrink-0 rounded-full border border-brand/40 px-2.5 py-1 text-xs font-semibold text-brand-soft">
            {episode.episode}
          </span>
        </li>
      ))}
    </ul>
  );
}
