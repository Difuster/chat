import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalsReducer from './modalsSlice';
import fetchingReducer from './fetchingSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
    fetching: fetchingReducer,
  },
});
