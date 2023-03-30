import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {employeeData} from '../../db';
import {holidayDatawithImage} from '../../db';
import {salaryData} from '../../slaryData';
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
  menuFeedback: [],
  menuFeedbackLoading: false,
  menuFeedbackError: null,
  dailyMenuID: '',
  userFeedback: [],
};

const breakfast = 'breakfast';
const lunch = 'lunch';
const snacks = 'snacks';

// =============================================

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
);

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

    try {
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
          return Promise.resolve({data: response.data, type, isLike, index});
        })
        .catch(error => {
          console.error(error);
        });
    } catch (err) {}
  },
);

// export const applyLeave = createAsyncThunk('home/applyLeave', async token => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   return axios(config)
//     .then(async response => {
//       const {data, status} = response;
//       if (status === 200) {
//         return Promise.resolve(data);
//       } else {
//         return Promise.reject(new Error('Something Went Wrong.'));
//       }
//     })
//     .catch(err => {
//       let statusCode = 500;
//       if (err?.response) {
//         statusCode = err?.response.status;
//       }
//       if (statusCode == 401) {
//         return Promise.reject(err?.response?.data?.message);
//       } else {
//         return Promise.reject(new Error(err));
//       }
//     });
// });

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
      console.log('err:', err);
    }
  },
);
// =============================================

// ============================================================================================

// your userSlice with other reducers

export const getTodayMenuDetails = createAsyncThunk(
  'home/getTodayMenuDetails',
  async token => {
    var config = {
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

// ============================================================================================

export const getHolidaysData = createAsyncThunk(
  'home/holidayData',
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
          return Promise.reject(err?.response?.data[0]?.message);
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
  async token => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const allEmployees = await axios.get(endPoints.getAllEmployees, config);

      return Promise.resolve(allEmployees.data);
    } catch (err) {
      console.log('err:', err);
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
      console.log('formInput:-----------------------------', formInput);
      const url = endPoints.requestLunchApi;
      console.log('url:----------------------------------', url);
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
        console.log('data in request lunch:---------------------', result);
        const {data = {}, status} = result || {};

        if (status === 200) {
          return Promise.resolve({data, formInput});
        } else {
          return Promise.reject('something went wrong');
        }
      });
    } catch (err) {
      console.log('error:----', err);
      // return Promise.reject(new Error(err));
    }
  },
);

const homeSlice = createSlice({
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
          totalLikes: 0,
          totalDislikes: 0,
        },
        {
          type: lunch,
          feedback: lunchRating,
          totalLikes: 0,
          totalDislikes: 0,
        },
        {
          type: snacks,
          feedback: snacksRating,
          totalLikes: 0,
          totalDislikes: 0,
        },
      ];

      state.userFeedback = feedbackArray;
    });

    builder.addCase(giveMenuFeedback.fulfilled, (state, action) => {
      // console.log('actionData:', action.payload);
      const feedbackArray = [...state.userFeedback];

      feedbackArray[action.payload.index].feedback = action.payload.isLike
        ? 1
        : 0;

      state.userFeedback = feedbackArray;
    });
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

    builder.addCase(getMenuFeedback.pending, state => {
      state.menuFeedbackLoading = true;
    });
    builder.addCase(getMenuFeedback.rejected, (state, action) => {
      state.menuFeedbackLoading = false;
      state.menuFeedbackError = action.payload;
      state.menuFeedback = [];
    });
    builder.addCase(getMenuFeedback.fulfilled, (state, action) => {
      state.menuFeedbackLoading = false;
      state.menuFeedbackError = null;

      const totalFeedbackArray = [
        {
          likes: action.payload.totalBreakfastlikes,
          dislikes: action.payload.totalBreakfastdislikes,
        },
        {
          likes: action.payload.totalLunchlikes,
          dislikes: action.payload.totalLunchdislikes,
        },
        {
          likes: action.payload.totalMeallikes,
          dislikes: action.payload.totalMealdislikes,
        },
      ];

      state.menuFeedback = totalFeedbackArray;
    });

    builder.addCase(getTodayMenuDetails.pending, state => {
      state.menuDetailsLoading = true;
    });

    builder.addCase(getTodayMenuDetails.fulfilled, (state, action) => {
      state.menuDetailsLoading = false;
      state.foodMenuDatailsError = undefined;
      const totalFoodArr = [
        {
          type: breakfast,
          food: action.payload.foodMenus[0]?.breakfast,
          img_url: MonthImages.breakfastImgS,
        },
        {
          type: lunch,
          food: action.payload.foodMenus[0]?.lunch,
          img_url: MonthImages.Lunch,
        },
        {
          type: snacks,
          food: action.payload.foodMenus[0]?.eveningSnack,
          img_url: MonthImages.snacksS,
        },
      ];

      const data = {...action.payload, foodMenus: totalFoodArr};
      state.dailyMenuID = action.payload.foodMenus[0]?.dailyMenuId || '';
      state.leaveMenuDetails = data;
    });

    builder.addCase(getTodayMenuDetails.rejected, (state, action) => {
      state.menuDetailsLoading = false;
      state.leaveMenuDetails = [];
      state.foodMenuDatailsError = action.payload;
    });

    builder.addCase(getLeaveDetails.pending, (state, action) => {
      state.isLeaveDataLoading = true;
    });
    builder.addCase(getLeaveDetails.fulfilled, (state, action) => {
      state.isLeaveDataLoading = false;
      // const dataWithId = action.payload.map(item => ({...item, id: uuidv4()}));

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
