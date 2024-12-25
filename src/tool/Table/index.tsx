import React from 'react';
import usePagination from '../../hooks/usePagination';
import { TableBody } from './body';
import { TableHeader } from './header';
import { PageNavigation } from './pagination';
import { ApiResponse } from '../../type';
type TableProps = {
  keywords: ApiResponse[];
};

export function Table({ keywords }: TableProps) {
  const { currentPage, dispatch } = usePagination();
  const headerTitle = ['', ...Object.keys(keywords[0] || {})];
  const quantity = keywords.length;

  return (
    <>
      {keywords.length > 0 && (
        <div className="text-sm p-2 max-w-screen-lg relative overflow-x-auto shadow-md sm:rounded-lg">
          <TableHeader headerTitle={headerTitle} />
          <TableBody
            keywords={keywords}
            currentPage={currentPage}
            headerTitle={headerTitle}
          />
          <PageNavigation
            quantity={quantity}
            currentPage={currentPage}
            dispatch={dispatch}
          />
        </div>
      )}
    </>
  );
}
