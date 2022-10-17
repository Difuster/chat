import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import axios from 'axios';

import Channels from './Channels';
import Messages from './Messages';
import Loader from '../Loader';
import { actions as channelActions } from '../../slices/channelsSlice.js';
import { actions as messageActions } from '../../slices/messagesSlice.js';
import { useAuth } from '../../contexts/authContext.jsx';
import routes from '../../routes';

function MainPage() {
  const dispatch = useDispatch();

  const { loggedIn, getAuthHeader } = useAuth();
  const [response, setResponse] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      if (loggedIn) {
        const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        setResponse(true);
        dispatch(channelActions.loadChannels(data.channels));
        dispatch(channelActions.getCurrentChannel(data.currentChannelId));
        dispatch(messageActions.loadMessages(data.messages));
      } else {
        console.log(loggedIn);
      }
    };

    fetchContent();
  }, [loggedIn, dispatch, getAuthHeader]);

  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannel.id);
  const currentChannelName = useSelector((state) => state.channels.currentChannel.name);

  const getUserName = () => {
    const userId = localStorage.getItem('userId');
    const name = JSON.parse(userId).username;
    return name;
  };

  if (loggedIn && !response) {
    return <Loader />;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">

        <Channels
          channels={channels}
          currentChannelId={currentChannelId}
          getCurrentChannel={channelActions.getCurrentChannel}
        />

        <Messages
          currentChannelName={currentChannelName}
          currentChannelId={currentChannelId}
          getUserName={getUserName}
        />
      </Row>
    </Container>
  );
}

export default MainPage;
