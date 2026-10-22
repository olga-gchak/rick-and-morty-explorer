import {useFavoritesStore, selectFavoriteCount} from './favorites';

describe('favorites store', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ids: {}});
  });

  it('toggles an id on and off', () => {
    const {toggle} = useFavoritesStore.getState();

    toggle('1');
    expect(useFavoritesStore.getState().isFavorite('1')).toBe(true);

    toggle('1');
    expect(useFavoritesStore.getState().isFavorite('1')).toBe(false);
  });

  it('tracks multiple favourites independently', () => {
    const {toggle} = useFavoritesStore.getState();
    toggle('1');
    toggle('2');

    expect(selectFavoriteCount(useFavoritesStore.getState())).toBe(2);
    expect(useFavoritesStore.getState().isFavorite('2')).toBe(true);
  });

  it('clears all favourites', () => {
    const {toggle, clear} = useFavoritesStore.getState();
    toggle('1');
    toggle('2');
    clear();

    expect(selectFavoriteCount(useFavoritesStore.getState())).toBe(0);
  });
});
