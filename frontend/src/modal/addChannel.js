import React, { useEffect, useRef } from 'react';
import uniqid from 'uniqid';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Modal, Form } from 'react-bootstrap';
import { addChannel } from '../slices/channelsSlice.js';
import { getCurrentId } from '../slices/currentChannelIdSlice.js';

const AddChannelModal = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    onSubmit: (values) => {
      const id = uniqid();
      const name = values.channel;
      dispatch(addChannel({ name, id }));
      dispatch(getCurrentId(id));
      values.channel = '';
      props.onHide();
    },
  });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={props.onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
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
          </Form.Group>
          <input type="submit" className="btn btn-primary mt-2" value="submit" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
