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
      if (action.payload.length === 0) {
        return;
      }
      const messagesIds = state.messages.map((message) => message.id);
      action.payload.forEach((message) => {
        if (messagesIds.includes(message.id)) {
          return;
        }
        state.messages.push(message);
      });
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelActions.removeChannel, (state, action) => {
      const channelId = action.payload;
      const restEntities = state.messages.filter((item) => item.channelId !== channelId);
      Object.assign(state, { messages: restEntities });
    });
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
