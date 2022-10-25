import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getAuthHeader = () => {
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }

    return {};
  };

  const logIn = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
    setUser({ token: data.token, userName: data.username });
  };

  const logOut = () => {
    localStorage.removeItem('userData');
    setUser(null);
  };

  const value = {
    user,
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
