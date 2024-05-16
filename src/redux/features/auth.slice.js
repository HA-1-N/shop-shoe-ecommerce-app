import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUserByIdApi } from "../../api/user.api";

const initialState = {
  currentUser: null,
  authState: false,
  loading: false,
  error: null,
  countNumberLogin: 0,
};

export const getCurrentUserByIdAsync = createAsyncThunk(
  "auth/get-by-id",
  async (id) => {
    const response = await getCurrentUserByIdApi(id);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    incrementCountNumberLogin: (state) => {
      state.countNumberLogin += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUserByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.authState = true;
      })
      .addCase(getCurrentUserByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { incrementCountNumberLogin } = authSlice.actions;
export const authReducer = authSlice.reducer;