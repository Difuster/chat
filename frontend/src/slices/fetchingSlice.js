import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions as channelActions } from './channelsSlice';
import { actions as messageActions } from './messagesSlice';
import routes from '../routes';

export const fetchContent = createAsyncThunk(
  'fetching/fetchContent',
  async (getHeaders, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(routes.dataPath(), { headers: getHeaders() });
      dispatch(channelActions.loadChannels(data.channels));
      dispatch(messageActions.loadMessages(data.messages));
      dispatch(channelActions.getCurrentChannel(data.currentChannelId));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  status: 'idle',
  error: null,
};

const fetchingSlice = createSlice({
  name: 'fetching',
  initialState,
  extraReducers: {
    [fetchContent.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchContent.fulfilled]: (state) => {
      state.status = 'resolved';
      state.error = null;
    },
    [fetchContent.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const selectFetchStatus = (state) => state.fetching.status;

export const { actions } = fetchingSlice;

export default fetchingSlice.reducer;
