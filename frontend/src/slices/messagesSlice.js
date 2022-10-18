import { createSlice } from '@reduxjs/toolkit';
import { actions as channelActions } from './channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    loadMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelActions.removeChannel, (state, action) => {
      const channelId = action.payload;
      const restEntities = state.messages.filter((item) => item.channelId !== channelId);
      state.messages = restEntities;
    });
  },
});

export const selectAllMessages = (state) => state.messages.messages;

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
