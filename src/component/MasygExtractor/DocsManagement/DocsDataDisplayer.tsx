import { useAuth } from '../../../context';
import { exportToExcel } from '../../../helper';
import useUnsavedChanges from '../../../hooks/useUnsavedChanges';
import { Table } from '../../../tool/Table';
import { KeywordsType } from '../../../type';
import DocsAccordionFileDistributor from './DocsAccordionFileDistributor';
interface DocsDataDisplayerProps {
  keywords: KeywordsType[];

  uploads: any[];
  selectedFiles: string[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
  openExceUploaderModal: () => void;
  openSubscriptionModal: () => void;
  setUploads: React.Dispatch<React.SetStateAction<any[]>>;
  setLoading: (  loading: boolean)=>void;
}
export function DocsDataDisplayer({
  keywords,
  selectedFiles,
  uploads,
  setSelectedFiles,
  openExceUploaderModal,
  loading,
  openSubscriptionModal,
  setLoading,
  setUploads
}: DocsDataDisplayerProps) {
  const { state } = useAuth();
  const [handleSaveData] = useUnsavedChanges();
  return (
    <div className='mt-6 w-full overflow-y-scroll h-full bg-white shadow-md rounded-lg p-4'>
      <h2 className='text-lg font-bold mb-4'>Extracted Keywords</h2>
      <hr />
      <div className='flex gap-5 justify-around'>
        <Table keywords={keywords} />
        <DocsAccordionFileDistributor
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          uploads={uploads}
          loading={loading}
          setLoading={setLoading}
          setUploads={setUploads}
        />
      </div>

      <div className='flex sticky bottom-0 bg-white items-center justify-between'>
        <button
          onClick={() => {
            if (state.user?.isSubscribed) exportToExcel(keywords, handleSaveData);
            else openSubscriptionModal();
          }}
          className='mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
          Export to Excel
        </button>

        <button
          onClick={openExceUploaderModal}
          className='block mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          type='button'>
          Combine with an excel File
        </button>
      </div>
    </div>
  );
}
