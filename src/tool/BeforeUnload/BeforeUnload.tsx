import  { useEffect, useState } from 'react';
import React from 'react';
const BeforeUnload = () => {
  const [isDataSaved, setIsDataSaved] = useState(true);


  const handleInputChange = () => {
    setIsDataSaved(false); // Mark data as unsaved when user types.
  };

  const handleSaveData = () => {
    setIsDataSaved(true); // Simulate saving data.
  };

 
  // Simulate browser refresh detection
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (!isDataSaved) {
      event.preventDefault();

    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDataSaved]);

  return (
    <div>
      <h1>React Custom Refresh Confirmation</h1>
      <textarea
        onChange={handleInputChange}
        placeholder="Type something..."
      ></textarea>
      <br />
      <button onClick={handleSaveData}>Save Data</button>
      <p>{isDataSaved ? 'All changes saved!' : 'You have unsaved changes.'}</p>
      {/* 
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Unsaved Changes</h2>
            <p>Are you sure you want to refresh? Your unsaved changes will be lost.</p>
            <button onClick={confirmRefresh}>Yes, Refresh</button>
            <button onClick={cancelRefresh}>No, Stay</button>
          </div>
        </div>
      )} */}

      <style>
        {`
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
          }
          button {
            margin: 5px;
            padding: 10px 20px;
          }
        `}
      </style>
    </div>
  );
};
export default BeforeUnload;
