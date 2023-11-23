//import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import 'react-native-gesture-handler';
import {AppRegistry, LogBox, Text, View} from 'react-native';

import React, {useLayoutEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import App from './App';
import {name as appName} from './app.json';
import {store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import SplashScreen from 'react-native-splash-screen';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
let persistor = persistStore(store);

const AppConfig = () => {
  useLayoutEffect(() => {
    SplashScreen.hide();
  }, []);

  // return <Text>Hello world!</Text>;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <SafeAreaProvider> */}
        <App />
        {/* </SafeAreaProvider> */}
      </PersistGate>
    </Provider>
  );

  // return (
  //   <Provider store={store}>
  //     <PersistGate loading={null} persistor={persistor}>
  //       <SafeAreaProvider>
  //         <ActionSheetProvider>
  //           <App />
  //         </ActionSheetProvider>
  //       </SafeAreaProvider>
  //     </PersistGate>
  //   </Provider>
  // );
};

//ReactNativeForegroundService.register();
AppRegistry.registerComponent(appName, () => AppConfig);
