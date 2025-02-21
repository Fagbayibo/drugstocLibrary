interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];
  
  if (totalPages <= 5) {
    pageNumbers.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
  } else {
    if (currentPage > 3) pageNumbers.push(1, "...");

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 2) pageNumbers.push("...", totalPages);
  }

  return (
    <div className="flex justify-center my-12 pagination">
      <button
        className={`px-4 py-2 mx-1 border font-poppins tracking-tight cursor-pointer text-sm rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {pageNumbers.map((num, index) =>
        typeof num === "number" ? (
          <button
            key={index}
            className={`px-4 py-2 mx-1 border font-poppins rounded-full cursor-pointer ${currentPage === num ? "bg-blue-500 text-white" : ""}`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        ) : (
          <span key={index} className="px-2 py-2 mx-1 font-poppins">
            {num}
          </span>
        )
      )}

      <button
        className={`px-4 py-2 mx-1 border rounded-full font-poppins tracking-tighter text-sm cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
