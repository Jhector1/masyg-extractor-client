import React from "react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

type ToastProps = {
  message: string;
  onClose: () => void;
};

const ToastSuccess: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div
      id="toast-success"
      className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      {/* Success Icon */}
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <CheckCircleIcon className="w-5 h-5" />
        <span className="sr-only">Success</span>
      </div>

      {/* Message */}
      <div className="ms-3 text-sm font-normal">{message}</div>

      {/* Close Button */}
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
        onClick={onClose}
      >
        <XMarkIcon className="w-4 h-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
};

export default ToastSuccess;
