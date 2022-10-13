import React, { useState, createContext } from 'react';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const value = {
    loggedIn,
    logIn,
    logOut,
    getAuthHeader,
  };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
