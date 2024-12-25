import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { handleResetPassword } from '../client';

const ResetPassword = () => {
    const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  if(!token)
   return
 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Reset Your Password</h2>
        <form onSubmit={e => handleResetPassword(e, password,confirmPassword, token, setMessage, setIsSuccess, setIsLoading)} className='space-y-4'>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              New Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Enter new password'
              required
            />
          </div>
          <div>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
              Confirm New Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Re-enter new password'
              required
            />
          </div>
          {/* <button
            type='submit'
            className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition'>
            Reset Password
          </button> */}
          <button
                 
                 // className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                 disabled={isLoading}
                 className={`w-full bg-blue-500 font-bold text-white px-4 py-2 rounded-md shadow ${
                   isLoading
                     ? 'bg-blue-400 text-gray-200 cursor-not-allowed'
                     : 'bg-blue-500 text-white hover:bg-blue-600'
                 }`}>
                 {isLoading ? 'Resetting Password...' : 'Reset Password'}
               </button>
        </form>
        {message && (
          <div
            className={`mt-4 text-center text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
