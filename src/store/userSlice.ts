import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/config/axios";
import { toast } from "sonner";
import { StoreState, User } from "../types/StoreTypes";

export const addUser = createAsyncThunk<User, FormData, { state: StoreState }>(
  'users/addUser',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.user.token; 

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      };

      const { data } = await apiClient.post(`/users`, payload, config);

      if (data.success) {
        toast.success(data.message);
        return data.data.user; 
      } else {
        return rejectWithValue(data.message || 'Failed to add user');
      }
    } catch (e: any) {
      const message = e?.response?.data?.error?.message || 'An error occurred';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
const initialState = {
  users: [] as User[], 
  loading: false, 
  error: null as { message: string } | null,
};

// User slice definition
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Additional reducers can be defined here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true; // Set loading state
        state.error = null; // Clear any previous errors
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false; // Reset loading state
        state.users.push(action.payload); // Add the new user to the users array
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false; // Reset loading state
        state.error = { message: action.payload as string }; // Set error message
        toast.error("Failed to add user: " + state.error.message); // Show error toast
      });
  },
});

// Export the reducer
export default userSlice.reducer;
