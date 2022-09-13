import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import sendMessageIcon from '../../imgs/send_message.png';

const renderMessages = (msgs) => msgs.map((m) => {
  return (
    <div key={m.id}>
      <span>
        {m.user}: {m.value}
      </span>
      <br />
    </div>
  );
});

function Messages(props) {
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
      props.handleSendMessage(messageData);
      values.message = '';
    },
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="mb-4 p-3 shadow-sm">
          <p className="m-0">
            <b>{props.currentChannelName}</b>
          </p>
          <span className="text-muted">
            {t('messageCounter.count', { count: props.currentChannelMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {renderMessages(props.currentChannelMessages)}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="d-flex">
              <Form.Control name="message"
                type="text"
                aria-label={t('ariaLabel')}
                placeholder={t('placeholder')}
                className="me-2"
                value={formik.values.message}
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
