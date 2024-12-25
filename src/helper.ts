import { ApiResponse, PaymentMethod } from './type';
import * as XLSX from 'xlsx';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useAuth } from './context';
// Axios instance



export function parseCurrency(currency: string) {
  if (typeof currency !== 'string') {
    throw new Error('Input must be a string');
  }
  const cleaned = currency.replace(/[$,]/g, '');
  const number = parseFloat(cleaned);
  if (isNaN(number)) {
    throw new Error('Invalid currency format');
  }
  return number;
}





// *******************Export To Excel**************************

export const exportToExcel = (
  keywords: ApiResponse[],
  checkSave: () => void
) => {
  const data: ApiResponse[] = [];

  keywords.forEach((items: ApiResponse) => {
    console.log(items);

    data.push({ ...items });
  });
  checkSave();

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Keywords');
  XLSX.writeFile(wb, 'keywords.xlsx');
};


// *******************Checkout Handler**************************



