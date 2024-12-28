import { useEffect, useState } from 'react';
import { useAuth } from '../../../context';

import MasygModal from '../../../tool/Modal';
import SubscriptionPlans from './payment/Subscription/index.tsx';
import { useModal } from '../../../hooks/useModal.ts';
// import DeleteModal from '../../tool/Modal/ConfirmModal';
import ConfirmDeleteSubscriptionModal from '../../../tool/Modal/ConfirmModal.tsx';
import { useToggle } from '../../../hooks/useToggle.ts';
import Spinner from '../../../tool/Spinner';
import ToastSuccess from '../../../tool/toast';
import {
  fetchPaymentMethod,
  handleDeleteSubscription,
} from './payment/client.ts';
import { PaymentNavBar } from './navbar.tsx';
import { AccountManagement } from './AccountManagement.tsx';
import { DisplayPaymentMethod } from './payment/DisplayPaymentMethod.tsx';
import { PaymentMethod } from '../../../type.ts';
import { DisplayMembership } from './payment/DisplayMembership.tsx';
import { Footer } from '../../footer/Footer.tsx';

const SettingsPage = () => {
  const { isOpen, closeModal, openModal } = useModal();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]); // State to store payment method details

  const { dispatch, state } = useAuth();
  const { isToggled, toggleOn, toggleOff } = useToggle();
  const [isLoading, setIsLoading] = useState(false);
  // const [loading, setLoading] = useState<boolean>(false);

  const [showToast, setShowToast] = useState(false);

  const handleClose = () => {
    setShowToast(false);
  };

  const isSubscribed = state.user? state.user?.isSubscribed : false; // Check subscription status

  useEffect(() => {
    fetchPaymentMethod(setPaymentMethods);
  }, [dispatch]);

  return (
    <div className='min-h-screen bg-gray-100'>
      {isLoading && <Spinner />}
      {showToast && (
        <ToastSuccess message='User info updated successfully.' onClose={handleClose} />
      )}

      <ConfirmDeleteSubscriptionModal
        isModalOpen={isToggled}
        setIsModalOpen={toggleOff}
        handler={() => handleDeleteSubscription(dispatch, setIsLoading, state)}
      />

      <MasygModal
        // handler={() => {}}
        isOpen={isOpen}
        closeModal={() => {
          closeModal();
          // location.reload();
        }}>
        {' '}
        <SubscriptionPlans />
      </MasygModal>
      {/* Sidebar */}
      <div className='ml-[10rem] max-w-[70rem] flex w-md'>
        <PaymentNavBar setIsLoading={setIsLoading} isLoading={isLoading} />

        {/* Content Area */}
        <div className='flex-1 p-6'>
          {/* Account Section */}
          <AccountManagement
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setShowToast={setShowToast}
          />
          {/* Payment Section */}
          {/* <section id='payment' className='mb-8'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h2 className='text-xl font-bold'>Payment Method</h2>
              <p className='text-gray-500'>Save time by keeping a current credit card on file.</p>

              <PaymentSection />
            </div>
          </section> */}

          <DisplayPaymentMethod
            paymentMethods={paymentMethods}
            setPaymentMethods={setPaymentMethods}
            setIsloading={setIsLoading}
          />

          {/* Membership Section */}
    
          <DisplayMembership
            paymentMethods={paymentMethods}
            
            isSubscribed={isSubscribed}
            toggleOn={toggleOn}
            isLoading={isLoading}
            openModal={openModal}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default SettingsPage;
