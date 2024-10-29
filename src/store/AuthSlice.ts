import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import CryptoJS from 'crypto-js'; // Ensure you're using the same encryption library

// Define a type for the state
interface AuthState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

// Define the initial state
const initialState: AuthState = {
  loading: false,
  error: null,
  token: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (userData: { data: string; municipality_code: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', {
        data: userData.data, // Use the encrypted data directly
        municipality_code: userData.municipality_code,
      });

      return response.data.data.token; // Return the token
    } catch (error: any) {
      const message = error.response?.data?.message || "An error occurred during login";
      return rejectWithValue(message);
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // Store the token in the state
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Store the error message
      });
  },
});

// Export the reducer
export default authSlice.reducer;
