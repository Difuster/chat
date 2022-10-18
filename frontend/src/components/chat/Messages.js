import React, { useState, useRef, useEffect } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { useApi } from '../../contexts/apiContext.jsx';
import { selectAllMessages } from '../../slices/messagesSlice.js';
import sendMessageIcon from '../../imgs/send_message.png';

const renderMessages = (msgs) => msgs.map((m) => (
  <div key={m.id}>
    <span>
      <b>{m.user}</b>
      :
      {' '}
      {m.value}
    </span>
    <br />
  </div>
));

function Messages({ currentChannelId, currentChannelName, getUserName }) {
  const scrollToBottom = (el) => {
    const height = el.current.scrollHeight;
    el.current.scroll(0, height);
  };

  const { sendMessage } = useApi();

  const messages = useSelector(selectAllMessages);
  const getCurrentChannelMessages = (msgs, currId) => msgs.filter((m) => m.channelId === currId);
  const currentChannelMessages = getCurrentChannelMessages(messages, currentChannelId);

  const messagesBox = useRef(null);
  const inputRef = useRef();
  const [disabled, setDisabled] = useState(true);

  const { t } = useTranslation('translation', { keyPrefix: 'messages' });
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const messageData = {
        value: values.message,
        user: getUserName(),
        channelId: currentChannelId,
      };
      sendMessage(messageData);
      formik.values.message = '';
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  useEffect(() => {
    scrollToBottom(messagesBox);
  }, [messages, currentChannelId]);

  useEffect(() => {
    const trimmedText = formik.values.message.trim();
    if (trimmedText.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formik.values.message]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="mb-4 p-3 shadow-sm">
          <p className="m-0">
            <b>
              #
              {' '}
              {currentChannelName}
            </b>
          </p>
          <span className="text-muted">
            {t('messageCounter.count', { count: currentChannelMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messagesBox}>
          {renderMessages(currentChannelMessages)}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="d-flex">
              <Form.Control
                name="message"
                type="text"
                autoComplete="off"
                aria-label={t('ariaLabel')}
                placeholder={t('placeholder')}
                className="me-2"
                value={filter.clean(formik.values.message)}
                onChange={formik.handleChange}
                ref={inputRef}
              />
              <Button variant="success" type="submit" disabled={disabled}>
                <span>
                  <img
                    style={{ width: '20px', height: '20px' }}
                    src={sendMessageIcon}
                    alt="send"
                  />
                </span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Col>
  );
}

export default Messages;
