import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //Checking for login
    login: (state, action) => {
      (state.status = true), (state.userData = action.payload);
    },

    //Logut
    logout: (state) => {
      (state.status = false), (state.userData = null);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
