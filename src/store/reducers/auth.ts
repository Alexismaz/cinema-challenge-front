import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../types/auth";
import {
  getUserAsync,
  logInAsync,
  verifySessionAsync,
  logOutAsync,
  uploadAvatarAsync,
  setRedirect,
  resetRedirect,
} from '../actions/auth'

const initialState: IAuthState = {
  authenticated: false,
  loading: true,
  user: null,
  shouldRedirect: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(verifySessionAsync.fulfilled, state => {
        state.authenticated = true;
        state.loading = false;
      })
      .addCase(verifySessionAsync.rejected, state => {
        state.authenticated = false;
        state.loading = false;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.booker;
      })
      .addCase(getUserAsync.rejected, state => {
        state.user = null;
        state.authenticated = false;
      })
      .addCase(logInAsync.fulfilled, state => {
        state.authenticated = true;
      })
      .addCase(logInAsync.rejected, state => {
        state.authenticated = false;
      })
      .addCase(uploadAvatarAsync.fulfilled, (state, action) => {
        if (state.user) {
          state.user.avatar = action.payload;
        }
      })
      .addCase(logOutAsync.fulfilled, state => {
        state.authenticated = false;
        state.user = null;
      })
      .addCase(logOutAsync.rejected, state => {
        state.authenticated = false;
        state.user = null;
      })
      .addCase(setRedirect.fulfilled, (state, action) => {
        state.shouldRedirect = action.payload.redirect;
      })
      .addCase(resetRedirect.rejected, state => {
        state.shouldRedirect = null;
      })
  },
});

export default authSlice.reducer;
