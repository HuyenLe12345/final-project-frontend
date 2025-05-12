import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idUser: "",
  username: "",
  role: "",
  avatar: "",
  background: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.idUser = action.payload.idUser;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.avatar = action.payload.avatar;
      state.background = action.payload.background;
    },
    logout(state) {
      state.idUser = "";
      state.username = "";
      state.role = "";
      state.avatar = "";
      state.background = "";
    },
    updateAvatar(state, action) {
      state.avatar = action.payload.avatar;
    },
    updateBackground(state, action) {
      state.background = action.payload.background;
    },
  },
});

export const { login, logout, updateBackground, updateAvatar } =
  userSlice.actions;
export default userSlice.reducer;
