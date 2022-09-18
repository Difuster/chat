import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import { io } from 'socket.io-client';
import axios from 'axios';

import Channels from './Channels';
import Messages from './Messages';
import { loadChannels } from '../../slices/channelsSlice.js';
import { getCurrentId } from '../../slices/currentChannelIdSlice.js';
import { loadMessages, addMessage } from '../../slices/messagesSlice.js';
import AddChannelModal from '../../modal/addChannel';
import RenameChannelModal from '../../modal/renameChannel';
import RemoveChannelModal from '../../modal/removeChannel';
import useAuth from '../../hooks/authHook.jsx';
import routes from '../../routes';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const renderModal = (modal, hideModal, items) => {
  let modalToRender;
  if (!modal) {
    modalToRender = null;
  }

  if (modal === 'addChannel') {
    modalToRender = <AddChannelModal onHide={hideModal} items={items}/>;
  }

  if (modal === 'renameChannel') {
    modalToRender = <RenameChannelModal onHide={hideModal} items={items}/>;
  }

  if (modal === 'removeChannel') {
    modalToRender = <RemoveChannelModal onHide={hideModal} items={items}/>;
  }

  return modalToRender;
};

function MainPage() {
  const dispatch = useDispatch();

  const { loggedIn } = useAuth();
  const [modalType, setModalType] = useState(null);
  const [modalItems, setModalItems] = useState(null);

  const channels = useSelector((state) => state.channels.channels);
  const currentChannelName = useSelector((state) => state.currentChannelId.name);
  const currentChannelId = useSelector((state) => state.currentChannelId.id);

  const getUserName = () => {
    const userId = localStorage.getItem('userId');
    const name = JSON.parse(userId).username;
    return name;
  };

  const closeModal = () => {
    setModalType(null);
  };

  const showModal = (e) => {
    e.preventDefault();
    setModalType('addChannel');
    const channelsNames = channels.map((channel) => channel.name);
    setModalItems({ channelsNames });
  };

  const handleRemoveChannel = (id) => {
    setModalType('removeChannel');
    setModalItems({ id });
  };

  const handleRenameChannel = (id, name) => {
    setModalType('renameChannel');
    const channelsNames = channels.map((channel) => channel.name);
    setModalItems({ id, name, channelsNames });
  };

  useEffect(() => {
    const fetchContent = async () => {
      if (loggedIn) {
        const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        dispatch(loadChannels(data.channels));
        dispatch(getCurrentId(data.currentChannelId));
        dispatch(loadMessages(data.messages));
        console.log('fetch');
      } else {
        console.log(loggedIn);
      }
    };

    fetchContent();
  }, [loggedIn]);

  if (!loggedIn) {
    return <Navigate to='login' />;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">

        <Channels
          channels={channels}
          currentChannelId={currentChannelId}
          showModal={showModal}
          handleRemoveChannel={handleRemoveChannel}
          handleRenameChannel={handleRenameChannel}
        />

        <Messages
          currentChannelName={currentChannelName}
          currentChannelId={currentChannelId}
          getUserName={getUserName}
        />

        {renderModal(modalType, closeModal, modalItems)}
      </Row>
    </Container>
  );
}

export default MainPage;
