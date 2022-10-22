import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {
    type: null,
    id: 0,
    name: null,
  },
  isShown: false,
};

/* eslint-disable no-param-reassign */
const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.items = {
        type: action.payload.type,
        id: action.payload.id,
        name: action.payload.name,
      };
      state.isShown = true;
    },
    closeModal: (state, action) => {
      state.items = {
        type: action.payload.type,
        id: action.payload.id,
        name: action.payload.name,
      };
      state.isShown = false;
    },
  },
});
/* eslint-enable no-param-reassign */

const selectModalItems = (state) => state.modals.items;
const selectIsModalShown = (state) => state.modals.isShown;

export { selectModalItems, selectIsModalShown };
export const { actions } = modalsSlice;

export default modalsSlice.reducer;
