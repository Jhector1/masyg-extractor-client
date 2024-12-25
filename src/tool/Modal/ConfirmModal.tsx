import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
interface ConfimDeleteProps  {
    setIsModalOpen: (isOpen: Boolean)=>void;
    isModalOpen: boolean;
    handler: ()=>void;

}
const ConfirmDeleteSubscriptionModal = ({setIsModalOpen, isModalOpen, handler}: ConfimDeleteProps) => {
  // State to handle modal visibility
//   const [isModalOpen, setIsModalOpen] = useState(true);

  // Functions to open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to handle subscription deletion confirmation
  const confirmDelete = () => {
    // Logic for deleting subscription goes here
    closeModal();
    handler();
   
  };

  return (
    <div className="flex justify-center m-5">
      {/* Button to trigger the modal */}
      {/* <button
        onClick={openModal}
        className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        type="button"
      >
        Show delete confirmation
      </button> */}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            {/* Modal content */}
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button
                onClick={closeModal}
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">Close modal</span>
              </button>
              <TrashIcon
                className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
              />
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                Are you sure you want to delete your subscription?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={closeModal}
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  onClick={confirmDelete}
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Yes, delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmDeleteSubscriptionModal;
