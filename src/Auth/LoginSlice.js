import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
const jwtDecode = require('jwt-decode');

import endPoints from '../config';
const initialState = {
  isLoggedIn: false,
  isAuthLoggedIn: false,
  isLoading: false,
  userToken: {},
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
    try {
      const LoginUrl = endPoints.authTokenAPI;
      return fetch(LoginUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formInput),
      }).then(async result => {
        let data = await result.json();

        const responsetoken = data.token;
        const {response = {}, status} = result || {};
        if (status === 200) {
          // await AsyncStorage.setItem('accessToken', response?.token);
          // const username = formInput.username;
          // const password = formInput.password;

          // Store the credentials
          // await Keychain.setGenericPassword(username, password);

          return Promise.resolve({data, formInput});
        } else {
          return Promise.reject(data);
        }
      });
    } catch (err) {
      return Promise.reject(new Error(err));
    }
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
      state.isLoggedIn = action.payload;
      state.isGuestLogin = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserToken.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getUserToken.fulfilled, (state, action) => {
      state.userToken = action.payload.data.token;
      state.formInput = action.payload.formInput;
      const decodedData = jwtDecode(state.userToken);
      state.employeeDetails = decodedData;
      state.isLoading = false;
      state.isLoggedIn = true;
      state.isGuestLogin = false;
    });
    builder.addCase(getUserToken.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.error = action.error.message;
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
} = loginSlice.actions;
