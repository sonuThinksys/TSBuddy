import React from 'react';
import {StatusBar, SafeAreaView, Text, View} from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import {Colors} from 'colors/Colors';
import {useSelector} from 'react-redux';
var jwtDecode = require('jwt-decode');

const App = () => {
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: Colors.lightBlue}} />
      <MainNavigator />
    </>
  );
};

export default App;
