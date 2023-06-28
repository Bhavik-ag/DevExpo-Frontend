import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    username: string;
    profile_pic: string;
    name: string;
  } | null;
}

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
} as AuthState;

export interface AuthPayloadType {
  user: string;
  name: string;
  profile_pic: string;
}
// setCredentials: (state, action: PayloadAction<AuthPayloadType>) => {

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state) => {
      state.isAuthenticated = true;
    },
    setUser(state, action: PayloadAction<AuthPayloadType>) {
      state.user = {
        username: action.payload.user,
        name: action.payload.name,
        profile_pic: action.payload.profile_pic,
      };
    },
    logOut: (state) => {
      state.isAuthenticated = false;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setCredentials, setUser, logOut, finishLoading } =
  authSlice.actions;

export default authSlice.reducer;
