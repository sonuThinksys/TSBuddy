import React from 'react';
import {StatusBar, SafeAreaView, Text} from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import LeaveDetails from '/Users/thinksysuser/Desktop/TSBuddy-master/src/screens/leaves/LeaveDetails';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0073cf'}}>
      {/* <SafeAreaView style={{flex: 1}}> */}
      <StatusBar backgroundColor="#0073cf" barStyle="light-content" />
      <MainNavigator />
      {/* <LeaveDetails
        leaveCount={7}
        leaveType="Work From Home"
        status="Approved"
      /> */}
    </SafeAreaView>
  );
};

export default App;
