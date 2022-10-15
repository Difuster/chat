import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useApi } from '../contexts/apiContext.jsx';

const RenameChannelModal = ({ items, onHide }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'modals.renameChannel' });
  const [err, setErr] = useState(false);
  const { renameChannel, notify } = useApi();

  const validateChannelName = (newChannel, channels) => {
    yup.setLocale({
      mixed: {
        notOneOf: 'notOneOf',
      },
      string: {
        required: 'required',
        min: 'min',
      },
    });

    const schema = yup.string().required().min(3).notOneOf(channels);
    return schema.validate(newChannel);
  };

  const formik = useFormik({
    initialValues: {
      channel: items.name,
    },
    onSubmit: (values) => {
      const { id } = items;
      const name = values.channel;
      validateChannelName(name, items.channelsNames)
        .then((channelName) => {
          renameChannel(id, channelName);
          formik.values.channel = '';
          onHide();
          notify(t('channel is renamed'));
          setErr(false);
        })
        .catch((error) => {
          setErr(error.message);
        });
    },
  });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('rename')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              autoComplete="off"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channel}
              data-testid="input-channel"
              name="channel"
              id="channel"
            />
            <Form.Label htmlFor="channel" className="visually-hidden">{t('channel name')}</Form.Label>
            {
              err
                ? <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>{t(`errors.${err}`)}</Form.Control.Feedback>
                : <br />
            }
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="me-2" type="button" variant="secondary" onClick={() => onHide()}>{t('cancel')}</Button>
            <Button type="submit" variant="primary">{t('confirm')}</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
