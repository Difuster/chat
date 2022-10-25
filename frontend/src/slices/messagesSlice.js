import { createSlice, createSelector } from '@reduxjs/toolkit';
import { actions as channelActions, selectCurrentChannelId } from './channelsSlice';

const initialState = {
  messages: [],
};

/* eslint-disable no-param-reassign */
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelActions.removeChannel, (state, action) => {
      const restMessages = state.messages.filter((item) => item.channelId !== action.payload);
      state.messages = restMessages;
    })
      .addCase(channelActions.loadChannels, (state, action) => {
        state.messages = action.payload.messages;
      });
  },
});
/* eslint-enable no-param-reassign */

const selectAllMessages = (state) => state.messages.messages;
const selectCurrentChannelMessages = createSelector(
  [selectAllMessages, selectCurrentChannelId],
  (allMessages, currentChannelId) => {
    if (allMessages.length === 0) {
      return [];
    }

    return allMessages.filter((message) => message.channelId === currentChannelId);
  }
);

export const { actions } = messagesSlice;
export { selectAllMessages, selectCurrentChannelMessages };

export default messagesSlice.reducer;
