import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
const jwtDecode = require('jwt-decode');

import endPoints from '../config';
import {INVALID_CREDENTIAL} from 'utils/string';
const initialState = {
  isLoggedIn: false,
  isAuthLoggedIn: false,
  isLoading: false,
  userToken: '',
  refreshToken: '',
  userTokenGettingError: false,
  userTokenGettingLoading: false,
  formInput: {},
  employeeDetails: {},
  isRemember: false,
  bioMetricEnable: false,
  isGuestLogin: false,
};

export const getUserToken = createAsyncThunk(
  'auth/getuserToken',
  async formInput => {
    const LoginUrl = endPoints.authTokenAPI;

    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      url: LoginUrl,
      data: formInput,
    };
    return axios(config)
      .then(async result => {
        let data = result.data;
        console.log('data:', data, result);

        const {response = {}, status} = result || {};
        if (status === 200) {
          return Promise.resolve({data, formInput});
        } else if (status === 401) {
          return Promise.reject(INVALID_CREDENTIAL);
        } else {
          return Promise.reject(result.response);
          // return Promise.reject(data);
        }
      })
      .catch(err => {
        return Promise.reject(err?.response);
      });
  },
);

// export const renewToken = createAsyncThunk(
//   'home/renewToken',
//   async ({refreshToken}) => {
//     console.log('refreshToken', refreshToken);
//     try {
//       const url = endPoints.renewToken;

//       const config = {
//         method: 'post',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         url: url,
//         data: {token: refreshToken},
//       };

//       console.log('config', config);
//       return axios(config)
//         .then(result => {
//           let data = result.payload.data;

//           const {response = {}, status} = result || {};
//           if (status === 200) {
//             return Promise.resolve(data);
//           } else if (status === 400 || status === 401) {
//             return Promise.reject(result.response);
//           } else {
//             return Promise.reject(result.response);
//             // return Promise.reject(data);
//           }
//         })
//         .catch(err => {
//           return Promise.reject({err, status: err?.response?.status});
//         });
//     } catch (err) {
//       return Promise.reject(new Error(err));
//     }
//   },
// );

export const renewToken = createAsyncThunk(
  'auth/renewToken',
  async ({token}) => {
    const url = endPoints.renewToken;
    var config = {
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {token},
    };
    return axios(config)
      .then(async response => {
        const {data, status} = response;
        if (status == 200) {
          return Promise.resolve(data);
        }
      })
      .catch(err => {
        return Promise.reject(new Error(err));
      });
  },
);

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state, action) => initialState,
    loginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    authLoginStatus: (state, action) => {
      state.isAuthLoggedIn = action.payload;
    },
    setIsRemeber: (state, action) => {
      state.isRemember = action.payload;
    },
    setBiometricEnable: (state, action) => {
      state.bioMetricEnable = action.payload;
    },
    guestLoginStatus: (state, action) => {
      state.isLoggedIn = true;
      state.isGuestLogin = action.payload;
      state.isLoading = false;
    },
    logInSucess: (state, action) => {
      state.isLoggedIn = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserToken.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(getUserToken.fulfilled, (state, action) => {
      state.userToken = action?.payload?.data?.token;
      state.refreshToken = action?.payload?.data?.refreshToken;
      state.formInput = action?.payload?.formInput;
      const decodedData = jwtDecode(state?.userToken);
      state.employeeDetails = decodedData;
      state.isLoading = false;
      state.isLoggedIn = true;
      state.isGuestLogin = false;
    });

    builder.addCase(getUserToken.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.error = action.error.message;
    });

    builder.addCase(renewToken.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(renewToken.fulfilled, (state, action) => {
      state.userToken = action?.payload?.token;
      const decodedData = jwtDecode(state?.userToken);
      state.employeeDetails = decodedData;
      state.isLoading = false;
      state.isLoggedIn = true;
      state.isGuestLogin = false;
    });
    builder.addCase(renewToken.rejected, (state, action) => {
      state.error = action?.error?.message;
      state.isLoggedIn = false;
    });
  },
});
export default loginSlice.reducer;
export const {
  loginStatus,
  authLoginStatus,
  setIsRemeber,
  logOut,
  setBiometricEnable,
  guestLoginStatus,
  logInSucess,
} = loginSlice.actions;
