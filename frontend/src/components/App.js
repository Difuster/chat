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
  const PathIfLoggedIn = ({ children }) => {
    const { loggedIn } = useAuth();

    return loggedIn ? children : <Navigate replace to="/login" />;
  };

  const PathIfNotLoggedIn = ({ children }) => {
    const { loggedIn } = useAuth();

    return !loggedIn ? children : <Navigate replace to="/" />;
  };

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <Header />
      <Routes>
        <Route exact path="/" element={<PathIfLoggedIn><MainPage /></PathIfLoggedIn>} />
        <Route path="/login" element={<PathIfNotLoggedIn><LoginPage /></PathIfNotLoggedIn>} />
        <Route path="/signup" element={<PathIfNotLoggedIn><SignUpPage /></PathIfNotLoggedIn>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
