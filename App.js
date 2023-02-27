import React from 'react';
import {SafeAreaView} from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import {Colors} from 'colors/Colors';
import reactotron from 'reactotron-react-native';
var jwtDecode = require('jwt-decode');

const App = () => {
  if (__DEV__) {
    const yeOldeConsoleLog = console.log;
    console.log = (...args) => {
      yeOldeConsoleLog(...args);
      reactotron.display({
        name: 'CONSOLE.LOG',
        value: args,
        preview:
          args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
      });
    };
  }
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: Colors.lightBlue}} />
      <MainNavigator />
    </>
  );
};

export default App;
