import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    loadChannels: (state, action) => {
      const channelsNames = state.channels.map((channel) => channel.name);
      action.payload.forEach((channel) => {
        if (channelsNames.includes(channel.name)) {
          return;
        }
        state.channels.push(channel);
      });
    },
    addChannel: (state, action) => {
      const newChannel = {
        id: action.payload.id,
        name: action.payload.name,
        removable: true,
      };
      state.channels.push(newChannel);
    },
    removeChannel: (state, action) => {
      const newChannels = state.channels.filter((channel) => channel.id !== action.payload);
      Object.assign(state, { channels: newChannels });
    },
    renameChannel: (state, action) => {
      state.channels.forEach((channel) => {
        if (channel.id === action.payload.id) {
          Object.assign(channel, { name: action.payload.name });
        }
      });
    },
  },
});

export const {
  addChannel, loadChannels, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
