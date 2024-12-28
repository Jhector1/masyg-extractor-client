import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid';
import { useAuth } from '../../../context/index.tsx';
import { handleLogout } from '../../authenticationForm/client.ts';
import MasygLogo from '../../logo/MasygLogo.tsx';

interface PaymentNavBarProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export function PaymentNavBar({ isLoading, setIsLoading }: PaymentNavBarProps) {
  const { dispatch } = useAuth();
  return (
    <aside className='w-64 h-[100vh] hidden md:flex flex-col sticky top-0 bg-white shadow-md p-4'>
      <h1 className='text-xl font-bold text-red-600 mb-8'>Masyg PDF Extractor</h1>
      <div className='flex items-center justify-center py-6'>
        <MasygLogo color='gray' size={100} />
      </div>

      <nav className='space-y-4'>
        <a href='#account' className='flex items-center p-2 bg-red-50 text-red-600 rounded-md'>
          <span className='mr-2'>👤</span> Account
        </a>
        <a href='#payment' className='flex items-center p-2 hover:bg-gray-200 rounded-md'>
          <span className='mr-2'>💳</span> Payment
        </a>
        <a href='#membership' className='flex items-center p-2 hover:bg-gray-200 rounded-md'>
          <span className='mr-2'>🏅</span> Membership
        </a>
      </nav>
      <button
        onClick={() => handleLogout(dispatch, setIsLoading)} // className='mt-8 p-2 bg-red-100 text-red-600 rounded-md w-full'
        disabled={isLoading}
        className={`mt-8 p-2 rounded-md w-full ${
          isLoading
            ? 'bg-red-50 text-red-500 cursor-not-allowed'
            : 'bg-red-100 text-red-600 hover:bg-red-200'
        }`}>
        {isLoading ? 'Loging out...' : '   Log out'}
      </button>
      {/* Chat Support */}
      <div className='mt-auto px-4 py-6'>
        <div className='bg-orange-100 text-orange-700 p-4  rounded-md flex items-center space-x-2'>
          <ChatBubbleLeftEllipsisIcon className='h-6 w-6 text-orange-500' />
          <div>
            <p className='font-bold'>Chat with Support</p>
            <p className='text-sm text-green-600'>Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
