import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useToast from '../hooks/toastHook.jsx';
import { renameChannel } from '../slices/channelsSlice.js';

const RenameChannelModal = (props) => {
  const toast = useToast();
  const { t } = useTranslation('translation', { keyPrefix: 'modals.renameChannel' });
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();

  const validateChannelName = (newChannel, channels) => {
    yup.setLocale({
      mixed: {
        notOneOf: t('errors.notOneOf')
      },
      string: {
        required: t('errors.required'),
        min: t('errors.min')
      }
    });

    const schema = yup.string().required().min(3).notOneOf(channels);
    return schema.validate(newChannel);
  };

  const formik = useFormik({
    initialValues: {
      channel: props.items.name,
    },
    onSubmit: (values) => {
      const { id } = props.items;
      const name = values.channel;
      validateChannelName(name, props.items.channelsNames)
        .then((channelName) => {
          dispatch(renameChannel({ name: channelName, id }));
          values.channel = '';
          props.onHide();
          toast.notify(t('channel is renamed'));
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
      <Modal.Header closeButton onHide={props.onHide}>
        <Modal.Title>{t('rename')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channel}
              data-testid="input-channel"
              name="channel"
            />
            {
              err
                ? <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>{err}</Form.Control.Feedback>
                : <br />
            }
            <div className="d-flex justify-content-end">
              <Button className="me-2" type="button" variant="secondary" onClick={() => props.onHide()}>{t('cancel')}</Button>
              <Button type="submit" variant="primary">{t('confirm')}</Button>
            </div>
          </Form.Group>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
