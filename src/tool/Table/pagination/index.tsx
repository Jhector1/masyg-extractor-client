import React from 'react';

type PaginationProps = {
  quantity: number; // Total number of pages
  currentPage: number; // Current page (last item index shown)
  dispatch: React.Dispatch<
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'goto'; value: number }
  >;
};

export function PageNavigation({
  quantity,
  currentPage,
  dispatch,
}: PaginationProps) {
  const sumPage = quantity;
  quantity = Math.ceil(quantity / 10);
  const itemsPerPage = 10;
  const totalItems = quantity * itemsPerPage;
  const startItem = Math.max(currentPage - itemsPerPage + 1, 1); // Prevent below 1
  const endItem = Math.min(currentPage, sumPage);

  // if (endItem > sumPage) {
  //   endItem = endItem- endItem%sumPage;
  // }

  return (
    <nav
      className="flex items-center flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation"
    >
      {/* Displaying Current Page Info */}
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {startItem}-{endItem}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {sumPage}
        </span>
      </span>

      {/* Pagination Buttons */}
      {quantity > 1 && (
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          {/* Previous Button */}
          <button
            disabled={currentPage <= itemsPerPage}
            onClick={() => dispatch({ type: 'decrement' })}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg ${
              currentPage > itemsPerPage
                ? 'hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
                : 'cursor-not-allowed opacity-50'
            } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
            aria-label="Previous page"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: quantity }).map((_, i) => {
            const page = (i + 1) * itemsPerPage;
            return (
              <li key={i}>
                <button
                  onClick={() => dispatch({ type: 'goto', value: page })}
                  className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                    currentPage === page
                      ? 'text-white bg-blue-600'
                      : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                >
                  {i + 1}
                </button>
              </li>
            );
          })}

          {/* Next Button */}
          <button
            disabled={currentPage >= totalItems}
            onClick={() => dispatch({ type: 'increment' })}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg ${
              currentPage < totalItems
                ? 'hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
                : 'cursor-not-allowed opacity-50'
            } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
            aria-label="Next page"
          >
            Next
          </button>
        </ul>
      )}
    </nav>
  );
}
