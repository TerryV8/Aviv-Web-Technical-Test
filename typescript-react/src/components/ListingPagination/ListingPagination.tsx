import React from 'react';
import styles from './listing-pagination.module.scss';

interface ListingPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ListingPagination: React.FC<ListingPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  // Only keep the last 10 pages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number): void => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  console.log('currentPage', currentPage);

  return (
    <div className="">
      <button
        disabled={currentPage === 1}
        onClick={() => {
          handlePageChange(currentPage - 1);
        }}
        className={`
        ${styles['listing-pagination__button-previous']} 
        ${currentPage === 1 ? styles['inactive'] : styles['active']}
      `}
      >
        &#8249;&#8249; Previous
      </button>
      {pages.map(
        (page) =>
          ((page <= Math.max(currentPage + 4, 9) &&
            page >= Math.max(0, currentPage - 4)) ||
            (currentPage >= totalPages - 3 && page >= totalPages - 8)) && (
            <button
              key={page}
              onClick={() => {
                handlePageChange(page);
              }}
              className={`${styles['listing-pagination__page-index']} ${
                currentPage === page ? styles['active'] : ''
              }`}
            >
              {page}
            </button>
          ),
      )}
      <button
        disabled={currentPage === totalPages}
        className={`
        ${styles['listing-pagination__button-next']} 
        ${currentPage === totalPages ? styles['inactive'] : styles['active']}
      `}
        onClick={() => {
          handlePageChange(currentPage + 1);
        }}
      >
        Next &#8250;&#8250;
      </button>
    </div>
  );
};
export default ListingPagination;
