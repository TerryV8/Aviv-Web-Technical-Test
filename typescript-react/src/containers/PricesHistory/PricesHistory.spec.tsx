import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PricesHistory from './PricesHistory';
import React from 'react';

describe('<PricesHistory /> test suite', () => {
  it('Should render the <PricesHistory /> component', () => {
    render(<PricesHistory />);
    expect(screen.getByText('Prices History')).toBeInTheDocument();
    expect(screen.getByText(/Back Home/)).toBeInTheDocument();
  });
});
