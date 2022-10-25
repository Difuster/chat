import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannel: {
    id: 1,
  },
};

/* eslint-disable no-param-reassign */
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    loadChannels: (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannel.id = action.payload.currentChannelId;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannel.id = action.payload;
    },
    addChannel: (state, action) => {
      const newChannel = {
        id: action.payload.id,
        name: action.payload.name,
        removable: true,
      };
      state.channels.push(newChannel);
      state.currentChannel.id = newChannel.id;
    },
    removeChannel: (state, action) => {
      const newChannels = state.channels.filter((channel) => channel.id !== action.payload);
      state.channels = newChannels;
      if (state.currentChannel.id === action.payload) {
        state.currentChannel.id = 1;
      }
    },
    renameChannel: (state, action) => {
      state.channels.find((channel) => channel.id === action.payload.id).name = action.payload.name;
    }
  },
});
/* eslint-enable no-param-reassign */

const selectAllChannels = (state) => state.channels.channels;
const selectCurrentChannelId = (state) => state.channels.currentChannel.id;
const selectCurrentChannelName = createSelector(
  [selectAllChannels, selectCurrentChannelId],
  (allChannels, currentChannelId) => {
    if (allChannels.length === 0) {
      return null;
    }
    const currentChannel = allChannels.find((channel) => channel.id === currentChannelId);
    return currentChannel.name;
  }
);

export const { actions } = channelsSlice;
export { selectAllChannels, selectCurrentChannelId, selectCurrentChannelName };

export default channelsSlice.reducer;
