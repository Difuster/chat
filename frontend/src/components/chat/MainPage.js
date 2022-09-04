import { io } from 'socket.io-client';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
// Хуки находятся в react-redux
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
// Импортируем нужные действия
import Channels from './Channels';
import { loadChannels } from '../../slices/channelsSlice.js';
import { getCurrentId } from '../../slices/currentChannelIdSlice.js';
import { loadMessages, addMessage } from '../../slices/messagesSlice.js';
import AddChannelModal from '../../modal/addChannel';
import AuthContext from '../../contexts/index.jsx';
import routes from '../../routes';
import sendMessageIcon from '../../imgs/send_message.png';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const renderModal = (modal, hideModal) => {
  if (!modal) {
    return null;
  }

  return <AddChannelModal onHide={hideModal} />;
};

function MainPage() {
  const [modalType, setModalType] = useState(null);
  const currentChannelName = useSelector((state) => state.currentChannelId.name);
  const currentChannelId = useSelector((state) => state.currentChannelId.id);

  const dispatch = useDispatch();
  const socket = io();
  // Вытаскиваем данные из хранилища. state – все состояние
  const messages = useSelector((state) => state.messages.messages);

  const getUserName = () => {
    const data = localStorage.getItem('userId');
    const name = JSON.parse(data).username;
    return name;
  };

  const getCurrentChannelMessages = (msgs, currId) => msgs.filter((m) => m.channelId === currId);
  const currentChannelMessages = getCurrentChannelMessages(messages, currentChannelId);

  // Возвращает метод store.dispatch() текущего хранилища
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      socket.on('connect', () => console.log(socket));
      dispatch(loadChannels(data.channels));
      dispatch(getCurrentId(data.currentChannelId));
      dispatch(loadMessages(data.messages));
    };

    fetchContent();
  }, []);

  if (!loggedIn) {
    return navigate('/login');
  }

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
      socket.emit('newMessage', messageData);
    },
  });

  useEffect(() => {
    socket.on('newMessage', (data) => {
      dispatch(addMessage(data));
    });
  }, []);

  const closeModal = () => {
    setModalType(null);
  };

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

  const handleAddChannel = (e) => {
    e.preventDefault();
    setModalType('addChannel');
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels handleAddChannel={handleAddChannel}/>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>{currentChannelName}</b>
              </p>
              <span className="text-muted">{currentChannelMessages.length} сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {renderMessages(currentChannelMessages)}
            </div>
            <div className="mt-auto px-5 py-3">
              <form novalidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
                <div className="input-group has-validation">
                  <input name="message"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 form-control"
                    value={formik.values.message}
                    onChange={formik.handleChange}/>
                  <button type="submit" disabled="" className="btn btn-group-vertical">
                    <span><img style={{ width: '20px', height: '20px' }} src={sendMessageIcon} /></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Col>
        {renderModal(modalType, closeModal)}
      </Row>
    </Container>
  );
}

export default MainPage;
