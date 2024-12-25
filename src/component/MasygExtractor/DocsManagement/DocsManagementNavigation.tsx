import {
  DocumentTextIcon,
  ClockIcon,
  ClipboardDocumentIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import MasygLogo from '../../logo/MasygLogo';
import { HomeIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
interface MainSidebarProps {
  openModal: () => void;
}
const DocsManagementNavigation = ({ openModal }: MainSidebarProps) => {
  return (
    <div className='border-t border-gray-200 flex sticky justify-center top-0 flex-col h-screen w-128 bg-white shadow-md'>
      {/* Logo */}
      <div className='flex items-center justify-center py-6'>
        <div className='text-red-500 text-2xl font-bold'>Masyg Extractor</div>
      </div>

      <div className='flex items-center justify-center py-6'>
        <MasygLogo color='gray' size={100} />
      </div>

      {/* Add New Button */}
      <button
        className='mx-4 mb-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600'
        onClick={openModal}>
        Upload new files
      </button>

      {/* Navigation Links */}
      <nav className='flex flex-col space-y-4 px-4'>
      <Link to="/"
          className='flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-red-100 p-2 rounded-md'>
          {/* <ClockIcon className='h-6 w-6 text-gray-500' /> */}
          <HomeIcon className='h-6 w-6 text-gray-500' />

          <span>Home</span>
        </Link>
        <a
          href='#'
          className='flex cursor-not-allowed items-center space-x-2 text-gray-300 p-2 rounded-md'>
          {/* <DocumentTextIcon className='h-6 w-6 text-gray-500' /> */}
          <LockClosedIcon className='h-6 w-6 text-gray-300' />

          
          <span>All documents</span>
        </a>
        <a
          href='#'
          className='flex items-center  cursor-not-allowed space-x-2 text-gray-300  p-2 rounded-md'>
          {/* <ClockIcon className='h-6 w-6 text-gray-500' /> */}
          <LockClosedIcon className='h-6 w-6 text-gray-300' />

          <span>Recents</span>
        </a>
        <a
          href='#'
          className='flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-red-100 p-2 rounded-md'>
          {/* <ClipboardDocumentIcon className='h-6 w-6 text-gray-500' />
          <span>Forms</span> */}
        </a>
      </nav>

      {/* Chat Support */}
      <div className='mt-auto px-4 py-6'>
        <div className='bg-orange-100 text-orange-700 p-4 rounded-md flex items-center space-x-2'>
          <ChatBubbleLeftEllipsisIcon className='h-6 w-6 text-orange-500' />
          <div>
            <p className='font-bold'>Chat with Support</p>
            <p className='text-sm text-green-600'>Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsManagementNavigation;
