import React from 'react';

type WrapperProps = {
  isOpen: boolean;
  closeModal: () => void;
  handler?: () => void;
  children: React.ReactNode; // Use children for content injection
  disableBackdropClick?: boolean; // Optional prop to disable backdrop click
};

const MasygModal: React.FC<WrapperProps> = ({
  isOpen,
  closeModal,
  children,
  disableBackdropClick = true,
}) => {
  if (!isOpen) return null; // Prevent rendering when not open

  return (
    <div
      data-modal-backdrop="static"
      className="fixed inset-0  flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
      onClick={!disableBackdropClick ? closeModal : undefined}
    >
      <div
        className="relative gap-4 bg-transparent flex-col flex items-center justify-center rounded-lg shadow-lg  max-w-2xl p-6 dark:bg-gray-700"
        onClick={(e) => e.stopPropagation()} // Prevent background click from propagating
      >
        <button
          onClick={closeModal}
          className="bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900 rounded-full text-xl w-12 h-12 flex justify-center items-center dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div>{children}</div>

        {/* Optional Footer */}
        {/* {handler && (
          <div className="flex items-center justify-end mt-4">
            <button
              onClick={handler}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Confirm
            </button>
            <button
              onClick={closeModal}
              className="ml-3 py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default MasygModal;



// import React from 'react';

// type WrapperProps = {
//   isOpen: boolean;
//   closeModal: () => void;
//   handler: () => void;
//   Component: React.ReactNode; // Content to display in the modal
// };

// const MasygModal: React.FC<WrapperProps> = ({
//   isOpen,
//   handler,
//   closeModal,
//   Component,
// }) => {
//   return (
//     <>
//       {/* Toggle Modal Button */}

//       {/* Modal */}
//       {isOpen && (
//         <div
//         data-modal-backdrop="static" tabIndex={-1}
//           className="fixed inset-0 flex bg-gray items-center justify-center bg-gray-900 bg-opacity-50 z-50"
//           aria-hidden="true"
//           role="dialog"
//           onClick={closeModal} // Close modal when clicking outside
//         >
//           {/* <div
//             className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 dark:bg-gray-700"
//             onClick={(e) => e.stopPropagation()} // Prevent click propagation
//           > */}
//             {/* Modal Header */}
//             {/* <div className="flex items-center justify-between p-4 border-b dark:border-gray-600"> */}
//               {/* <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Masyg Extractor
//               </h3> */}
            
//             {/* </div> */}

//             {/* Modal Body */}
//             <div className="p-4 relative bg-transparent">
//             <button
//                 onClick={closeModal}
//                 className="text-gray-400 bg-opacity-20 bg-trasparent absolute top-10 right-10 hover:bg-gray-200 hover:text-gray-900 rounded-xl text-xl w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                 aria-label="Close"
//               >
//                 &times;
//               </button>
//               {Component}</div>

//             {/* Modal Footer */}
//             {/* <div className="flex items-center p-4 border-t border-gray-200 dark:border-gray-600">
//               <button
//                 onClick={() => {
//                   handler();
//                   closeModal();
//                 }}
//                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 Combine
//               </button>
//               <button
//                 onClick={closeModal}
//                 className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//             </div> */}
//           </div>
//         // </div>
//       )}
//     </>
//   );
// };

// export default MasygModal;
