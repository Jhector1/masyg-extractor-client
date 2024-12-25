import axios, { AxiosResponse } from 'axios';
import { DetailsType, KeywordsType } from '../../../type';

// Axios instance
const axiosWithCredentials = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/extractor`,
  withCredentials: true, // Required for session cookies
});

/**
 * Fetches and processes data.
 * @param isInitialFetch - Whether it's an initial fetch from the server.
 * @param setLoading - State setter for loading state.
 * @param setKeywords - State setter for keywords.
 * @param setUploads - State setter for uploads.
 * @param uploads - Current uploads state.
 * @param selectedFiles - Selected files to filter data.
 */
export const fetchAndProcessData = async (
  isInitialFetch: boolean,
  setLoading: (loading: boolean) => void,
  setKeywords: (keywords: KeywordsType[]) => void,
  setUploads: (uploads: any[]) => void,
  uploads: any[],
  selectedFiles: string[],
) => {
  try {
    setLoading(true);

    let fetchedUploads = uploads;

    // Fetch uploads only if it's the initial fetch
    if (isInitialFetch) {
      const response: AxiosResponse<{ uploads: any[] }> =
        await axiosWithCredentials.get('/get-user-data');
      fetchedUploads = response.data.uploads || [];

      if (fetchedUploads.length === 0) {
        console.warn('No uploads found for the current user.');
        setUploads([]);
        setKeywords([]);
        return;
      }

      setUploads(fetchedUploads);
    }

    // Flatten data files
    const allData = flattenUploadsData(fetchedUploads);

    if (Object.keys(allData).length === 0) {
      console.warn('No valid files found in uploads.');
      setKeywords([]);
      return;
    }

    // Filter selected files or default to most recent group
    const filesToProcess = selectedFiles.length
      ? filterFiles(allData, selectedFiles)
      : fetchedUploads[0]?.files || {};

    if (!filesToProcess || Object.keys(filesToProcess).length === 0) {
      console.warn('No files to process.');
      setKeywords([]);
      return;
    }

    // Transform data into keywords
    const keywords = transformToKeywords(filesToProcess);
    setKeywords(keywords);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
    alert('An error occurred while fetching or processing data. Please try again.');
  } finally {
    setLoading(false);
  }
};

/**
 * Handles file uploads.
 * @param files - Files to be uploaded.
 * @param setLoading - State setter for loading state.
 * @param setKeywords - State setter for keywords.
 * @param setUploads - State setter for uploads.
 * @param uploads - Current uploads state.
 * @param selectedFiles - Selected files to filter data.
 */
export const masygHandleUpload = async (
  files: File[],
  setLoading: (loading: boolean) => void,
  setKeywords: (keywords: KeywordsType[]) => void,
  setUploads: (uploads: any[]) => void,
  uploads: any[],
  selectedFiles: string[],
) => {
  if (files.length === 0) {
    alert('Please upload at least one file!');
    return;
  }

  const formData = createFormData(files);

  try {
    setLoading(true);

    // Upload files to the server
    await axiosWithCredentials.post('/extract-data', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Fetch and process data after upload
    await fetchAndProcessData(true, setLoading, setKeywords, setUploads, uploads, selectedFiles);
  } catch (error) {
    console.error('Error uploading files:', error);
    alert('An error occurred while uploading files. Please try again.');
  } finally {
    setLoading(false);
  }
};

/**
 * Flattens uploads data into a single object.
 * @param uploads - Array of uploads.
 * @returns Flattened data.
 */
const flattenUploadsData = (uploads: any[]): Record<string, any> => {
  console.log(uploads);
  return uploads.reduce((acc, datafile) => {
    if (datafile.files) {
      Object.entries(datafile.files).forEach(([fileName, details]) => {
        acc[fileName] = details;
      });
    }
    return acc;
  }, {});
};

/**
 * Filters files based on selected filenames.
 * @param allData - All available data.
 * @param selectedFiles - Files selected for processing.
 * @returns Filtered files data.
 */
const filterFiles = (allData: Record<string, any>, selectedFiles: string[]) => {
  return selectedFiles.reduce((filtered: any, file) => {
    if (allData[file]) {
      filtered[file] = allData[file];
    }
    return filtered;
  }, {});
};

/**
 * Transforms files data into keywords.
 * @param files - Files to be processed.
 * @returns Transformed keywords.
 */
const transformToKeywords = (files: Record<string, any>): KeywordsType[] => {
  return Object.entries(files).reduce((acc: KeywordsType[], [file, objects]) => {
    (objects as DetailsType[]).forEach(object => {
      acc.push({
        ID: object.ProductId,
        SourceFile: file,
        Description: object.Description,
        Quantity: object.Qty,
        Price: object.Price,
        Cost: object.Ext_Price,
      });
    });
    return acc;
  }, []);
};

/**
 * Creates FormData from files.
 * @param files - Array of files.
 * @returns FormData object.
 */
const createFormData = (files: File[]): FormData => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  return formData;
};

export const handleDeleteGroup = async (
  groupId: string,

  setLoading: (loading: boolean) => void,

  setUploads: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  if (!window.confirm(`Are you sure you want to delete group ${groupId}?`)) {
    return;
  }

  try {
    setLoading(true);
    await axiosWithCredentials.delete(`/delete-group/${groupId}`); // Adjust endpoint as needed
    setUploads(prev => prev.filter(group => group.group_id !== groupId));
    alert(`Group ${groupId} deleted successfully.`);
  } catch (err: any) {
    alert(`Failed to delete group ${groupId}.`);
  } finally {
    setLoading(false);
  }
};

// useEffect(() => {
//   fetchUploads();
// }, []);
