import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import MainPage from './chat/MainPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import NotFoundPage from './NotFoundPage';
import AuthContext from '../contexts/index.jsx';
import ToastContext from '../contexts/toastContext.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const notify = (text) => {
    return toast.success(text, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
        <ToastContext.Provider value={{ notify }}>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <ToastContainer autoClose={3000} />
        </ToastContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
