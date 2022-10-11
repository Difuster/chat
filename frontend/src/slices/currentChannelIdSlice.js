import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
};

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    getCurrentChannelId: (state, action) => {
      Object.assign(state, { id: action.payload });
    },
  },
});

export const { getCurrentChannelId } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
