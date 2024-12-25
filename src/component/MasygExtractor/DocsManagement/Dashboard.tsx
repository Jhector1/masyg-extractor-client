import React, { useEffect, useState } from 'react';

import { ApiResponse, KeywordsType } from '../../../type';
import ExcelUploader from './Combiner/ExcelUploader';
import MasygModal from '../../../tool/Modal';
import { useModal } from '../../../hooks/useModal';
import useUnsavedChanges from '../../../hooks/useUnsavedChanges';
import Spinner from '../../../tool/Spinner';
import { useAuth } from '../../../context';
import AuthenticationForm from '../../authenticationForm';
import SubscriptionPlans from '../SettingsPage/Subscription';
import { FileUploader } from '../../../tool/FileUploader';
import { MasygCombiner } from './Combiner';
import { fetchAndProcessData, masygHandleUpload } from './client';
import { DocsDataDisplayer } from './DocsDataDisplayer';

interface MasygDashboardProps {
  isUploaderOpen: boolean;
  closeFileUploader: () => void;
  uploads: any[];
  setUploads: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const MasygDashboard: React.FC<MasygDashboardProps> = ({
  isUploaderOpen,
  closeFileUploader,
  uploads,
  setUploads,
  loading,
  setLoading,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [keywords, setKeywords] = useState<KeywordsType[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ApiResponse[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const { state } = useAuth();
  const { isAuthenticated } = state;

  const {
    isOpen: isOpenSubscriptionModal,
    closeModal: closeSubscriptionModal,
    openModal: openSubscriptionModal,
  } = useModal();

  const {
    isOpen: isOpenLoginModal,
    closeModal: closeLoginModal,
    openModal: openLoginModal,
  } = useModal();

  const {
    isOpen: isOpenExcelUploaderModal,
    closeModal: closeExcelUploaderModal,
    openModal: openExcelUploaderModal,
  } = useModal();

  const [handleSaveData] = useUnsavedChanges();

  // Initial data fetching on mount
  useEffect(() => {
    fetchAndProcessData(true, setLoading, setKeywords, setUploads, uploads, selectedFiles);
  }, [isAuthenticated]);

  // Re-process data when selected files change
  useEffect(() => {
    fetchAndProcessData(false, setLoading, setKeywords, setUploads, uploads, selectedFiles);
  }, [selectedFiles]);

  // File upload handler
  const handleUpload = () => {
    if (files.length === 0) {
      alert('Please upload at least one file!');
      return;
    }

    masygHandleUpload(files, setLoading, setKeywords, setUploads, uploads, selectedFiles);
  };

  return (
    <div
      className={`${
        uploads.length === 0 ? 'flex min-h-screen flex-col items-center justify-center' : ''
      }`}>
      {loading && <Spinner />}

      {data.length > 0 ? (
        <MasygCombiner
          openSubscriptionModal={openSubscriptionModal}
          data={data}
          handleSaveData={handleSaveData}
        />
      ) : (
        <>
          <MasygModal isOpen={isOpenExcelUploaderModal} closeModal={closeExcelUploaderModal}>
            <ExcelUploader
              closeModal={closeExcelUploaderModal}
              keywords={keywords}
              setData={setData}
            />
          </MasygModal>

          {uploads.length === 0 ? (
            <FileUploader
              openLoginModal={openLoginModal}
              setFiles={setFiles}
              loading={loading}
              handleUpload={handleUpload}
              files={files}
            />
          ) : (
            <MasygModal isOpen={isUploaderOpen} closeModal={closeFileUploader}>
              <FileUploader
                openLoginModal={openLoginModal}
                setFiles={setFiles}
                loading={loading}
                handleUpload={handleUpload}
                files={files}
              />
            </MasygModal>
          )}

          {keywords.length > 0 && isAuthenticated && (
            <DocsDataDisplayer
              setLoading={setLoading}
              setUploads={setUploads}
              openSubscriptionModal={openSubscriptionModal}
              keywords={keywords}
              selectedFiles={selectedFiles}
              uploads={uploads}
              setSelectedFiles={setSelectedFiles}
              openExceUploaderModal={openExcelUploaderModal}
              loading={loading}
            />
          )}

          {keywords.length === 0 && !loading && (
            <div className='mt-6 text-center text-gray-500'>
              <p>No keywords extracted yet. Upload files and click "Extract Keywords".</p>
            </div>
          )}
        </>
      )}

      {!state.isAuthenticated && (
        <MasygModal
          isOpen={isOpenLoginModal}
          closeModal={() => {
            handleSaveData();
            setKeywords([]);
            closeLoginModal();
          }}>
          <AuthenticationForm closeModal={closeLoginModal} />
        </MasygModal>
      )}

      <MasygModal
        isOpen={isOpenSubscriptionModal}
        closeModal={() => {
          handleSaveData();
          closeSubscriptionModal();
        }}>
        <SubscriptionPlans />
      </MasygModal>
    </div>
  );
};

export default MasygDashboard;
