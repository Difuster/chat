import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { removeChannel } from '../slices/channelsSlice.js';
import { getCurrentId } from '../slices/currentChannelIdSlice.js';
import useToast from '../hooks/toastHook.jsx';

const RemoveChannelModal = (props) => {
  const toast = useToast();
  const { t } = useTranslation('translation', { keyPrefix: 'modals.removeChannel' });
  const dispatch = useDispatch();

  return (
    <Modal show>
      <Modal.Header closeButton onHide={props.onHide}>
        <Modal.Title>{t('remove channel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('sure')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" type="button" variant="secondary" onClick={() => props.onHide()}>{t('cancel')}</Button>
          <Button type="button" variant="danger" onClick={() => {
            dispatch(removeChannel(props.items.id));
            dispatch(getCurrentId(1));
            props.onHide();
            toast.notify(t('channel is removed'));
          }
          }>
            {t('remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
