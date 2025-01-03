import { useState } from 'react';

import { useAuth } from '../../../context';
import {  handleLogin, loginWithGoogle } from '../client';
import { Link, useNavigate } from 'react-router-dom';


type LoginFormProps = {
  setVisible: (visible: string) => void;
  closeModal: () => void;
};

const LoginForm = ({ setVisible, closeModal }: LoginFormProps) => {
  const {  dispatch } = useAuth();
  const navigate= useNavigate();
  const [currentUser, setCurrentUser] = useState({email:'', password: ''});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-blue-600 text-2xl font-bold">Masyg PDF Extractor</h1>
      </div>
      <h2 className="text-xl font-bold mb-2 text-gray-900">Welcome back</h2>
      <p className="text-gray-500 text-sm mb-4">
        Convert and edit your documents easily! Don’t have an account?{' '}
        <a href="#" onClick={()=>setVisible('s')} className="text-blue-600 hover:underline">
          Sign up.
        </a>
      </p>
      <form onSubmit={(e)=>handleLogin( e, currentUser.email,
        currentUser.password, dispatch, setIsLoading, rememberMe,closeModal, setErrorMessage)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCurrentUser({
                ...currentUser,
                email: e.target.value,
              })
            }
            type="email"
            id="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Email"
            aria-label="Email"
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
                password: e.target.value,
              })
            }
            type="password"
            id="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Password"
            aria-label="Password"
          />
        </div>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              onChange={(e) => setRememberMe(e.target.checked)}
              aria-label="Remember Me"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <a href="#" onClick={()=>setVisible('r')} className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 ${
            isLoading
              ? 'bg-blue-400 text-gray-200 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Signing in...' : 'Sign in to your account'}
        </button>
      </form>
      <div className="my-4 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
        <p className="text-sm text-gray-500 mx-4">or</p>
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="flex flex-col space-y-2">
        <button
        onClick={()=>loginWithGoogle(navigate, dispatch, closeModal)}
         className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-100">
          <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" className="h-5 w-5 mr-2" />
          Sign in with Google
        </button>
        <button className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-100">
          <img src="https://img.icons8.com/ios-filled/24/000000/mac-os.png" alt="Apple" className="h-5 w-5 mr-2" />
          Sign in with Apple
        </button>
        <small>
            By signing or signup to Masyg Extractor, you agree to the<Link style={{textDecoration:'underline'}} to={'/terms-of-use'}> Terms of Use </Link> and <Link style={{textDecoration:'underline'}} to={'/privacy-policy'}> and Privacy Policy </Link>of Masyg Extractor
          </small>
      </div>
    </div>
  );
};

export default LoginForm;
