import * as React from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Icon} from 'react-native-vector-icons/Ionicons';
import Home from 'screens/home/Home';
import Profile from 'screens/profile/Profile';
import Attendence from 'screens/attendence/Attendence';
import Holidays from 'screens/holidays/Holidays';
import Leaves from 'screens/leaves/Leaves';
import SalarySlip from 'screens/salarySlip/SalarySlip';
import {loginStatus} from 'Auth/LoginSlice';
import {useDispatch} from 'react-redux';
import UpComingHolidays from 'component/upComingHolidays/UpComingHolidays';
const Drawer = createDrawerNavigator();

const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AttendenceStack = createNativeStackNavigator();
const HolidaysStack = createNativeStackNavigator();
const LeavesStack = createNativeStackNavigator();
const SalarySlipStack = createNativeStackNavigator();

const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator
      // initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerStyle: {backgroundColor: 'red'},
        headerTintColor: 'white',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <HomeStack.Screen
        name="home"
        component={Home}
        options={{
          title: 'overview',
          // headerLeft: () => (
          //   <Icon.Button
          //     name="ios-menu"
          //     size={25}
          //     backgroundColor="pink"
          //     onPress={() => navigation.openDrawer()}></Icon.Button>
          // ),
        }}
      />
    </HomeStack.Navigator>
  );
};

const AttendenceStackScreen = ({navigation}) => {
  return (
    <AttendenceStack.Navigator
      //  initialRouteName="Attendence"
      screenOptions={{headerShown: false}}>
      <AttendenceStack.Screen name="attendence" component={Attendence} />
      {/* <Stack.Screen name="Holidays" component={Holidays} /> */}
    </AttendenceStack.Navigator>
  );
};
const ProfileStackScreen = ({navigation}) => {
  return (
    <ProfileStack.Navigator
      //  initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

const HolidaysStackScreen = ({navigation}) => {
  return (
    <HolidaysStack.Navigator
      // initialRouteName="Holidays"
      screenOptions={{headerShown: false}}>
      <HolidaysStack.Screen name="holidays" component={Holidays} />
      {/* <Stack.Screen name="Leaves" component={Leaves} /> */}
    </HolidaysStack.Navigator>
  );
};

const LeavesStackScreen = ({navigation}) => {
  return (
    <LeavesStack.Navigator
      //  initialRouteName="Leaves"
      screenOptions={{headerShown: false}}>
      <LeavesStack.Screen name="leaves" component={Leaves} />
      {/* <Stack.Screen name="SalarySlip" component={SalarySlip} /> */}
    </LeavesStack.Navigator>
  );
};

const SalarySlipScreen = ({navigation}) => {
  return (
    <SalarySlipStack.Navigator
      //  initialRouteName="SalarySlip"
      screenOptions={{headerShown: false}}>
      <SalarySlipStack.Screen name="salarySlip" component={SalarySlip} />
      {/* <Stack.Screen name="SalarySlip" component={SalarySlip} /> */}
    </SalarySlipStack.Navigator>
  );
};
const Logout = () => {
  return <Text>Logout</Text>;
};

function DrawerNavigator() {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      // drawerContentOptions={{
      //   activeTintColor: 'black' /* font color for active screen label */,
      //   activeBackgroundColor: 'black' /* bg color for active screen */,
      //   inactiveTintColor:
      //     'black' /* Font color for inactive screens' labels */,
      // }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#002147', //Set Drawer background
          width: wp(36),
          paddingHorizontal: wp(2),
          borderBottomWidth: 1,
          borderColor: 'white',
          //height: 40,
          //Set Drawer width
        },
        headerStyle: {
          backgroundColor: '#1b5583',
          height: 55,

          //Set Header color
        },
        headerTintColor: 'white', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
        // headerLeft: ({navigation}) => (
        //   <TouchableOpacity
        //     onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        //     <Image
        //       source={searchIconwhite}
        //       style={{height: 25, width: 25, marginRight: 20, color: 'white'}}
        //     />
        //   </TouchableOpacity>
        // ),
      }}>
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: '',

          drawerIcon: ({tintColor}) => (
            <View>
              <Image
                source={MonthImages.HomeImage}
                style={{height: 50, width: 50}}
              />
              <Text
                style={{
                  color: 'white',
                  paddingTop: hp(1),
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Home
              </Text>
            </View>
          ),

          // title: 'Home',
          //  icon: <Image source={LoginLock} style={{height: 30, width: 30}} />,

          headerTitle: () => (
            <TouchableOpacity>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    marginLeft: Platform.OS === 'ios' ? 0.1 : wp(25),
                    //paddingTop: hp(0.5),
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Home
                </Text>
                <Image
                  source={MonthImages.info_scopy}
                  style={{height: 20, width: 20}}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={MonthImages.searchIconwhite}
                style={{
                  height: 25,
                  width: 25,
                  marginRight: wp(5),
                  color: 'white',
                }}
              />
            </TouchableOpacity>
          ),
        }}
        component={HomeStackScreen}
      />

      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: '',
          title: 'Profile',
          drawerIcon: ({tintColor}) => (
            <View>
              <Image
                source={MonthImages.ProfileIcon}
                style={{height: 60, width: 60}}
              />
              <Text
                style={{
                  color: 'white',
                  paddingTop: hp(1),
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Profile
              </Text>
            </View>
          ),

          headerTitle: () => (
            <TouchableOpacity>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    marginLeft: Platform.OS === 'ios' ? 0.1 : wp(25),
                    //paddingTop: hp(0.5),
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Profile
                </Text>
                <Image
                  source={MonthImages.info_scopy}
                  style={{height: 20, width: 20}}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={MonthImages.searchIconwhite}
                style={{height: 25, width: 25, marginRight: 20, color: 'white'}}
              />
            </TouchableOpacity>
          ),
        }}
        component={ProfileStackScreen}
      />
      <Drawer.Screen
        name="Attendence"
        options={{
          drawerLabel: '',
          title: 'Attendence',
          drawerIcon: ({tintColor}) => (
            <View>
              <Image
                source={MonthImages.AttendanceDrawer}
                // style={[styles.icon, { tintColor: tintColor }]}
                style={{height: 50, width: 50}}
              />
              <Text
                style={{
                  color: 'white',
                  paddingTop: hp(1),
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Attendence
              </Text>
            </View>
          ),

          headerTitle: () => (
            <TouchableOpacity>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    marginLeft: Platform.OS === 'ios' ? 0.1 : wp(25),
                    //paddingTop: hp(0.5),
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Attendence
                </Text>
                <Image
                  source={MonthImages.info_scopy}
                  style={{height: 20, width: 20}}
                />
              </View>
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={MonthImages.searchIconwhite}
                style={{height: 25, width: 25, marginRight: 20, color: 'white'}}
              />
            </TouchableOpacity>
          ),
        }}
        component={AttendenceStackScreen}
      />
      <Drawer.Screen
        name="Holidays"
        options={{
          drawerLabel: '',
          title: 'Holidays',
          drawerIcon: ({tintColor}) => (
            <View>
              <Image
                source={MonthImages.HolidaysIcon}
                // style={[styles.icon, { tintColor: tintColor }]}
                style={{height: 50, width: 50}}
              />
              <Text
                style={{
                  color: 'white',
                  paddingTop: hp(1),
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Holidays
              </Text>
            </View>
          ),

          headerTitle: () => (
            <TouchableOpacity>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    marginLeft: Platform.OS === 'ios' ? 0.1 : wp(25),
                    //paddingTop: hp(0.5),
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Holiday
                </Text>
                <Image
                  source={MonthImages.info_scopy}
                  style={{height: 20, width: 20}}
                />
              </View>
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={MonthImages.searchIconwhite}
                style={{height: 25, width: 25, marginRight: 20, color: 'white'}}
              />
            </TouchableOpacity>
          ),
        }}
        component={HolidaysStackScreen}
      />
      <Drawer.Screen
        name="Leaves"
        options={{
          drawerLabel: '',
          title: 'Leaves',
          drawerIcon: ({tintColor}) => (
            <View>
              <Image
                source={MonthImages.leavesImage}
                // style={[styles.icon, { tintColor: tintColor }]}
                style={{height: 50, width: 50}}
              />
              <Text
                style={{
                  color: 'white',
                  paddingTop: hp(1),
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Leaves
              </Text>
            </View>
          ),

          headerTitle: () => (
            <TouchableOpacity>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    marginLeft: Platform.OS === 'ios' ? 0.1 : wp(25),
                    //paddingTop: hp(0.5),
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Leave
                </Text>
                <Image
                  source={MonthImages.info_scopy}
                  style={{height: 20, width: 20}}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={MonthImages.searchIconwhite}
                style={{height: 25, width: 25, marginRight: 20, color: 'white'}}
              />
            </TouchableOpacity>
          ),
        }}
        component={LeavesStackScreen}
      />
      <Drawer.Screen
        name="SalarySlip"
        options={{
          drawerLabel: '',
          title: 'SalarySlip',
          drawerIcon: ({tintColor}) => (
            <View>
              <Image
                source={MonthImages.salarySlipIcon}
                // style={[styles.icon, { tintColor: tintColor }]}
                style={{height: 50, width: 50}}
              />
              <Text
                style={{
                  color: 'white',
                  paddingTop: hp(1),
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                SalarySlip
              </Text>
            </View>
          ),

          headerTitle: () => (
            <TouchableOpacity>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    marginLeft: Platform.OS === 'ios' ? 0.1 : wp(25),
                    //paddingTop: hp(0.5),
                    //textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  SalarySlip
                </Text>
                <Image
                  source={MonthImages.info_scopy}
                  style={{height: 20, width: 20}}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={MonthImages.searchIconwhite}
                style={{height: 25, width: 25, marginRight: 20, color: 'white'}}
              />
            </TouchableOpacity>
          ),
        }}
        component={SalarySlipScreen}
      />

      <Drawer.Screen
        name="logout"
        options={{
          drawerLabel: '',
          title: 'Logout',
          drawerIcon: ({tintColor}) => (
            <View>
              <TouchableOpacity onPress={() => dispatch(loginStatus(false))}>
                <Image
                  source={MonthImages.logoutmenuS}
                  // style={[styles.icon, { tintColor: tintColor }]}
                  style={{height: 50, width: 50}}
                />
                <Text
                  style={{
                    color: 'white',
                    paddingTop: hp(1),
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={MonthImages.searchIconwhite}
                style={{height: 25, width: 25, marginRight: 20, color: 'white'}}
              />
            </TouchableOpacity>
          ),
        }}
        component={Logout}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
