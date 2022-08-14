import React from 'react';
import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/login">Войти</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
