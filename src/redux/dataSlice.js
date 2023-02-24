import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {employeeData} from '../../db';
import {holidayDatawithImage} from '../../db';
import {salaryData} from '../../slaryData';
import endPoints from '../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isLoading: true,
  isShowModal: false,
  salarySlipData: [],
  salarySlipDataLoading: false,
  salarySlipDataError: false,
  employeeData: {},
  employeeDataLoading: false,
  employeeDataError: false,
  holidayData: {},
  holidayDataLoading: false,
  holidayDataError: false,
  dateData: '',
  holidayDataIWithImage: {},
  holidayDataWithImageLoading: false,
  holidayDataWithImageError: false,
  leavesData: [],
  leavesDataError: undefined,
  isLeaveDataLoading: false,
};

// ============================================================================================

// your userSlice with other reducers

// ============================================================================================

export const getHolidaysData = createAsyncThunk(
  'dataReducer/holidayData',
  async token => {
    var config = {
      method: 'get',
      url: endPoints.holidaysAPI,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return axios(config)
      .then(async response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error(ERROR));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode == 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

// ========================================================================================

export const getLeaveDetails = createAsyncThunk(
  'home/getWalkThroughList',
  async ({token}) => {
    var config = {
      method: 'get',
      url: endPoints.leaveDetails,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return axios(config)
      .then(async response => {
        const {data, status} = response;
        console.log('data:', data);

        if (status === 200) {
          // return Promise.resolve({page:body.page, status: walkthroughStatus, data: newData });
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error(ERROR));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode == 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

// ========================================================================================

// export const getLeaveDetails = createAsyncThunk(
//   '/leavedetails',
//   async token => {
//     const configurations = {
//       method: 'get',
//       url: endPoints.leaveDetails,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     };
//     const response = await axios(configurations);
//     console.log('response:', response);
//     Promise.resolve(response);
//     // return data;
//   },
// );

// ========================================================================================

export const getSalarySlipData = createAsyncThunk(
  'dataReducer/salarySlipData',
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
    return Promise.resolve(salaryData);
  },
);

export const getEmployeeData = createAsyncThunk(
  'dataReducer/employeeData',
  async () => {
    return Promise.resolve(employeeData);
  },
);

export const getholidayDataIWithImage = createAsyncThunk(
  'dataReducer/holidayDataIWithImage',
  async () => {
    return Promise.resolve(holidayDatawithImage);
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
    dateOfModal: (state, action) => {
      state.dateData = action.payload;
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
      state.employeeData = action.payload;
      state.employeeDataError = undefined;
    });
    builder.addCase(getEmployeeData.rejected, (state, action) => {
      state.employeeDataLoading = false;
      state.employeeData = [];
      state.employeeDataError = action.payload;
    });
    builder.addCase(getHolidaysData.pending, state => {
      state.holidayDataLoading = true;
    });
    builder.addCase(getHolidaysData.fulfilled, (state, action) => {
      state.holidayDataLoading = false;
      state.holidayData = action.payload;
      state.holidayDataError = undefined;
    });
    builder.addCase(getHolidaysData.rejected, (state, action) => {
      state.holidayDataLoading = false;
      state.holidayData = [];
      state.holidayDataError = action.payload;
    });
    builder.addCase(getLeaveDetails.pending, (state, action) => {
      state.isLeaveDataLoading = true;
    });
    builder.addCase(getLeaveDetails.fulfilled, (state, action) => {
      state.isLeaveDataLoading = false;
      state.leavesData = action.payload;
      state.leavesDataError = undefined;
    });
    builder.addCase(getLeaveDetails.rejected, (state, action) => {
      state.isLeaveDataLoading = false;
      state.leavesData = [];
      state.leavesDataError = action.payload;
    });
    builder.addCase(getholidayDataIWithImage.pending, state => {
      state.holidayDataWithImageLoading = true;
    });
    builder.addCase(getholidayDataIWithImage.fulfilled, (state, action) => {
      state.holidayDataWithImageLoading = false;
      state.holidayDataIWithImage = action.payload;
      state.holidayDataWithImageError = undefined;
    });
    builder.addCase(getholidayDataIWithImage.rejected, (state, action) => {
      state.holidayDataWithImageLoading = false;
      state.holidayDataIWithImage = [];
      state.holidayDataWithImageError = action.payload;
    });
  },
});

export default dataSlice.reducer;
export const {loadingStatus, modalStatus, dateOfModal} = dataSlice.actions;
