import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import axios from 'axios';

import Channels from './Channels';
import Messages from './Messages';
import { loadChannels } from '../../slices/channelsSlice.js';
import { getCurrentChannelId } from '../../slices/currentChannelIdSlice.js';
import { loadMessages } from '../../slices/messagesSlice.js';
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

const renderModal = (type, items, toClose) => {
  switch (type) {
    case 'addChannel':
      return <AddChannelModal onHide={toClose} items={items} />;
    case 'renameChannel':
      return <RenameChannelModal onHide={toClose} items={items} />;
    case 'removeChannel':
      return <RemoveChannelModal onHide={toClose} items={items} />;
    default:
      return null;
  }
};

function MainPage() {
  const dispatch = useDispatch();

  const { loggedIn } = useAuth();
  const [modalType, setModalType] = useState(null);
  const [modalItems, setModalItems] = useState(null);
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId.id);
  const currentChannelName = channels
    .filter((ch) => ch.id === currentChannelId)
    .map((ch) => ch.name)[0];

  const getUserName = () => {
    const userId = localStorage.getItem('userId');
    const name = JSON.parse(userId).username;
    return name;
  };

  const openModalAddChannel = () => {
    setModalType('addChannel');
    const channelsNames = channels.map((channel) => channel.name);
    setModalItems({ channelsNames });
  };

  const openModalRemoveChannel = (id) => {
    setModalType('removeChannel');
    setModalItems({ id });
  };

  const openModalRenameChannel = (id, name) => {
    setModalType('renameChannel');
    const channelsNames = channels.map((channel) => channel.name);
    setModalItems({ id, name, channelsNames });
  };

  const closeModal = () => {
    setModalType(null);
  };

  useEffect(() => {
    const fetchContent = async () => {
      if (loggedIn) {
        const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        dispatch(loadChannels(data.channels));
        dispatch(getCurrentChannelId(data.currentChannelId));
        dispatch(loadMessages(data.messages));
      } else {
        console.log(loggedIn);
      }
    };

    fetchContent();
  }, [loggedIn, dispatch]);

  if (!loggedIn) {
    return <Navigate to="login" />;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">

        <Channels
          channels={channels}
          currentChannelId={currentChannelId}
          openModalAddChannel={openModalAddChannel}
          openModalRenameChannel={openModalRenameChannel}
          openModalRemoveChannel={openModalRemoveChannel}
          closeModal={closeModal}
        />

        <Messages
          currentChannelName={currentChannelName}
          currentChannelId={currentChannelId}
          getUserName={getUserName}
        />

        {renderModal(modalType, modalItems, closeModal)}
      </Row>
    </Container>
  );
}

export default MainPage;
