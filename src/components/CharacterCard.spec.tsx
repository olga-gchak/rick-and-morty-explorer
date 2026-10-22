import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import type {CharacterCard as CharacterCardType} from '@/lib/api/characters';

import {CharacterCard} from './CharacterCard';

const character: CharacterCardType = {
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('CharacterCard', () => {
  it('shows the character name, species and status', () => {
    render(<CharacterCard character={character} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
  });

  it('links to the character detail page', () => {
    render(<CharacterCard character={character} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/character/1');
  });

  it('exposes an accessible favourite toggle', () => {
    render(<CharacterCard character={character} />);
    expect(
      screen.getByRole('button', {name: /add rick sanchez to favourites/i}),
    ).toBeInTheDocument();
  });
});
