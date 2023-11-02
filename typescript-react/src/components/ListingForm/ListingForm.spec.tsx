import { render, screen } from '@testing-library/react';
import ListingForm from '.';

// Mock useCountries hook
jest.mock('@/hooks/useCountries', () => ({
  __esModule: true,
  default: () => ({
    getAllCountries: () => [
      {
        label: 'United States',
        countryCode: 'US',
        flag: '🇺🇸',
        region: 'America',
      },
      { label: 'Canada', countryCode: 'CA', flag: '🇨🇦', region: 'America' },
      { label: 'France', countryCode: 'FR', flag: '🇫🇷', region: 'Europe' },
      { label: 'Germany', countryCode: 'DE', flag: '🇩🇪', region: 'Europe' },
      // ... other countries
    ],
  }),
}));

// Optional: Mock Axios if you are making HTTP requests in your component
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(async () => Promise.resolve({ status: 201 })), // eslint-disable-line @typescript-eslint/promise-function-async, @typescript-eslint/return-await
  },
}));

describe('<ListingForm />', () => {
  it('Should render the listing form component', () => {
    render(<ListingForm onListingAdded={() => {}} />);
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Property description:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Building type:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Surface area:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rooms count:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bedroom count:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street address:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal code:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone number:/i)).toBeInTheDocument();

    // Buttons
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();

    // Phone Input
    // Note: Phone input might need a more specific query depending on how it's rendered
    expect(
      screen.getByRole('textbox', { name: /Phone number:/i }),
    ).toBeInTheDocument();
  });
});
