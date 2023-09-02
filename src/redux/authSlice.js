import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// These are async thunks, special Redux functions that handle asynchronous operations and return promises.

export const signinUser = createAsyncThunk(
  "user/signin",
  async (loginData) => {
    const result = await axios.post("https://ticket-support-system-backend-4u1x.vercel.app/api/login", loginData);
    return result.data;
  }
);

export const createUser = createAsyncThunk(
  "user/create",
  async (loginData) => {
    const result = await axios.post("https://ticket-support-system-backend-4u1x.vercel.app/api/register", loginData);
    return result.data;
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // state.isAuthenticated = !!action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
