import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  const isLoggedIn = false;
  return (
    <NavigationContainer
    // ref={(ref) => NavigationService.setTopLevelNavigator(ref)}
    >
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="MainRoute"
          component={isLoggedIn ? TabNavigator : AuthNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
