import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {StatusBadge} from './StatusBadge';

describe('StatusBadge', () => {
  it('renders the human-readable label for each status', () => {
    const {rerender} = render(<StatusBadge status="Alive" />);
    expect(screen.getByText('Alive')).toBeInTheDocument();

    rerender(<StatusBadge status="Dead" />);
    expect(screen.getByText('Dead')).toBeInTheDocument();

    rerender(<StatusBadge status="unknown" />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});
