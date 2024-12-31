import React, { useState } from 'react';
import * as XLSX from 'xlsx';

import { ApiResponse, KeywordsType } from '../../../../type';
import { parseCurrency } from '../../../../helper';

type ExcelUploaderProps = {
  //setFile: (file: File | null) => void;
  keywords: KeywordsType[];
  closeModal:()=> void;
  setData: (data: ApiResponse[]) => void;
};
export const handleFileUpload = (
  keywords: KeywordsType[],
  file: File | null,
  setData: (data: ApiResponse[]) => void
) => {
  if (!file) {
    console.error('No file selected.');
    return;
  }

  const reader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    try {
      const binaryStr = e.target?.result;
      if (!binaryStr) {
        throw new Error('Failed to read file.');
      }

      // Parse the file
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: ApiResponse[] = XLSX.utils.sheet_to_json(sheet);

      // Merge keyword data with sheet data
      const enrichedData = jsonData.map((item, index) => ({
        ...item,
        Description: keywords[index]?.Description || '',
        Price: parseCurrency(keywords[index]?.Price || '0'),
        Cost: parseCurrency(keywords[index]?.Cost || '0'),
        Quantity: Number(keywords[index]?.Quantity || 0),
      }));

      setData(enrichedData); // Update state with enriched data
   
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  reader.onerror = (error) => {
    console.error('Error reading file:', error);
  };

  reader.readAsBinaryString(file);
};

export const ExcelUploader = (
  {keywords, closeModal, setData}:ExcelUploaderProps) => {
  // Handle file upload
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Upload Excel File
      </h1>
      <div className="flex flex-col items-center">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = event.target.files?.[0];
            setFile(selectedFile || null);
          }}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      </div>

        <div className="flex items-center p-4 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => {
                  handleFileUpload(keywords, file, setData);
                  closeModal();
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Combine
              </button>
              <button
                onClick={closeModal}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
    </div>
  );
};

export default ExcelUploader;
