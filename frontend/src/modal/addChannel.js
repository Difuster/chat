import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Modal, Form, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useApi } from '../contexts/apiContext.jsx';

const AddChannelModal = ({ handleCloseModal, channels }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'modals.addChannel' });
  const [err, setErr] = useState(false);
  const { getNewChannel, notify } = useApi();
  const channelsNames = channels.map((channel) => channel.name);

  const validateChannelName = (newChannelName, ChNames) => {
    yup.setLocale({
      mixed: {
        notOneOf: 'notOneOf',
      },
      string: {
        required: 'required',
        min: 'min',
      },
    });

    const schema = yup.string().required().min(3).notOneOf(ChNames);
    return schema.validate(newChannelName);
  };

  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    onSubmit: (values) => {
      const channelName = values.channel;
      validateChannelName(channelName, channelsNames)
        .then((ChName) => {
          getNewChannel({ name: ChName });
          formik.values.channel = '';
          handleCloseModal();
          notify(t('channel is added'));
          setErr(false);
        })
        .catch((error) => {
          setErr(error.message);
        });
    },
  });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Modal.Header closeButton onHide={handleCloseModal}>
        <Modal.Title>{t('add channel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
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
            <Button className="me-2" type="button" variant="secondary" onClick={handleCloseModal}>{t('cancel')}</Button>
            <Button type="submit" variant="primary">{t('add')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannelModal;
