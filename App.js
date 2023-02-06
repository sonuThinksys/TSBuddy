import React from 'react';
import {StatusBar, SafeAreaView, Text, View} from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import LeaveDetails from '/Users/thinksysuser/Desktop/TSBuddy-master/src/screens/leaves/LeaveDetails';

const App = () => {
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#0073cf'}} />
      {/* <SafeAreaView style={{flex: 1}}> */}
      <MainNavigator />
      {/* </SafeAreaView> */}
    </>
  );
};

export default App;
