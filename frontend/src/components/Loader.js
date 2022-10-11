import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation('translation', { keyPrefix: 'loader' });

  return (
    <div className="d-flex justify-content-center">
      <MDBSpinner role="status" color="primary" style={{ width: '70px', height: '70px' }}>
        <span className="visually-hidden">{t('loading')}</span>
      </MDBSpinner>
    </div>
  );
}
