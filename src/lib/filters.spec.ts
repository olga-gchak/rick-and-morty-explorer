import {parseFilters, filtersToSearchParams, hasActiveFilters} from './filters';

describe('parseFilters', () => {
  it('reads known keys and trims whitespace', () => {
    expect(
      parseFilters({name: '  rick ', status: 'Alive', extra: 'x'}),
    ).toEqual({
      name: 'rick',
      status: 'Alive',
      species: undefined,
      gender: undefined,
    });
  });

  it('treats empty / whitespace values as undefined', () => {
    expect(parseFilters({name: '   ', species: ''})).toEqual({
      name: undefined,
      status: undefined,
      species: undefined,
      gender: undefined,
    });
  });

  it('takes the first value of an array param', () => {
    expect(parseFilters({status: ['Dead', 'Alive']}).status).toBe('Dead');
  });
});

describe('filtersToSearchParams', () => {
  it('serialises only non-empty values in a stable order', () => {
    const params = filtersToSearchParams({
      gender: 'Male',
      name: 'rick',
      status: '',
    });
    expect(params.toString()).toBe('name=rick&gender=Male');
  });
});

describe('hasActiveFilters', () => {
  it('is false for an empty filter', () => {
    expect(hasActiveFilters({})).toBe(false);
  });

  it('is true when any field is set', () => {
    expect(hasActiveFilters({status: 'Alive'})).toBe(true);
  });
});
