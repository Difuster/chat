import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
};

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    getCurrentId: (state, action) => {
      state.id = action.payload;
    },
  }
});

export const { getCurrentId } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
