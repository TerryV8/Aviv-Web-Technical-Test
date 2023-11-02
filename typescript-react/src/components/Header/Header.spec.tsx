import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header'; // Adjust the import path as needed

describe('<Header />', () => {
  it('Should render the header component', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  it('Should display the logo', () => {
    render(<Header />);
    const logo = screen.getByAltText('logo Aviv');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/assets/logo-aviv.svg');
  });
});
