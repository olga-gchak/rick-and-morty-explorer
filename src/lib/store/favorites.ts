'use client';

import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export type FavoritesState = {
  ids: Record<string, true>;
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clear: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: {},
      toggle: (id) =>
        set((state) => {
          const next = {...state.ids};
          if (next[id]) {
            delete next[id];
          } else {
            next[id] = true;
          }
          return {ids: next};
        }),
      isFavorite: (id) => Boolean(get().ids[id]),
      clear: () => set({ids: {}}),
    }),
    {name: 'rne:favorites'},
  ),
);

export const selectFavoriteCount = (state: FavoritesState): number =>
  Object.keys(state.ids).length;
