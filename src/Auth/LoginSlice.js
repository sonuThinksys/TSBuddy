import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import endPoints from '../config';
const initialState = {
  isLoggedIn: false,
  isAuthLoggedIn: false,
  isLoading: false,
  userToken: {},
  userTokenGettingError: false,
  userTokenGettingLoading: false,
};

export const getUserToken = createAsyncThunk(
  'auth/getuserToken',
  async formInput => {
    console.log('formInput:---------------------------------', formInput);
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
        console.log(
          'result:================================================',
          data,
        );
        const responsetoken = data.token;
        const {response = {}, status} = result || {};
        if (status === 200) {
          // await AsyncStorage.setItem('accessToken', response?.token);
          console.log(
            'response:---------------------------------------------------------',
            responsetoken,
          );
          return Promise.resolve(responsetoken);
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
  },
  extraReducers: builder => {
    builder.addCase(getUserToken.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getUserToken.fulfilled, (state, action) => {
      state.userToken = action.payload;
      console.log(
        'userToken:-----------------------------------------',
        state.userToken,
      );
      state.isLoading = false;
      state.isLoggedIn = true;
    });
    builder.addCase(getUserToken.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.error = action.error.message;
    });
  },
});
export default loginSlice.reducer;
export const {loginStatus, authLoginStatus} = loginSlice.actions;
