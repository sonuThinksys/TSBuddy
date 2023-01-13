import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isLoggedIn: false,
  isAuthLoggedIn: false,
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    authLoginStatus: (state, action) => {
      state.isAuthLoggedIn = action.payload;
    },
  },
});
export default loginSlice.reducer;
export const {loginStatus, authLoginStatus} = loginSlice.actions;
