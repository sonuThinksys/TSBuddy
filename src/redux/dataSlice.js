import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isLoading: true,
};

const dataSlice = createSlice({
  name: 'dataa',
  initialState,
  reducers: {
    loadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export default dataSlice.reducer;
export const {loadingStatus} = dataSlice.actions;
