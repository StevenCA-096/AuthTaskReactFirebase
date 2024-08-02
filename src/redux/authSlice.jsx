import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authStatus",
  initialState: { isAuthenticated: false, user: null },
  reducers: {
    setLogged: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setNotLogged: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
export const { setLogged, setNotLogged } = authSlice.actions;
export default authSlice.reducer;