import React from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import MainPage from './chat/MainPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import NotFoundPage from './NotFoundPage';
import useAuth from '../hooks/authHook.jsx';
import { AuthContextProvider } from '../contexts/authContext.jsx';
import { SocketContextProvider } from '../contexts/socketContext.jsx';
import ToastContext from '../contexts/toastContext.jsx';

function App() {
  const socket = io();
  const notify = (text) => toast.success(text, { position: toast.POSITION.TOP_RIGHT });

  const Path = ({ children }) => {
    const { loggedIn } = useAuth();

    return loggedIn ? children : <Navigate replace to="/login" />;
  };

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <AuthContextProvider>
        <ToastContext.Provider value={{ notify }}>
          <SocketContextProvider socket={socket}>
            <Header />
            <Routes>
              <Route exact path="/" element={<Path><MainPage /></Path>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </SocketContextProvider>
          <ToastContainer autoClose={3000} />
        </ToastContext.Provider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
