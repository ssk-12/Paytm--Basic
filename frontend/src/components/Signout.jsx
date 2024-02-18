import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to clear user's token from localStorage
    const clearAuthToken = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    };

    const signOutUser = () => {
      clearAuthToken();
      // Redirect user to sign-in page
      navigate('/signin');
    };

    signOutUser();
  }, [navigate]);

  return
};

export default Signout;
