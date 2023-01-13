// import React from 'react';
// import {Text} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {HOME_TAB_ROUTE} from './routes';
// import HomeActive from '../assets/mipmap/home_active.svg';
// import HomeInactive from '../assets/mipmap/home_inactive.svg';
// import HomeStackNavigator from './HomeStackNavigator';
// const Tab = createBottomTabNavigator();

// const TabNavigator = () => {
//   const renderTabTitle = (isFocused, tabName) => {
//     const color = isFocused ? 'blue' : 'gray';
//     const title = isFocused ? (
//       <Text style={{color}}> {tabName}</Text>
//     ) : (
//       <Text style={{color}}> {tabName}</Text>
//     );
//     return title;
//   };
//   return (
//     <Tab.Navigator
//       // screenOptions={{headerShown: false}}
//       initialRouteName="HOME_TAB_ROUTE"
//       screenOptions={({route}) => ({
//         unmountOnBlur: true,
//         headerShown: false,
//         tabBarStyle:
//           Platform.OS === 'android'
//             ? {
//                 height: hp(7),
//                 paddingBottom: hp(1),
//               }
//             : null,
//         tabBarHideOnKeyboard: true,
//       })}>
//       <Tab.Screen
//         name={HOME_TAB_ROUTE}
//         component={HomeStackNavigator}
//         // options={{
//         //   tabBarIcon: ({focused}) =>
//         //     focused ? <HomeActive /> : <HomeInactive />,
//         //   tabBarLabel: ({focused}) => {
//         //     return renderTabTitle(focused, 'Home');
//         //   },
//         // }}
//       />
//     </Tab.Navigator>
//   );
// };
// export default TabNavigator;
