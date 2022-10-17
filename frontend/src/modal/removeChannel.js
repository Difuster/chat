import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useApi } from '../contexts/apiContext.jsx';

const RemoveChannelModal = ({ items, handleCloseModal }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'modals.removeChannel' });
  const { removeChannel, notify } = useApi();

  return (
    <>
      <Modal.Header closeButton onHide={handleCloseModal}>
        <Modal.Title>{t('remove channel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('sure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            type="button"
            variant="secondary"
            onClick={() => handleCloseModal()}
          >
            {t('cancel')}
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              removeChannel(items.id);
              handleCloseModal();
              notify(t('channel is removed'));
            }}
          >
            {t('remove')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveChannelModal;
