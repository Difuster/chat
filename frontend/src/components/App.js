import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { io } from 'socket.io-client';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import MainPage from './chat/MainPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import NotFoundPage from './NotFoundPage';
import AuthContext from '../contexts/authContext.jsx';
import SocketContext from '../contexts/socketContext.jsx';
import ToastContext from '../contexts/toastContext.jsx';

function App() {
  const socket = io();
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    socket.close();
  };

  const sendMessage = (message) => {
    socket.emit('newMessage', message);
  };

  const getNewChannel = (channel) => {
    socket.emit('newChannel', { channel });
  };

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id });
  };

  const renameChannel = (id, name) => {
    socket.emit('renameChannel', { id, name });
  };

  const notify = (text) => toast.success(text, { position: toast.POSITION.TOP_RIGHT });

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
        <ToastContext.Provider value={{ notify }}>
          <SocketContext.Provider value={
            {
              socket,
              sendMessage,
              getNewChannel,
              removeChannel,
              renameChannel,
            }
            }
          >
            <Header />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </SocketContext.Provider>
          <ToastContainer autoClose={3000} />
        </ToastContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
