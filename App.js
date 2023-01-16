import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0073cf'}}>
      <StatusBar backgroundColor="#0073cf" barStyle="light-content" />
      <MainNavigator />
    </SafeAreaView>
  );
};

export default App;
