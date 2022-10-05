import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PageNotFound() {
  const { t } = useTranslation('translation', { keyPrefix: 'notFoundPage' });

  return (
    <>
      <h1>{t('page not found')}</h1>
      <p>
        {t('link to')}
        <Link to="/">{t('main page')}</Link>
      </p>
    </>
  );
}

export default PageNotFound;
