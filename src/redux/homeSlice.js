import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {holidayDatawithImage} from '../../db';
import endPoints from '../config';

import axios from 'axios';
import {MonthImages} from 'assets/monthImage/MonthImage';
// import {v4 as uuidv4} from 'uuid';

const initialState = {
  isLoading: true,
  isShowModal: false,
  salarySlipData: {},
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
  employeeProfile: {},
  employeeProfileLoading: false,
  employeeProfileError: false,
  calendereventDataLoading: false,
  calendereventData: {},
  calendereventDataError: false,
  attendenceDataPending: false,
  attendenceData: {},
  attendenceDataError: false,
  recentAppliedLeaves: [],
  remainingLeaves: [],
  leaveMenuDetails: [],
  menuDetailsLoading: false,
  foodMenuDatailsError: null,
  menuFeedbackError: null,
  dailyMenuID: '',
  userFeedback: [],
  resourcesEmployeeDataLoading: false,
  resourcesEmployeeData: [],
  resourcesEmployeeDataError: null,
};

const breakfast = 'breakfast';
const lunch = 'lunch';
const snacks = 'snacks';

// =============================================

// removeReduxVariables ='All variables are needed to remove from redux state and have to use with useState.'

export const updateLeaveStatus = createAsyncThunk(
  'home/updateLeaveStatus',
  async ({token, body}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const {data, status} = await axios.post(
        endPoints.updateLeaveStatus,
        body,
        config,
      );

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode == 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const applyForLeave = createAsyncThunk(
  'home/applyLeave',
  async function ({token, body}) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const {data, status} = await axios.post(
        endPoints.applyLeave,
        body,
        config,
      );

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode == 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }

    // return axios.post(endPoints.applyLeave, body, config).then(response => {
    //   return Promise.resolve(response);
    // });
  },
);

export const getSingleUserFeedback = createAsyncThunk(
  'home/getSingleUserFeedback',
  async ({token, menuID}) => {
    const config = {
      method: 'get',
      url: `${endPoints.getUserFeedback}${menuID}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        }
        // else {
        //   return Promise.reject(new Error('Something Went Wrong1!'));
        // }
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
); // removeReduxVariables

export const giveMenuFeedback = createAsyncThunk(
  'home/giveMenuFeedback',
  async ({token, menuID, userData, feedbackType, index}) => {
    const isLike = feedbackType === 'like';
    let value;
    if (isLike) value = 1;
    else value = 0;

    let type;
    if (index === 0) type = 'breakfast';
    if (index === 1) type = 'lunch';
    if (index === 2) type = 'meal';

    const apiEndpoint = endPoints.giveFeedbackPost;

    // const data = {
    //   employee: 'EMP/10352',
    //   employeeName: 'Amit Kumar Pant',
    //   dailyMenuId: menuId,
    //   creation: new Date(),
    //   breakfast: foodFeedback[0].feedback,
    //   lunch: foodFeedback[1].feedback,
    //   meal: foodFeedback[2].feedback,
    //   [type]: value,
    // };

    userData.dailyMenuId = menuID;
    userData[type] = value;

    return axios
      .post(apiEndpoint, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const {data, status} = response;
        if (status === 200) {
          data.index = index;
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong!'));
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

export const getMenuFeedback = createAsyncThunk(
  'home/menuFeedback',
  async token => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const feedback = await axios.get(
        endPoints.getMenuFeedbackTotalCount,
        config,
      );
      return Promise.resolve(feedback.data);
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response.status;
      }
      if (statusCode == 401) {
        return Promise.reject(err?.response?.data?.message);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

// =============================================

// ============================================================================================

// your userSlice with other reducers

export const getTodayMenuDetails = createAsyncThunk(
  'home/getTodayMenuDetails',
  async token => {
    const config = {
      method: 'get',
      url: endPoints.getTodayMenuGet,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong!'));
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

// ============================================================================================

// =============================================

// ============================================================================================

// your userSlice with other reducers

export const getEmployeesByLeaveApprover = createAsyncThunk(
  'home/getEmployeesByLeaveApprover',
  async token => {
    const config = {
      method: 'get',
      url: endPoints.getEmployeesByLeaveApprover,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong!'));
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

export const getResourcesEmployeesLeaves = createAsyncThunk(
  'getResourcesEmployeesLeaves',
  async token => {
    const config = {
      method: 'get',
      url: endPoints.getResourcesEmployeesLeaves,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return axios(config)
      .then(response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong!'));
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

// ============================================================================================

export const getHolidaysData = createAsyncThunk(
  'home/holidayData',
  async token => {
    const config = {
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
          return Promise.reject(new Error('Something Went Wrong1!'));
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
  async ({token, employeeID}) => {
    var config = {
      method: 'get',
      url: `${endPoints.leaveDetails}${employeeID}`,
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
          return Promise.reject(new Error('Something Went Wrong2!'));
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

export const getEmployeeProfileData = createAsyncThunk(
  'home/employeeProfile',
  async ({token, employeeID}) => {
    var config = {
      method: 'get',
      url: `${endPoints.employeeProfileAPI}${employeeID}`,
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
          return Promise.reject(new Error('Something Went Wrong3!'));
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

export const getCalendereventData = createAsyncThunk(
  'home/getCalendereventData',
  async token => {
    var config = {
      method: 'get',
      url: endPoints.calenderEventAPI,
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
          return Promise.reject(new Error('Something Went Wrong1!'));
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
export const getAttendencaeData = createAsyncThunk(
  'home/getAttendencaeData',
  async ({token, employeeID, visisbleMonth, visibleYear}) => {
    var config = {
      method: 'get',
      url: `${endPoints.attendenceAPI}${employeeID}&month=${visisbleMonth}&year=${visibleYear}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return axios(config)
      .then(async response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data[0]);
        } else {
          return Promise.reject(new Error('Something Went Wrong3!'));
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

export const getSalarySlipData = createAsyncThunk(
  'dataReducer/salarySlipData',
  async token => {
    var config = {
      method: 'get',
      url: endPoints.getSalaryDataAPI,
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
          return Promise.reject(new Error('Something Went Wrong1!'));
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

export const getEmployeeData = createAsyncThunk(
  'home/employeeData',
  async ({token, currentEmployees}) => {
    const config = {
      method: 'post',
      url: `${endPoints.getAllEmployees}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: currentEmployees,
    };

    try {
      const allEmployees = await axios(config);
      const {data, status} = allEmployees;
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong1!'));
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response.status;
      }
      if (statusCode == 401) {
        return Promise.reject(err?.response?.data?.message);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getholidayDataIWithImage = createAsyncThunk(
  'home/holidayDataIWithImage',
  async () => {
    return Promise.resolve(holidayDatawithImage);
  },
);

export const requestLunchSubmission = createAsyncThunk(
  'dataReducer/requestLunchSubmission',
  async formInput => {
    try {
      const {token, ...restData} = formInput;
      const url = endPoints.requestLunchApi;
      var config = {
        method: 'post',
        url: endPoints.requestLunchApi,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          requestforlunch: 1,
          requestlunchstartdate: new Date('2023-03-26'),
          requestlunchenddate: new Date('2023-03-30'),
        },
      };

      return axios(config).then(result => {
        const {data = {}, status} = result || {};

        if (status === 200) {
          return Promise.resolve({data, formInput});
        } else {
          return Promise.reject('something went wrong');
        }
      });
    } catch (err) {
      console.log('error:', err);
      // return Promise.reject(new Error(err));
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
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
    setRecentAppliedLeaves: (state, action) => {
      state.recentAppliedLeaves = action.payload;
    },
    setRemainingLeaves: (state, action) => {
      state.remainingLeaves = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSingleUserFeedback.fulfilled, (state, action) => {
      const data = action.payload;

      const breakfastRating = data?.breakfast;
      const lunchRating = data?.lunch;
      const snacksRating = data?.meal;

      const feedbackArray = [
        {
          type: breakfast,
          feedback: breakfastRating,
        },
        {
          type: lunch,
          feedback: lunchRating,
        },
        {
          type: snacks,
          feedback: snacksRating,
        },
      ];

      state.userFeedback = feedbackArray;
    });

    builder.addCase(giveMenuFeedback.fulfilled, (state, action) => {
      const feedbackArray = [...state.userFeedback];
      // return;

      if (feedbackArray.length) {
        feedbackArray[action?.payload?.index].feedback = action?.payload?.isLike
          ? 1
          : 0;
      }

      state.userFeedback = feedbackArray;
    });
    // builder.addCase(giveMenuFeedback.rejected, (state, action) => {
    // });
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

    builder.addCase(getMenuFeedback.pending, state => {});

    builder.addCase(getTodayMenuDetails.pending, state => {
      state.menuDetailsLoading = true;
    });

    builder.addCase(getTodayMenuDetails.fulfilled, (state, action) => {
      state.menuDetailsLoading = false;
      state.foodMenuDatailsError = undefined;
      const totalFoodArr = [
        {
          type: breakfast,
          food: action.payload?.foodMenus[0]?.breakfast,
          img_url: MonthImages.breakfastImgS,
        },
        {
          type: lunch,
          food: action.payload?.foodMenus[0]?.lunch,
          img_url: MonthImages.Lunch,
        },
        {
          type: snacks,
          food: action.payload?.foodMenus[0]?.eveningSnack,
          img_url: MonthImages.snacksS,
        },
      ];

      const data = {...action.payload, foodMenus: totalFoodArr};
      state.dailyMenuID = action.payload?.foodMenus[0]?.dailyMenuId || '';
      state.leaveMenuDetails = data;
    });

    builder.addCase(getTodayMenuDetails.rejected, (state, action) => {
      state.menuDetailsLoading = false;
      state.leaveMenuDetails = [];
      state.foodMenuDatailsError = action.payload;
    });

    // builder.addCase(getLeaveDetails.pending, (state, action) => {
    //   state.isLeaveDataLoading = true;
    // });
    builder.addCase(getLeaveDetails.fulfilled, (state, action) => {
      const reversedLeaves = action.payload.slice().reverse();

      state.isLeaveDataLoading = false;
      // const dataWithId = action.payload.map(item => ({...item, id: uuidv4()}));

      state.leavesData = reversedLeaves;
      state.leavesDataError = undefined;
    });
    // builder.addCase(getLeaveDetails.rejected, (state, action) => {
    //   state.isLeaveDataLoading = false;
    //   state.leavesData = [];
    //   state.leavesDataError = action.payload;
    // });
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

    //fgfgfg
    builder.addCase(getEmployeeProfileData.pending, state => {
      state.employeeProfileLoading = true;
    });
    builder.addCase(getEmployeeProfileData.fulfilled, (state, action) => {
      state.employeeProfileLoading = false;
      state.employeeProfile = action.payload;
      state.employeeProfileError = undefined;
    });
    builder.addCase(getEmployeeProfileData.rejected, (state, action) => {
      state.employeeProfileLoading = false;
      state.employeeProfile = [];
      state.employeeProfileError = action.payload;
    });
    builder.addCase(getCalendereventData.pending, state => {
      state.calendereventDataLoading = true;
    });
    builder.addCase(getCalendereventData.fulfilled, (state, action) => {
      state.calendereventDataLoading = false;
      state.calendereventData = action.payload;
      state.calendereventDataError = undefined;
    });
    builder.addCase(getCalendereventData.rejected, (state, action) => {
      state.calendereventDataLoading = false;
      state.calendereventData = [];
      state.calendereventDataError = action.payload;
    });
    builder.addCase(getAttendencaeData.pending, state => {
      state.attendenceDataPending = true;
    });
    builder.addCase(getAttendencaeData.fulfilled, (state, action) => {
      state.attendenceDataPending = false;
      state.attendenceData = action.payload;
      state.attendenceDataError = undefined;
    });
    builder.addCase(getAttendencaeData.rejected, (state, action) => {
      state.attendenceDataPending = false;
      state.attendenceData = [];
      state.attendenceDataError = action.payload;
    });
    // request lunch integration
    builder.addCase(requestLunchSubmission.pending, state => {
      state.requestLunchDataPending = true;
    });
    builder.addCase(requestLunchSubmission.fulfilled, (state, action) => {
      state.requestLunchDataPending = false;
      state.requestLunchData = action.payload;
      state.requestLunchDataError = undefined;
    });
    builder.addCase(requestLunchSubmission.rejected, (state, action) => {
      state.requestLunchDataPending = false;
      state.requestLunchData = [];
      state.requestLunchDataError = action.payload;
    });
  },
});

export default homeSlice.reducer;
export const {
  loadingStatus,
  modalStatus,
  dateOfModal,
  setRecentAppliedLeaves,
  setRemainingLeaves,
} = homeSlice.actions;
