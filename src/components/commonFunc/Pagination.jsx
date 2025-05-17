import React from "react";

const Pagination = ({ currentPage = 1, totalItems = 0, itemsPerPage = 10, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;
  
  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };
  
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="d-flex justify-content-between mt-4">
      <div className="d-flex align-items-center">
        <span className="me-2">
          Page {currentPage} of {totalPages}
        </span>
        <span className="ml-2">
          Total Items: {totalItems}
        </span>
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link"
              aria-label="Go to first page"
              onClick={() => handlePageClick(1)}
              disabled={currentPage === 1}
            >
              <span aria-hidden="true">&laquo;&laquo;</span>
            </button>
          </li>
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link"
              aria-label="Go to previous page"
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          
          {getPageNumbers().map((pageNum) => (
            <li
              key={pageNum}
              className={`page-item ${pageNum === currentPage ? 'active' : ''}`}
            >
              <button 
                className="page-link"
                onClick={() => handlePageClick(pageNum)}
              >
                {pageNum}
              </button>
            </li>
          ))}
          
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link"
              aria-label="Go to next page"
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link"
              aria-label="Go to last page"
              onClick={() => handlePageClick(totalPages)}
              disabled={currentPage === totalPages}
            >
              <span aria-hidden="true">&raquo;&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;