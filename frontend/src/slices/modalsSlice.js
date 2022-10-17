import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {
    type: null,
    id: 0,
    name: null,
  },
  isShown: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.items.type = action.payload.type;
      state.items.id = action.payload.id;
      state.items.name = action.payload.name;
      state.isShown = true;
    },
    closeModal: (state, action) => {
      state.items.type = action.payload.type;
      state.items.id = action.payload.id;
      state.items.name = action.payload.name;
      state.isShown = false;
    },
  },
});

export const { actions } = modalsSlice;

export default modalsSlice.reducer;
