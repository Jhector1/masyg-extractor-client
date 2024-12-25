import { useState, useEffect } from 'react';

const useUnsavedChanges = () => {
  const [isDataSaved, setIsDataSaved] = useState(true);
  // const [showModal, setShowModal] = useState(false);

  const handleInputChange = () => {
    setIsDataSaved(false); // Mark data as unsaved when user types.
  };

  const handleSaveData = () => {
    setIsDataSaved(true); // Simulate saving data.
  };

  // const handleRefreshAttempt = () => {
  //   setShowModal(true); // Show modal when refresh is attempted.
  // };

  //   const confirmRefresh = () => {
  //     setShowModal(false);
  //     window.location.reload(); // Proceed with the refresh.
  //   };

  //   const cancelRefresh = () => {
  //     setShowModal(false); // Cancel refresh and close the modal.
  //   };

  // Simulate browser refresh detection
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (!isDataSaved) {
      event.preventDefault();
      // handleRefreshAttempt();
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDataSaved]);

  return [handleSaveData, handleInputChange];
};
export default useUnsavedChanges;
