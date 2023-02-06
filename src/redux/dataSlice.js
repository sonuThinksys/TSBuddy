import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {employeeData} from '../../db';
const initialState = {
  isLoading: true,
  isShowModal: false,
  salarySlipData: [],
  salarySlipDataLoading: false,
  salarySlipDataError: false,
  employeeData: {},
  employeeDataLoading: false,
  employeeDataError: false,
};

export const getSalarySlipData = createAsyncThunk(
  'dataRducer/salarySlip',
  async () => {
    fetch('http://localhost:4000/salaryData')
      .then(res => res.json())
      .then(result => {
        // console.log('result:--------', result);
        return Promise.resolve(result);
      })
      .catch(err => {
        // console.log('error:=======', err);
        return Promise.reject(err);
      });
  },
);

// export const getEmployeeData = createAsyncThunk(
//   'dataReducer/employeeData',
//   async () => {
//     return fetch('http://localhost:4000/employeeData')
//       .then(res => res.json())
//       .then(result => {
//         console.log('resultOfEmployeeData:------------------', result);
//         return Promise.resolve(result);
//       })
//       .catch(err => {
//         console.log('error:---------', err);
//         return Promise.reject(err);
//       });
//   },
// );

export const getEmployeeData = createAsyncThunk(
  'dataReducer/employeeData',
  async () => {
    return Promise.resolve(employeeData);
  },
);

const dataSlice = createSlice({
  name: 'dataa',
  initialState,
  reducers: {
    loadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    modalStatus: (state, action) => {
      state.isShowModal = action.payload;
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
      state.salarySlipData = [];
      state.salarySlipDataError = action.payload;
    });

    builder.addCase(getEmployeeData.pending, state => {
      state.employeeDataLoading = true;
    });
    builder.addCase(getEmployeeData.fulfilled, (state, action) => {
      state.employeeDataLoading = false;
      console.log('response:------------', action.payload);
      state.employeeData = action.payload;
      state.employeeDataError = undefined;
    });
    builder.addCase(getEmployeeData.rejected, (state, action) => {
      state.employeeDataLoading = false;
      state.employeeData = [];
      state.employeeDataError = action.payload;
    });
  },
});

export default dataSlice.reducer;
export const {loadingStatus, modalStatus} = dataSlice.actions;
