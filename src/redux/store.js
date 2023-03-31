import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import loginSlice from 'Auth/LoginSlice';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import Reactotron from '../../ReactotronConfig';
import homeSlice from './homeSlice';
//import HomeSlice from 'screens/home/HomeSlice';

import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

const reducers = combineReducers({
  auth: loginSlice,
  home: homeSlice,
});

const persistConfig = {
  key: 'root',
  // devTools: process.env.NODE_ENV !== 'production',
  version: 1,
  storage: AsyncStorage,
  // whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

//const persistedReducer = persistReducer(persistConfig, reducers);
let configureStoreObj = {
  reducer: persistedReducer,
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
