import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Dispatch } from 'react';
import { AuthAction, GeneralResponse, State } from '../../../../type.ts';
import { AxiosResponse } from 'axios';

import { CheckoutSession, PaymentMethod } from '../../../../type.ts';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ,
);

const axiosWithCredentials = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true, // Required for session cookies
});

export const handleDeletePaymentMethod = async (
  paymentMethodId: string,
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>,
  setIsLoading: (isLoading: boolean) => void,
) => {
  try {
    setIsLoading(true);
    const response = await axiosWithCredentials.post('/api/payment/payment-method/delete', {
      paymentMethodId,
    });

    if (response.status === 200) {
      alert('Payment method deleted successfully.');
      setPaymentMethods(prevMethods => prevMethods.filter(method => method.id !== paymentMethodId));
    } else {
      alert(response.data.error || 'Failed to delete payment method.');
    }
  } catch (error: any) {
    // Handle backend error message
    const errorMessage = error.response?.data?.error || 'An unexpected error occurred.';
    console.error('Error deleting payment method:', errorMessage);
    alert(errorMessage);
  } finally {
    setIsLoading(false);
  }
};
export const handleCheckout = async (freeTrial: boolean, loading: boolean, setLoading: (loading: boolean)=>void) => {
  setLoading(true);
  const stripe = await stripePromise; // Ensure Stripe is loaded

  try {
    // Call your backend to create a Stripe Checkout session
    const response = await axiosWithCredentials.post<CheckoutSession>(
      '/api/payment/create-checkout-session',
      { free_trial: freeTrial }, // Pass the free trial flag
    );

    const session = response.data;

    // Redirect to Stripe Checkout
    if (session.url) {
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } else {
      console.error('Failed to get session URL.');
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    alert('An error occurred while creating the checkout session.'+ error);
  }
  finally{
    setLoading(false);
  }
};

export const handleDeleteSubscription = async (
  dispatch: Dispatch<AuthAction>,
  setIsLoading: (loading: boolean) => void,
  state: State,
) => {
  try {
    setIsLoading(true);
    const response = await axiosWithCredentials.post('/api/payment/unsubscribe');
    if (response.status === 200) {
      if (state.user) {
        dispatch({ type: 'UNSUBSCRIBE', payload: state.user });
      } else {
        console.error('Cannot unsubscribe: No user is currently logged in.');
      }
      alert('Subscription canceled successfully.');
    } else {
      alert('Failed to cancel subscription. Please try again later.');
    }
  } catch (error) {
    console.error('Error canceling subscription:', error);
    alert('An error occurred while canceling your subscription.');
  } finally {
    setIsLoading(false);
  }
};

export const reactivateSubscription = async (
  dispatch: Dispatch<AuthAction>,
  setIsLoading: (loading: boolean) => void,
  state: State,
) => {
  try {
    setIsLoading(true);
    const response: AxiosResponse<GeneralResponse> = await axiosWithCredentials.post(
      '/api/payment/subscription/reactivate',
    );
    console.log(response.data);
    if (response.status === 200) {
      if (state.user) {
        dispatch({ type: 'SUBSCRIBE', payload: state.user });
      } else {
        console.error('Cannot unsubscribe: No user is currently logged in.');
      }

      alert(response.data.message);
    } else {
      alert(response.data.error || 'Failed to reactivate subscription.');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'An unexpected error occurred.';
    console.error('Error reactivating subscription:', errorMessage);
    alert(errorMessage);
  } finally {
    setIsLoading(false);
  }
};
export const fetchPaymentMethod = async (
  setPaymentMethods: (paymentMethods: PaymentMethod[]) => void,
) => {
  try {
    const response: AxiosResponse<{ paymentMethods: PaymentMethod[] }> =
      await axiosWithCredentials.get('/api/payment/payment-method');
    if (response.status === 200) {
      console.log(response.data.paymentMethods);
      setPaymentMethods(response.data.paymentMethods);
    } else {
      console.error('Failed to fetch payment method.');
    }
  } catch (error) {
    console.error('Error fetching payment method:', error);
  }
};
