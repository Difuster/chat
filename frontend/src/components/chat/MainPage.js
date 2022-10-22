import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import Channels from './Channels';
import Messages from './Messages';
import Loader from '../Loader';
import {
  actions as channelActions, selectAllChannels, selectCurrentChannelId, selectCurrentChannelName,
} from '../../slices/channelsSlice.js';
import { fetchContent, selectFetchStatus } from '../../slices/fetchingSlice.js';
import { useAuth } from '../../contexts/authContext.jsx';

function MainPage() {
  const dispatch = useDispatch();

  const { getAuthHeader, loggedIn } = useAuth();

  useEffect(() => {
    dispatch(fetchContent(getAuthHeader));
  }, [dispatch, getAuthHeader]);

  const fetchStatus = useSelector(selectFetchStatus);
  const channels = useSelector(selectAllChannels);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentChannelName = useSelector(selectCurrentChannelName);

  const name = JSON.parse(loggedIn).username;

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
          name={name}
        />
      </Row>
    </Container>
  );
}

export default MainPage;
