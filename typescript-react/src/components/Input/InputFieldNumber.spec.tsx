import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputFieldNumber from './InputFieldNumber';
import type { RenderResult } from '@testing-library/react';

describe('<InputFieldNumber />', () => {
  const mockOnChange = jest.fn();
  const setup = (props = {}): RenderResult => {
    return render(
      <InputFieldNumber
        name="test-number-input"
        label="Test Number Input"
        value="0"
        onChange={mockOnChange}
        {...props}
      />,
    );
  };

  it('renders correctly', () => {
    setup();
    const input = screen.getByLabelText(/test number input/i);
    expect(input).toBeInTheDocument();
  });

  it('increments the value when plus button is clicked', () => {
    setup();
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '1' }),
      }),
    );
  });

  it('decrements the value when minus button is clicked', () => {
    setup({ value: '2' });
    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '1' }),
      }),
    );
  });

  // ...additional tests for other behaviors...
});
