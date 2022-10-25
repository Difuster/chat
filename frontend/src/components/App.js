import React from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/authContext.jsx';
import Header from './Header';
import MainPage from './chat/MainPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import NotFoundPage from './NotFoundPage';

function App() {
  const PathIfuser = ({ children }) => {
    const { user } = useAuth();

    return user ? children : <Navigate replace to="/login" />;
  };

  const PathIfNotuser = ({ children }) => {
    const { user } = useAuth();

    return !user ? children : <Navigate replace to="/" />;
  };

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <Header />
      <Routes>
        <Route exact path="/" element={<PathIfuser><MainPage /></PathIfuser>} />
        <Route path="/login" element={<PathIfNotuser><LoginPage /></PathIfNotuser>} />
        <Route path="/signup" element={<PathIfNotuser><SignUpPage /></PathIfNotuser>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
