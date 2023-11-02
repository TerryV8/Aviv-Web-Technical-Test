import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ListingCard from './ListingCard';

const mockData = {
  latest_price_eur: 350000,
  building_type: 'APARTEMENT',
  surface_area_m2: 120,
  rooms_count: 5,
  postal_address: {
    street_address: '123 Main St',
    postal_code: '12345',
    city: 'Anytown',
    country: 'Country',
  },
  description: 'A lovely apartment in the city center.',
  id: 'abcd1234',
  updated_date: '2023-10-30T12:34:56Z',
};

describe('<ListingCard /> test suite', () => {
  it('Should render the <ListingCard /> component', () => {
    render(
      <BrowserRouter>
        <ListingCard {...mockData} />
      </BrowserRouter>,
    );
    expect(screen.getByText(/350 000 €/i)).toBeInTheDocument();
    expect(screen.getByText(/Apartment/i)).toBeInTheDocument();
    expect(screen.getByText(/120m/i)).toBeInTheDocument();
    expect(screen.getByText(/5 rooms/i)).toBeInTheDocument();
    expect(
      screen.getByText(/123 Main St, 12345, Anytown/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A lovely apartment in the city center./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Ref: abcd1234/i)).toBeInTheDocument();
    expect(screen.getByText(/Last update: 2023\/10\/30/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /See history →/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /See history →/i }),
    ).toHaveAttribute('href', '/abcd1234/prices');
  });
});
