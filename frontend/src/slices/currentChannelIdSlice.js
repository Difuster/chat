import { createSlice } from '@reduxjs/toolkit';
import { actions as channelActions } from './channelsSlice';

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
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.addChannel, (state, action) => ({ ...state, id: action.payload.id }))
      .addCase(
        channelActions.removeChannel,
        (state, action) => (state.id === action.payload ? { ...state, id: 1 } : { ...state }),
      );
  },
});

export const { getCurrentChannelId } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
