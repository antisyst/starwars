import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
  total: number;
  page: number;
  onChange: (newPage: number) => void;
  loading: boolean;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ total, page, onChange, loading, itemsPerPage }) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onChange(newPage);
    }
  };

  const handlePrevClick = () => {
    handlePageChange(page - 1);
  };

  const handleNextClick = () => {
    handlePageChange(page + 1);
  };

  return (
    <div className="pagination">
      {totalPages > 1 && (
        <button
          onClick={handlePrevClick}
          disabled={page === 1 || loading}
          className={`button ${page === 1 ? 'disabled' : ''}`}
          aria-label="Previous Page">
          <IoIosArrowBack />
        </button>
      )}
      <div className="numbers_flex">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <span
            key={pageNumber}
            className={`page-number ${pageNumber === page ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
            role="button"
            tabIndex={0}
            aria-label={`Page ${pageNumber}`}
          >
            {pageNumber}
          </span>
        ))}
      </div>
      {totalPages > 1 && (
        <button
          onClick={handleNextClick}
          disabled={page === totalPages || loading} 
          className="button next" 
          aria-label="Next Page">
         <IoIosArrowForward />
        </button>
      )}
    </div>
  );
};

export default Pagination;
