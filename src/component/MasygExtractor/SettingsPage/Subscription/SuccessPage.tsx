import { useEffect } from 'react';
import { useAuth } from '../../../../context';
import { User } from '../../../../type.ts';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useLocation } from 'react-router-dom';

const axiosWithCredentials = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true, // Required for session cookies
});

const SubscriptionSuccess = () => {
  const { dispatch, state } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Get query parameters
  const plan = searchParams.get('plan'); // e.g., "react"
  const price = searchParams.get('price');  // e.g., "2"

  // Reusable function to fetch the current user
  const fetchCurrentUser = async () => {
    try {
      const response: AxiosResponse<{ user: User }> = await axiosWithCredentials.get('/api/user/current');

      console.log("User",response.data.user);
      const currentUser: User= response.data.user;
      const storage =
        localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined'
          ? localStorage
          : sessionStorage;

      // Persist user in storage
      storage.setItem('user', JSON.stringify(currentUser));

      // Avoid overwriting state if user is already logged in
      if (!state.isAuthenticated || !state.user) {
        dispatch({ type: 'LOGIN', payload: currentUser });
        console.log('User logged in:', currentUser);
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    // We only depend on dispatch; no need to include state.user
  }, [dispatch]);

  const handleGoToDashboard = async () => {
    try {
      await fetchCurrentUser();
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to redirect to dashboard:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
        <div className="text-green-500 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Success Icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5 6.75A9.982 9.982 0 0112 21a9.982 9.982 0 01-9-5.25M15 5.25A9.982 9.982 0 0121 12a9.982 9.982 0 01-6 5.25M12 3c.667.5 2 1.75 2 3.5S12 9 12 9s-2-1.75-2-3.5S11.333 3 12 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Subscription Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for subscribing! Your plan has been activated, and you can now start using our services.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Your Subscription Plan:</h3>
          <p className="text-gray-600">{plan} - ${price}</p>
          <p className="text-gray-600">Start Date: {new Date().toLocaleDateString()}</p>
        </div>
        <button
          onClick={handleGoToDashboard}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => (window.location.href = '/')}
          className="w-full mt-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition"
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
