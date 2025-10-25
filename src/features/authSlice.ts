import { createSlice } from "@reduxjs/toolkit";

const storedLogin = localStorage.getItem("isLoggedIn");
const storedUser = localStorage.getItem("user");
const userData = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
  isLoggedIn: storedLogin === "true",
  username: userData ? userData.username : "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", action.payload.username);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = "";
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("username");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
