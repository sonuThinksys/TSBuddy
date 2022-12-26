import React from 'react';
import Home from '../screens/home/Home';
const {createNativeStackNavigator} = require('@react-navigation/native-stack');
const {HOME_SCREEN} = require('./routes');

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HOME_SCREEN}
        component={Home}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
}
