import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isLoading: false,
  salarySlipData: {},
  salarySlipDataLoading: false,
  salarySlipDataError: false,
};

export const getSalarySlipData = createAsyncThunk(
  'data/salarySlip',
  async ({filesArray, token}) => {},
);

const dataSlice = createSlice({
  name: 'dataa',
  initialState,
  reducers: {
    loadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSalarySlipData.pending, state => {
      state.salarySlipDataLoading = true;
    });
    builder.addCase(getSalarySlipData.fulfilled, (state, action) => {
      state.salarySlipDataLoading = false;
      state.salarySlipData = action.payload;
      state.salarySlipDataError = undefined;
    });
    builder.addCase(getSalarySlipData.rejected, (state, action) => {
      state.salarySlipDataLoading = false;
      state.transfeeDropDownData = [];
      state.salarySlipDataError = action.payload;
    });
  },
});

export default dataSlice.reducer;
export const {loadingStatus} = dataSlice.actions;
