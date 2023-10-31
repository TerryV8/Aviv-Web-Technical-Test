import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from './InputField';
import type { RenderResult } from '@testing-library/react';

describe('<InputField />', () => {
  const mockOnChange = jest.fn();
  const setup = (props = {}): RenderResult => {
    return render(
      <InputField
        name="test-input"
        label="Test Input"
        value=""
        onChange={mockOnChange}
        {...props}
      />,
    );
  };

  it('renders correctly', () => {
    setup();
    const input = screen.getByLabelText(/test input/i);
    expect(input).toBeInTheDocument();
  });

  it('shows error message when error prop is provided', () => {
    setup({ error: 'Test Error' });
    const errorMessage = screen.getByText(/⚠ test error/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('calls onChange when input value is changed', () => {
    setup();
    const input = screen.getByLabelText(/test input/i);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
