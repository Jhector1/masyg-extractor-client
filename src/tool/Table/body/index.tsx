import React from 'react';
import { ApiResponse } from '../../../type';

type TableBodyProps = {
  keywords: ApiResponse[];
  currentPage: number;
  headerTitle: string[];
};

export function TableBody({ keywords, currentPage }: TableBodyProps) {
  const itemsPerPage = 10; // Define items per page for clarity
  const startIndex = currentPage - itemsPerPage;

  return (
    <tbody>
      {keywords
        .slice(startIndex, currentPage) // Adjusted slice for clarity
        .map((items: ApiResponse, index: number) => {
          const rowIndex = startIndex + index + 1;

          // Render a table row
          return (
            <tr
              key={`${rowIndex}-${currentPage}`}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{rowIndex}</td>

              {Object.values(items)

                .map((value: unknown, columnIndex) => (
                  <td key={`${value}-${columnIndex}`} className="px-6 py-4">
                    {value as string}
                  </td>
                ))}
            </tr>
          );
        })}
    </tbody>
  );
}
