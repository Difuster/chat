import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import currentChannelIdReducer from './currentChannelIdSlice';
import messagesReducer from './messagesSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    currentChannelId: currentChannelIdReducer,
    messages: messagesReducer,
  },
});
