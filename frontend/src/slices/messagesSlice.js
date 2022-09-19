import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

// Начальное значение
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
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload;
      const restEntities = state.messages.filter((item) => item.channelId !== channelId);
      state.messages = restEntities;
    });
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { loadMessages, addMessage } = messagesSlice.actions;

// По умолчанию экспортируется редьюсер сгенерированный слайсом
export default messagesSlice.reducer;
