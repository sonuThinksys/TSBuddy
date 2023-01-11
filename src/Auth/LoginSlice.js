import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});
export default loginSlice.reducer;
export const {loginStatus} = loginSlice.actions;
