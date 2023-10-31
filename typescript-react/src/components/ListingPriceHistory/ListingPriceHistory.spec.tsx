import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import type { RenderResult } from '@testing-library/react';

import ListingPriceHistory from '.';

// Mock the axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// A helper function to render the component within a router context
const renderComponent = (listingId: string): RenderResult => {
  return render(
    <MemoryRouter initialEntries={[`/${listingId}/prices`]}>
      <Routes>
        <Route path="/:listingId/prices" element={<ListingPriceHistory />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('<ListingPriceHistory />', () => {
  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  it('should render the loading message when data is being fetched', () => {
    renderComponent('123');
    expect(
      screen.getByText(/Loading price history\.\.\./i),
    ).toBeInTheDocument();
  });

  it('should render the error message when the listing ID is invalid. Let us suppose that listing ID is only number, check for listing ID is not a number', () => {
    renderComponent('abc123');
    expect(screen.getByText(/Invalid listing ID/i)).toBeInTheDocument();
    screen.debug();
  });

  it('should render the error message when there is an error fetching the price history', async () => {
    // Set up axios to reject the promise
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));
    renderComponent('123');

    await waitFor(() => {
      expect(
        screen.getByText(/Error fetching price history/i),
      ).toBeInTheDocument();
    });
  });

  // Later when the back-end program is ready, we can test the price history data
  // it('should render the price history data when it is available', async () => {
  //   // Set up axios to resolve the promise with some data
  //   const priceHistoryData = [
  //     { created_date: '2023-01-17', price_eur: 150000 },
  //     { created_date: '2023-01-12', price_eur: 100000 },
  //   ];
  //   mockedAxios.get.mockResolvedValue({ data: priceHistoryData });
  //   renderComponent('123');

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText(/Price history page of ref. 123/i),
  //     ).toBeInTheDocument();
  //     expect(screen.getByText(/150 000 €/i)).toBeInTheDocument();
  //     expect(screen.getByText(/100 000 €/i)).toBeInTheDocument();
  //   });
  // });
});

// Later when the back-end program is ready, we can test the price history data
// it('should render the no price history message when there is no price history data', async () => {
//   // Set up axios to resolve the promise with no data
//   mockedAxios.get.mockResolvedValue({ data: [] });
//   renderComponent('123');

//   await waitFor(() =>
//     expect(
//       screen.getByText(/No price history available/i),
//     ).toBeInTheDocument(),
//   );
// });
