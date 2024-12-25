import QuickActions from '../../../tool/converter';
import React, { useMemo, useState } from 'react';
export default function AllDocs({ uploads, loading }: SidebarProps) {
  return (<>
  <AllDocsAccordionFileDistributor uploads={uploads} loading={loading} />
 <QuickActions />; </> )
}




interface SidebarProps {
  uploads: {
    group_id: string;
    date: string;
    total_size: number;
    files: Record<string, number>; // file name -> size
  }[];
  loading: boolean;
}

 function AllDocsAccordionFileDistributor({ uploads, loading }: SidebarProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleDeleteGroup = (groupId: string) => {
    console.log(`Deleting group: ${groupId}`);
    // Implement delete logic here
  };

  return (
    <div className="max-w-[25rem] p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Uploaded Files</h2>

      {loading ? (
        <div className="p-5 text-center text-gray-500">Loading uploads...</div>
      ) : uploads.length === 0 ? (
        <div className="p-5 text-center text-gray-500">No uploads found.</div>
      ) : (
        uploads.map((item, index) => (
          <div
            key={index}
            className="mb-4 border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            {/* Group Header */}
            <button
              type="button"
              className={`flex items-center justify-between w-full px-4 py-2 text-left font-medium text-gray-800 ${
                activeIndex === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 hover:bg-blue-50'
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex flex-col">
                <span className="font-semibold">{item.group_id}</span>
                <span className="text-sm text-gray-500">
                  Total Size: {(item.total_size / 1024).toFixed(2)} KB | Date: {item.date}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className={`w-5 h-5 transition-transform transform ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent accordion toggle
                    handleDeleteGroup(item.group_id);
                  }}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Delete group"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </button>

            {/* Nested File Names */}
            <div
              className={`transition-all duration-300 ${
                activeIndex === index ? 'max-h-screen' : 'max-h-0'
              } overflow-hidden`}
            >
              <div className="bg-gray-50 p-4">
                {Object.entries(item.files).map(([file, size], fileIndex) => (
                  <div
                    key={fileIndex}
                    className="flex items-center p-2 mb-2 bg-white border border-gray-200 rounded-md shadow-sm"
                  >
                    <span className="flex-1 text-gray-700">{file}</span>
                    <span className="text-sm text-gray-500">
                      {(size / 1024).toFixed(2)} KB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
