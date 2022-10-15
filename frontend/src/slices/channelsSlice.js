import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: 0,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    loadChannels: (state, action) => {
      state.channels = action.payload;
      // return {
      //   ...state,
      //   channels: action.payload,
      // };
    },
    getCurrentChannelId: (state, action) => {
      Object.assign(state, { currentChannelId: action.payload });
    },
    addChannel: (state, action) => {
      const newChannel = {
        id: action.payload.id,
        name: action.payload.name,
        removable: true,
      };
      state.channels.push(newChannel);
      Object.assign(state, { currentChannelId: newChannel.id });
    },
    removeChannel: (state, action) => {
      const newChannels = state.channels.filter((channel) => channel.id !== action.payload);
      // Object.assign(state, { channels: newChannels });
      state.channels = newChannels;
      Object.assign(state, { currentChannelId: 1 });
    },
    renameChannel: (state, action) => {
      state.channels.forEach((channel) => {
        if (channel.id === action.payload.id) {
          channel.name = action.payload.name;
          // Object.assign(channel, { name: action.payload.name });
        }
      });
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
