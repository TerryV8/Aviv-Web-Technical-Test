import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage'; // Adjust the import path as per your project structure

describe('NotFoundPage', () => {
  it('renders the 404 Not Found message', () => {
    render(<NotFoundPage />);

    const headingElement = screen.getByRole('heading', {
      name: /404 - Not Found/i,
    });
    const paragraphElement = screen.getByText(
      /The page or the url path you are looking for doesn’t exist./i,
    );

    expect(headingElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });
});
