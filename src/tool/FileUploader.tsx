import { useDropzone } from 'react-dropzone';
import useUnsavedChanges from '../hooks/useUnsavedChanges.ts';
import { useAuth } from '../context/index.tsx';

interface FileUploaderProps {
  files: File[];
  handleUpload: () => void;
  loading: boolean;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  openLoginModal: ()=>void;
}

export function FileUploader({ files, loading, setFiles, handleUpload , openLoginModal}: FileUploaderProps) {
  const { state } = useAuth();
  const [handleInputChange] = useUnsavedChanges();
  const clearFiles = () => setFiles([]);
  const onDrop = (acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > 10) {
      alert('You can only upload up to 10 files.');
      return;
    }
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'], // Accept only PDF files
    },
  });

  return (
    <div className='bg-gray-100 flex flex-col  rounded-lg items-center justify-center p-10'>
      <h1 className='text-2xl font-bold mb-6'>PDF Keyword Extractor</h1>
      <div
        {...getRootProps()}
        className='w-full max-w-md p-4 mb-4 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-white'>
        <input {...getInputProps()} />
        <p className='text-gray-600 text-center'>
          Drag and drop PDF files here, or click to select files
        </p>
      </div>

      {files.length > 0 && (
        <div className='text-center mb-4'>
          <p className='text-green-500'>Selected Files:</p>
          <ul className='list-disc pl-6'>
            {files.map((file, index) => (
              <li key={index} className='text-gray-700'>
                {file.name} - {(file.size / 1024).toFixed(2)} KB
              </li>
            ))}
          </ul>
          <button
            onClick={clearFiles}
            className='mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
            Clear Files
          </button>
        </div>
      )}
      {/* Extract Keywords Button */}
      <button
        onClick={() => {
          if (state.isAuthenticated) {
            handleUpload();
            handleInputChange();
          }else{
            openLoginModal();
          }
        }}
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        disabled={loading}>
        {loading ? 'Extracting Keywords...' : 'Extract Keywords'}
      </button>
    </div>
  );
}
