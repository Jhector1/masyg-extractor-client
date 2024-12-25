import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
      <p className="text-lg text-gray-700 mt-4">
        Sorry, an unexpected error has occurred.
      </p>
      {error?.status && (
        <p className="text-sm text-gray-600 mt-2">
          <strong>Error {error.status}:</strong> {error.statusText || error.message}
        </p>
      )}
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
