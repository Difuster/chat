import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useApi } from '../contexts/apiContext.jsx';

const RemoveChannelModal = ({ items, onHide }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'modals.removeChannel' });
  const { removeChannel, notify } = useApi();

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('remove channel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('sure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            type="button"
            variant="secondary"
            onClick={() => onHide()}
          >
            {t('cancel')}
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              removeChannel(items.id);
              onHide();
              notify(t('channel is removed'));
            }}
          >
            {t('remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
