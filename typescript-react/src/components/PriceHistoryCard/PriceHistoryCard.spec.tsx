import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PriceHistoryCard from './PriceHistoryCard'; // Adjust the import path as per your project structure

// Mocking the utility functions
jest.mock('@/utils/dateUtils', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue('Mocked Date'),
}));

jest.mock('../../utils/priceUtils', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue('Mocked Price'),
}));

describe('PriceHistoryCard', () => {
  it('renders the price history card with formatted date and price', () => {
    const mockProps = {
      created_date: '2023-10-30',
      price_eur: 1000,
    };

    render(<PriceHistoryCard {...mockProps} />);

    const dateElement = screen.getByText('Mocked Date');
    const priceElement = screen.getByText('Mocked Price');

    expect(dateElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });
});
