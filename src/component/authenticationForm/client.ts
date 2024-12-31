import axios, { AxiosResponse } from 'axios';
import { AuthAction, GeneralResponse, State, User, UserUpdateInfo } from '../../type';
import { Dispatch } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase-config';
// Axios instance
const axiosWithCredentials = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/user`,
  withCredentials: true, // Required for session cookies
});

// Response types
export interface ErrorResponse {
  error: string;
}

export interface SignupResponse {
  message: string;
  user_id: string;
}

export type LoginResponse = { message: string; user: User };

export interface LogoutResponse {
  message: string;
}

// Handle Signup
export const handleSignup = async (user: User): Promise<AxiosResponse<SignupResponse>> => {
  try {
    const response = await axiosWithCredentials.post<SignupResponse>('/signup', user);
    console.log('Signup successful:', response.data);
    return response; // Return successful response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Signup Axios error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Signup failed. Please try again.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred during signup.');
    }
  }
};

// Handle Login
export const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  dispatch: Dispatch<AuthAction>,
  setIsLoading: (loading: boolean) => void,
  rememberMe: boolean,
  closeModal: () => void,
  setErrorMessage: (error: string) => void,
) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const response = await axiosWithCredentials.post<LoginResponse>('/login', { email, password });
    if (response.status === 200) {
      closeModal();

      // Store user information based on "Remember Me" selection
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(response.data?.user));

      dispatch({ type: 'LOGIN', payload: response.data?.user });
    } else {
      setErrorMessage(response.data?.message || 'Invalid email or password');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Login Axios error:', error.response || error.message);
      setErrorMessage('Login error: ' + error.response?.data.message || error.message);
      return error.response!;
    } else {
      console.error('Unexpected error:', error);
      setErrorMessage('Unexpected error: ' + error);
      throw new Error('An unexpected error occurred.');
    }
  } finally {
    setIsLoading(false);
  }
};

// Handle Logout
export const handleLogout = async (
  dispatch: Dispatch<AuthAction>,
  setIsLoading: (loading: boolean) => void,
) => {
  try {
    setIsLoading(true);
    const response = await axiosWithCredentials.post<LogoutResponse>('/logout');

    if (response.status === 200) {
      // Clear user data from local storage
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');

      // Dispatch a logout action
      dispatch({ type: 'LOGOUT' });

      //alert('You have been logged out successfully.');
    } else {
      alert('Error logging out');
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Logout Axios error:', error.response || error.message);
      return error.response!;
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  } finally {
    setIsLoading(false);
  }
};
// const logout = async () => {
//   try {
//     setIsLoading(true);
//     const result = await handleLogout();

//     if (result.status === 200) {
//       // Clear user data from local storage
//       localStorage.removeItem('user');
//       sessionStorage.removeItem('user');

//       // Dispatch a logout action
//       dispatch({ type: 'LOGOUT' });

//       alert('You have been logged out successfully.');
//     } else {
//       alert((result as ErrorResponse).error || 'Error logging out');
//     }
//   } catch (error) {
//     console.error('Logout error:', error);
//     alert('An error occurred while logging out. Please try again.');
//   } finally {
//     setIsLoading(false);
//   }
// };
export type MyForm = {
  form1: string | null;
  form2: string | null;
};
export const handleUpdateUser = async (
  e: React.FormEvent,
  setErrors: React.Dispatch<React.SetStateAction<MyForm>>,
  formId: string,
  formData: Partial<UserUpdateInfo>,
  state: State,
  setIsLoading: (isLoading: boolean) => void,
  setShowToast: (showToast: boolean) => void,
) => {
  e.preventDefault();

  if (formId === 'form2' && formData.password !== formData.confirm_password) {
    setErrors(prev => ({ ...prev, form2: 'New password and confirmation do not match.' }));
    return;
  }

  setIsLoading(true);

  try {
    const payload: Partial<UserUpdateInfo> = {
      email: formData.email || state.user?.email,
      username: formData.username || state.user?.username,
      old_password: formData.old_password,
    };

    if (formId === 'form2') {
      payload.password = formData.password;
    }

    const response = await axiosWithCredentials.post('/update', payload);

    if (response.status === 200) {
      setErrors(prev => ({ ...prev, [formId]: null }));

      setShowToast(true);
    } else {
      setErrors(prev => ({ ...prev, [formId]: response.data.error || 'Update failed.' }));
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      setErrors(prev => ({
        ...prev,
        [formId]: error.response?.data?.error || 'Unexpected error.',
      }));
    } else {
      setErrors(prev => ({ ...prev, [formId]: 'An unknown error occurred.' }));
    }
  } finally {
    setIsLoading(false);
  }
};

export const handleRequestReset = async (
  e: React.FormEvent,
  email: string,
  setMessage: (message: string) => void,
  setIsSuccess: (success: boolean) => void,
  setIsLoading: (loading: boolean) => void,
) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const response = await axiosWithCredentials.post('/request-reset', { email });
    setMessage(response.data.message);
    setIsSuccess(true);
  } catch (error: any) {
    setMessage(error.response?.data.error || 'Error sending reset email.');
    setIsSuccess(false);
  } finally {
    setIsLoading(false);
  }
};
export const handleResetPassword = async (
  e: React.FormEvent,
  password: string,
  confirmPassword: string,
  token: string,

  setMessage: (message: string) => void,
  setIsSuccess: (success: boolean) => void,
  setIsLoading: (loading: boolean) => void,
) => {
  e.preventDefault();
  setIsLoading(true);

  if (password !== confirmPassword) {
    setMessage('Passwords do not match.');
    setIsSuccess(false);
    return;
  }

  try {
    if (!token) {
      throw new Error('Token is required but was not provided.');
    }
    const response: AxiosResponse<GeneralResponse> = await axiosWithCredentials.post(
      '/reset-password',
      {
        token: token as string,
        password,
      },
    );
    setMessage(response.data.message ?? 'Password reset successfully.');
    setIsSuccess(true);
  } catch (error: any) {
    setMessage(error.response?.data?.error ?? 'Error resetting password.');
    setIsSuccess(false);
  } finally {
    setIsLoading(false);
  }
};

export const loginWithGoogle = async (
  navigate: any,
  dispatch: Dispatch<AuthAction>,
  closeModal: () => void,
) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    //console.log(idToken);

    const response = await axiosWithCredentials.post('/login', { googleIdToken: idToken });

    // Dispatch login action
    dispatch({ type: 'LOGIN', payload: response.data?.user });

    // Persist to localStorage
    localStorage.setItem('user', JSON.stringify(response.data?.user));

    // Redirect user
    navigate('/');

    // Log user info
    console.log('Google Login Response:', response.data);
    console.log('User Info:', result.user.toJSON());

    alert(`Welcome, ${result.user.displayName}`);
    closeModal();
  } catch (error: any) {
    console.error('Error during sign-in:', error);
    const message = error.response?.data?.message || 'Failed to log in. Please try again.';
    alert(message);
  }
};

const handleManageBilling = async (setLoading: (load: boolean) => void) => {
  try {
    setLoading(true);
    // Send a POST request to the Flask backend using Axios
    const response = await axiosWithCredentials.post(
      '/create-customer-portal',
      {}, // Pass the body here if needed; {} is empty for this example
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies for session validation
      },
    );

    if (response.status === 200) {
      // Redirect to the Stripe Customer Portal
      window.location.href = response.data.url;
    } else {
      // Handle errors
      alert(response.data.error || 'An error occurred');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An unexpected error occurred.');
  } finally {
    setLoading(false);
  }
};

export default handleManageBilling;

// const logout = async () => {
//   try {
//     await signOut(auth);
//     alert("Logged out successfully!");
//   } catch (error) {
//     console.error("Error during logout:", error);
//     alert("Failed to log out. Please try again.");
//   }
// };

// export {  logout };
