import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userId'));

  const getAuthHeader = () => {
    const userId = JSON.parse(loggedIn);

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn(localStorage.getItem('userId'));
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(localStorage.getItem('userId'));
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

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuth };
