import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';

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
          const {data} = response || {};

          return Promise.reject(new Error(data?.message));
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
    loginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    authLoginStatus: (state, action) => {
      state.isAuthLoggedIn = action.payload;
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
export const {loginStatus, authLoginStatus, guestLoginStatus} =
  loginSlice.actions;
