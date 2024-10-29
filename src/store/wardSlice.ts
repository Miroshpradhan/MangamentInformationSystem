import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state type
interface Ward {
  id: string;
  name: string;
}

interface WardsState {
  lists: Ward[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: WardsState = {
  lists: [],
  loading: false,
  error: null,
};

// Async thunk to fetch wards
export const fetchWards = createAsyncThunk<Ward[], void, { rejectValue: string }>(
  'wards/fetchWards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/wards'); // Adjust the endpoint as needed
      return response.data.data.wards.lists; // Adjust based on your API response structure
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to fetch wards');
    }
  }
);

// Create the slice
const wardsSlice = createSlice({
  name: 'wards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWards.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload; // Populate lists with fetched wards
      })
      .addCase(fetchWards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

// Export the async thunk and reducer
export default wardsSlice.reducer;
export const selectWards = (state: { wards: WardsState }) => state.wards.lists;
export const selectWardsLoading = (state: { wards: WardsState }) => state.wards.loading;
export const selectWardsError = (state: { wards: WardsState }) => state.wards.error;
