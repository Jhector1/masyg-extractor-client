import React, { useState } from 'react';
import axios from 'axios';
import { handleRequestReset } from '../client';

type RequestResetPasswordProps = {
    setVisible: (visible: string) => void;

  };
const RequestResetPassword = ({setVisible}: RequestResetPasswordProps) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [isLoading, seIsLoading] = useState(false);
  

  return (
    <div className="flex items-center justify-center bg-gray-100 top-20">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Request Password Reset
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter your email address below, and we'll send you a link to reset your password.
        </p>
        <form onSubmit={(e)=>handleRequestReset(e, email, setMessage, setIsSuccess, seIsLoading)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          {/* <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Send Reset Link
          </button> */}
          <button
                 
                  // className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                  disabled={isLoading}
                  className={`w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow ${
                    isLoading
                      ? 'bg-blue-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}>
                  {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
                </button>
        </form>
        {message && (
          <div
            className={`mt-4 text-center text-sm ${
              isSuccess ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </div>
        )}

<a href="#" onClick={()=>setVisible('l')} className="pt-8 text-blue-600 hover:underline">
          Go back to login.
        </a>
      </div>
    
    </div>
  );
};

export default RequestResetPassword;
