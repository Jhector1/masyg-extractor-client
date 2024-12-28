import React, { useState } from 'react';
import { User } from '../../../type';
import { handleSignup } from '../client';
import { Link } from 'react-router-dom';

type SignupFormProps = {
  setVisible: (visible: string) => void;
};

const SignupForm = ({ setVisible }: SignupFormProps) => {
  const [currentUser, setCurrentUser] = useState<User>({ username: '', password: '', email: '', isSubscribed: false , hasUsedTrial: false});
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
  
    // Validate required fields
    if (!currentUser.username || !currentUser.email || !currentUser.password) {
      setErrorMessage('All fields are required.');
      return;
    }
  
    // Validate password match
    if (currentUser.password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
  
    try {
      setIsLoading(true);
      const response = await handleSignup(currentUser);
      if (response.status === 201) {
        alert('User created successfully!');
        setVisible('l'); // Reset form or close modal
      } else {
        // If the backend returns an error with 2xx, it won't hit the catch block
        setErrorMessage(response.data?.message || 'Signup failed. Please try again.');
      }
    } catch (error: unknown) {
      // Handle error message from handleSignup
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
    finally{
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-blue-600 text-2xl font-bold">Masyg PDF Extractor</h1>
      </div>
      <h2 className="text-xl font-bold mb-2 text-gray-900">Create your account</h2>
      <p className="text-gray-500 text-sm mb-4">
        Join us today and start building amazing projects. Already have an account?{' '}
        <button onClick={()=>setVisible('l')} className="text-blue-600 hover:underline">
          Sign in.
        </button>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="John Doe"
            onChange={(e) =>
              setCurrentUser({
                ...currentUser,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="email@example.com"
            onChange={(e) =>
              setCurrentUser({
                ...currentUser,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            onChange={(e) =>
              setCurrentUser({
                ...currentUser,
                [e.target.name]: e.target.value,
              })
            }
            name="password"
            type="password"
            id="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="********"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            name="confirm-password"
            type="password"
            id="confirm-password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="********"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        {/* <button
          disabled={
            !currentUser.username || !currentUser.email || !currentUser.password || currentUser.password !== confirmPassword
          }
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Sign up
        </button> */}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 ${
            isLoading
              ? 'bg-blue-400 text-gray-200 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>


      </form>
      <div className="my-4 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
        <p className="text-sm text-gray-500 mx-4">or</p>
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="flex flex-col space-y-2">
        <button className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-100">
          <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" className="h-5 w-5 mr-2" />
          Sign up with Google
        </button>
        <button className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-100">
          <img src="https://img.icons8.com/ios-filled/24/000000/mac-os.png" alt="Apple" className="h-5 w-5 mr-2" />
          Sign up with Apple
        </button>
        <small>
            By signing or signup to Masyg Extractor, you agree to the<Link style={{textDecoration:'underline'}} to={'/terms-of-use'}> Terms of Use </Link> and <Link style={{textDecoration:'underline'}} to={'/privacy-policy'}> and Privacy Policy </Link>of Masyg Extractor
          </small>
      </div>
    </div>
  );
};

export default SignupForm;
