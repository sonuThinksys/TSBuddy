import {configureStore} from '@reduxjs/toolkit';
import loginSlice from 'Auth/LoginSlice';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import Reactotron from '../../ReactotronConfig';
import dataSlice from './dataSlice';
//import HomeSlice from 'screens/home/HomeSlice';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const reducers = combineReducers({
  auth: loginSlice,
  dataReducer: dataSlice,
});

const persistConfig = {
  key: 'root',
  // devTools: process.env.NODE_ENV !== 'production',
  version: 1,
  storage: AsyncStorage,
};

//const persistedReducer = persistReducer(persistConfig, reducers);
let configureStoreObj = {
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }).concat(logger),
};

if (__DEV__) {
  configureStoreObj = {
    ...configureStoreObj,
    enhancers: [Reactotron.createEnhancer()],
  };
}
export const store = configureStore(configureStoreObj);
