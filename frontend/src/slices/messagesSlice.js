import { createSlice } from '@reduxjs/toolkit';
import { actions as channelActions } from './channelsSlice';

const initialState = {
  messages: [],
  currentChannelMessages: {
    channelId: 0,
    messages: [],
  },
};

/* eslint-disable no-param-reassign */
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      const messages = state.messages
        .filter((message) => message.channelId === action.payload.channelId);
      state.currentChannelMessages.messages = messages;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelActions.removeChannel, (state, action) => {
      const channelId = action.payload;
      const restMessages = state.messages.filter((item) => item.channelId !== channelId);
      state.messages = restMessages;
      if (state.currentChannelMessages.channelId === channelId) {
        state.currentChannelMessages.channelId = 1;
        const messages = state.messages
          .filter((message) => message.channelId === 1);
        state.currentChannelMessages.messages = messages;
      }
    })
      .addCase(channelActions.loadChannels, (state, action) => {
        state.messages = action.payload.messages;
        const messages = state.messages
          .filter((message) => message.channelId === action.payload.currentChannelId);
        state.currentChannelMessages = {
          messages,
          channelId: action.payload.currentChannelId,
        };
      })
      .addCase(channelActions.getCurrentChannel, (state, action) => {
        const messages = state.messages
          .filter((message) => message.channelId === action.payload);
        state.currentChannelMessages = {
          messages,
          channelId: action.payload,
        };
      })
      .addCase(channelActions.addChannel, (state, action) => {
        const messages = state.messages
          .filter((message) => message.channelId === action.payload.id);
        state.currentChannelMessages = {
          messages,
          channelId: action.payload.id,
        };
      });
  },
});
/* eslint-enable no-param-reassign */

const selectAllMessages = (state) => state.messages.messages;
const selectCurrentChannelMessages = (state) => state.messages.currentChannelMessages.messages;

export const { actions } = messagesSlice;
export { selectAllMessages, selectCurrentChannelMessages };

export default messagesSlice.reducer;
