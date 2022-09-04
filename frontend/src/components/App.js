import React, { useState } from 'react';
import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import MainPage from './chat/MainPage';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import AuthContext from '../contexts/index.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
        <header>
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <Link to="/" className="navbar-brand">
                Hexlet Chat
              </Link>
            </div>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
