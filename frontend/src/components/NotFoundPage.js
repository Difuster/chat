import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundImg from '../imgs/404_img.png';

function PageNotFound() {
  const { t } = useTranslation('translation', { keyPrefix: 'notFoundPage' });

  return (
    <Row className="row justify-content-center align-content-center h-100">
      <Col>
        <div className="text-center align-content-center">
          <img src={notFoundImg} alt="error 404" />
          <h2>{t('page not found')}</h2>
          <p className="text-muted">
            {t('link to')}
            {' '}
            <Link to="/">{t('main page')}</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default PageNotFound;
