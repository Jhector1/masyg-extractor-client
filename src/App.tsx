import { useEffect, useState } from 'react';

import { useAuth } from './context';
import { AxiosResponse } from 'axios';
import { User } from './type';
import axios from 'axios';
import MasygExtractor from './component/MasygExtractor';
import Spinner from './tool/Spinner';

const axiosWithCredentials = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true, // Required for session cookies
});
function App() {
  const [loading, setLoading] = useState(true);
  const { dispatch} = useAuth();

  const fetchCurrentUser = async () => {
    try {
      const response: AxiosResponse<{ user: User }> =
        await axiosWithCredentials.get('/api/user/current');

      console.log('User', response.data.user);
      const currentUser: User = response.data.user;
      const storage =
      localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined'
        ? localStorage
        : sessionStorage;
      if(currentUser){
    

      // Persist user in storage
    

      // Avoid overwriting state if user is already logged in
      if (storage.getItem('user')|| storage.getItem('user')!=='undefined'  ) {
        dispatch({ type: 'LOGIN', payload: currentUser });
        storage.setItem('user', JSON.stringify(currentUser));
        console.log('User logged in:', currentUser);
      } }
      else {
        storage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        await axiosWithCredentials.get('/api/user/logout');
      }
    
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    // const loginUser = (storedData: string | null) => {
    //   try {
    //     if (storedData) {
    //       const user = JSON.parse(storedData);
    //       if (user) {
    //         dispatch({ type: 'LOGIN', payload: user });
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error parsing user data:', error);
    //   }
    // };

    // const storedUser = localStorage.getItem('user');
    // const sessionUser = sessionStorage.getItem('user');

    // console.log('Stored User:', storedUser);
    // console.log('Session User:', sessionUser);

    // if (storedUser && storedUser !== "undefined") {
    //   loginUser(storedUser);
    // } else if (sessionUser && sessionUser !== "undefined") {
    //   loginUser(sessionUser);
    // }
  }, [dispatch]);
  if (loading) {
    return (
      // <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      //   <p>Loading...</p>
      // </div>
      <Spinner/>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
    {/* <QuickActions/> */}
      <MasygExtractor />
    </div>
  );
}

export default App;
