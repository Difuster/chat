import React, { useRef, useEffect } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import sendMessageIcon from '../../imgs/send_message.png';
import useSocket from '../../hooks/socketHook.jsx';
import { addMessage } from '../../slices/messagesSlice.js';

const renderMessages = (msgs) => msgs.map((m) => {
  console.log(m.id);
  return (
    <div key={m.id}>
      <span>
        <b>{m.user}</b>: {m.value}
      </span>
      <br />
    </div>
  );
});

function Messages(props) {
  const scrollToBottom = (el) => {
    const height = el.current.scrollHeight;
    el.current.scroll(0, height);
  };

  const messages = useSelector((state) => state.messages.messages);
  const getCurrentChannelMessages = (msgs, currId) => msgs.filter((m) => m.channelId === currId);
  const currentChannelMessages = getCurrentChannelMessages(messages, props.currentChannelId);

  const dispatch = useDispatch();
  const { socket, sendMessage } = useSocket();
  const messagesBox = useRef(null);

  const { t } = useTranslation('translation', { keyPrefix: 'messages' });
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const messageData = {
        value: values.message,
        user: props.getUserName(),
        channelId: props.currentChannelId,
      };
      sendMessage(messageData);
      values.message = '';
    },
  });

  useEffect(() => {
    scrollToBottom(messagesBox);
  }, [messages]);

  useEffect(() => {
    socket.on('newMessage', (data) => {
      console.log('dispatch: addMessage', data);
      dispatch(addMessage(data));
    });
  }, [sendMessage]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="mb-4 p-3 shadow-sm">
          <p className="m-0">
            <b>#{' '}{props.currentChannelName}</b>
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
              <Form.Control name="message"
                type="text"
                autoComplete="off"
                aria-label={t('ariaLabel')}
                placeholder={t('placeholder')}
                className="me-2"
                value={filter.clean(formik.values.message)}
                onChange={formik.handleChange}/>
              <Button variant="success" type="submit" disabled="">
                <span><img style={{ width: '20px', height: '20px' }} src={sendMessageIcon} /></span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Col>
  );
}

export default Messages;
