import { render, fireEvent } from '@testing-library/react';
import ListingPagination from '.';

describe('<ListingPagination />', () => {
  it('Should render the listing pagination component', () => {
    const mockOnPageChange = jest.fn();
    const { getByText } = render(
      <ListingPagination
        totalPages={5}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(getByText('1')).toBeTruthy();
  });

  it('Should call onPageChange with the correct page when a page number is clicked', () => {
    const mockOnPageChange = jest.fn();
    const { getByText } = render(
      <ListingPagination
        totalPages={5}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(getByText('3'));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('Should call onPageChange with the next page when the next button is clicked', () => {
    const mockOnPageChange = jest.fn();
    const { getByText } = render(
      <ListingPagination
        totalPages={5}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(getByText('Next ››'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('Should call onPageChange with the previous page when the previous button is clicked', () => {
    const mockOnPageChange = jest.fn();
    const { getByText } = render(
      <ListingPagination
        totalPages={5}
        currentPage={2}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(getByText('‹‹ Previous'));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('Should not call onPageChange when the next button is clicked on the last page', () => {
    const mockOnPageChange = jest.fn();
    const { getByText } = render(
      <ListingPagination
        totalPages={5}
        currentPage={5}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(getByText('Next ››'));
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('Should not call onPageChange when the previous button is clicked on the first page', () => {
    const mockOnPageChange = jest.fn();
    const { getByText } = render(
      <ListingPagination
        totalPages={5}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(getByText('‹‹ Previous'));
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
