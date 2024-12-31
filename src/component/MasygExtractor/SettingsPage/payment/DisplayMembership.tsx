import handleManageBilling from '@/component/authenticationForm/client.ts';
import { useAuth } from '../../../../context';
import { PaymentMethod } from '../../../../type.ts';
import { reactivateSubscription } from './client.ts';
interface PaymentMethodProps {
    paymentMethods: PaymentMethod[];
    isSubscribed: boolean;
    toggleOn: () => void;
    isLoading: boolean;
    openModal: () => void;
    setIsLoading: (isLaoding: boolean)=>void
  };

export function DisplayMembership({paymentMethods, isSubscribed, toggleOn, setIsLoading,isLoading, openModal}: PaymentMethodProps) {
const {dispatch, state}= useAuth();
  return (
    <section id='membership' className='mb-8'>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-bold'>Membership</h2>
        {isSubscribed ? (
          // Show if user is subscribed
          <>
            <p className='text-gray-500'>You are currently subscribed.</p>
            <div className='mt-4 flex items-center justify-between'>
              <div>
                <h3 className='font-bold'>Enjoy full access to PDF tools!</h3>
                <p className='text-gray-500'>
                  Advanced editing features are available for your account.
                </p>
              </div>
              <button
                onClick={toggleOn}
                disabled={isLoading}
                className={`bg-red-500 text-white px-4 py-2 rounded-md shadow ${
                  isLoading
                    ? 'bg-red-400 text-gray-200 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}>
                {isLoading ? 'Cancelling Subscription...' : ' Cancel Subscription'}
              </button>
            </div>
          </>
        ) : (
          // Show if user is not subscribed
          <>
            <p className='text-gray-500'>You do not have a subscription.</p>
            <div className='mt-4 flex items-center justify-between'>
              <div>
                <h3 className='font-bold'>Unlock all PDF tools!</h3>
                <p className='text-gray-500'>Get full access to advanced editing features.</p>
              </div>
              {paymentMethods && paymentMethods.length > 0 ? (
                <button
                  onClick={() => reactivateSubscription(dispatch, setIsLoading, state)}
                  // className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                  disabled={isLoading}
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow ${
                    isLoading
                      ? 'bg-blue-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}>
                  {isLoading ? 'Reactivating Subscription...' : '    Reactivate Subscription'}
                </button>
              ) : (
                <button
                  onClick={openModal}
                  className='bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600'>
                  Subscribe Now
                </button>
              )}
            </div>
          </>
        )}
      </div>
     
    </section>
  );
}
