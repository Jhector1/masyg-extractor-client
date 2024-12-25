import React from 'react';
type TableHeaderProps = {
  headerTitle: string[];
};

export function TableHeader({ headerTitle }: TableHeaderProps) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      {headerTitle.map((title: string, index) => (
        <th key={title + index} scope="col" className="px-6 py-3">
          {title}
        </th>
      ))}
    </thead>
  );
}
