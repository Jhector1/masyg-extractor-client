import {
  HomeIcon,
  QuestionMarkCircleIcon,
  CogIcon,
} from "@heroicons/react/20/solid";
import { Link, Outlet } from "react-router-dom";
import MasygModal from "../../tool/Modal";
import AuthenticationForm from "../authenticationForm";
import { useAuth } from "../../context";
import { useModal } from "../../hooks/useModal.ts";
import { useMenu } from "@/context/MenuContext.tsx";

const MasygNavigation = () => {
  const { state } = useAuth();
  const { isOpen, closeModal, openModal } = useModal();
  const { isMenuOpen, toggleMenu } = useMenu();

  const handleHelpClick = () => {
    alert(
      "Self help is currently not available. Please contact us at support@masyglink.com"
    );
  };

 

  return (
    <nav className="bg-white border-b w-full border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Modal for Authentication */}
        <MasygModal handler={() => {}} isOpen={isOpen} closeModal={closeModal}>
          <AuthenticationForm closeModal={closeModal} />
        </MasygModal>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Masyg PDF Extractor
          </span>
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navbar Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse">
            {!state.isAuthenticated ? (
              <li>
                <h3
                  className="h-6 w-6 font-bold cursor-pointer hover:text-red-600 mr-20"
                  onClick={openModal}
                >
                  Login
                </h3>
              </li>
            ) : (
              <li>
                <h3 className="h-6 italic text-gray-500 font-bold cursor-pointer hover:text-red-600 mr-20">
                  {state.user?.username}
                </h3>
              </li>
            )}
            <li>
              <Link to="/" title="Home">
                <HomeIcon className="h-6 w-6 cursor-pointer hover:text-red-600" />
              </Link>
            </li>
            <li>
              <span
                onClick={handleHelpClick}
                title="Help"
                className="h-6 w-6 flex items-center cursor-pointer hover:text-red-600"
              >
                <QuestionMarkCircleIcon className="h-6 w-6" />
              </span>
            </li>
            {state.isAuthenticated && (
              <li>
                <Link to="/settings" title="Settings">
                  <CogIcon className="h-6 w-6 cursor-pointer hover:text-red-600" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Render Nested Routes */}
      <Outlet />
    </nav>
  );
};

export default MasygNavigation;
