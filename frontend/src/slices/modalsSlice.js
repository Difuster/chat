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
      Object.assign(state.items, { type: action.payload.type });
      Object.assign(state.items, { id: action.payload.id });
      Object.assign(state.items, { name: action.payload.name });
      Object.assign(state, { isShown: true });
    },
    closeModal: (state, action) => {
      Object.assign(state.items, { type: action.payload.type });
      Object.assign(state.items, { id: action.payload.id });
      Object.assign(state.items, { name: action.payload.name });
      Object.assign(state, { isShown: false });
    },
  },
});

const selectModalItems = (state) => state.modals.items;
const selectIsModalShown = (state) => state.modals.isShown;

export { selectModalItems, selectIsModalShown };
export const { actions } = modalsSlice;

export default modalsSlice.reducer;
