import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
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
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { addChannel, loadChannels } = channelsSlice.actions;

// По умолчанию экспортируется редьюсер сгенерированный слайсом
export default channelsSlice.reducer;
