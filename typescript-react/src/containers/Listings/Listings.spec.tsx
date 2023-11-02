import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';

import Listings from './Listings';

// Creating a mock instance of axios
const mockAxios = new MockAdapter(axios);

// Sample data to be returned by the mock
const listingsData = [
  {
    id: '1',
    latest_price_eur: 100000,
    building_type: 'Apartment',
    surface_area_m2: 80,
    rooms_count: 3,
    postal_address: {
      city: 'Berlin',
      country: 'Germany',
      postal_code: '10115',
      street_address: 'Alexanderplatz',
    },
    description: 'A nice apartment in Berlin',
    updated_date: '2023-10-30',
  },
  // Add more listing objects as needed
];

describe('<Listings /> test suite', () => {
  // Resetting mock info before each test
  beforeEach(() => {
    mockAxios.reset();
  });

  it('Should render the <Listings /> component', async () => {
    // Mocking the GET request to return a successful response
    mockAxios.onGet().reply(200, listingsData);

    render(
      <BrowserRouter>
        <Listings />
      </BrowserRouter>,
    );

    // Waiting for the component to finish loading
    await waitFor(() => screen.getByText('Main Listings page'));

    // Checking if the loading text is not in the document
    expect(screen.queryByText('Loading listings...')).not.toBeInTheDocument();

    // Checking if the listings are rendered
    listingsData.forEach((listing) => {
      expect(screen.getByText(listing.description)).toBeInTheDocument();
    });
  });

  it('Should render loading state', () => {
    render(<Listings />);
    expect(screen.getByText('Loading listings...')).toBeInTheDocument();
  });

  it('Should handle loading error', async () => {
    // Mocking the GET request to return an error response
    mockAxios.onGet().reply(500);

    render(<Listings />);

    // Waiting for the component to finish loading
    await waitFor(() => screen.getByText('Error: Failed to fetch listings'));

    // Checking if the error message is rendered
    expect(
      screen.getByText('Error: Failed to fetch listings'),
    ).toBeInTheDocument();
  });
});
