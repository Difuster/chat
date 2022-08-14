import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <>
      <h1>Страница не найдена</h1>
      <p>Перейти на <Link to="/">Главную страницу</Link></p>
    </>
  );
}

export default PageNotFound;
