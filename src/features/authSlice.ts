import { createSlice } from "@reduxjs/toolkit";

const storedLogin = localStorage.getItem("isLoggedIn");
const storedUser = localStorage.getItem("user");
const userData = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
  isLoggedIn: storedLogin === "true",
  username: userData?.username || "",
  email: userData?.email || "",
  avatar: userData?.avatar || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar || "";

      const user = {
        username: state.username,
        email: state.email,
        avatar: state.avatar,
      };
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = "";
      state.email = "";
      state.avatar = "";
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("user");
    },
    updateProfile(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;

      const user = {
        username: state.username,
        email: state.email,
        avatar: state.avatar,
      };
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
