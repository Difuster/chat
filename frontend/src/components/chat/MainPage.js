import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import Channels from './Channels';
import Messages from './Messages';
import Loader from '../Loader';
import { actions as channelActions } from '../../slices/channelsSlice.js';
import { fetchContent } from '../../slices/fetchingSlice.js';
import { useAuth } from '../../contexts/authContext.jsx';

function MainPage() {
  const dispatch = useDispatch();

  const { getAuthHeader } = useAuth();
  const fetchStatus = useSelector((state) => state.fetching.status);

  useEffect(() => {
    dispatch(fetchContent(getAuthHeader));
  }, [dispatch]);

  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannel.id);
  const currentChannelName = useSelector((state) => state.channels.currentChannel.name);

  const getUserName = () => {
    const userId = localStorage.getItem('userId');
    const name = JSON.parse(userId).username;
    return name;
  };

  if (fetchStatus === 'loading') {
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
