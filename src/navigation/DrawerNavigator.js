import * as React from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
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
import CustomDrawer from './CustomDrawer';
import {Colors} from 'colors/Colors';
import Header from 'component/header/Header';
import UserProfile from 'component/useProfile/UserProfile';
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
      initialRouteName="Home"
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

function DrawerNavigator({navigation}) {
  const drawerOption = ({label, headerIconName}) => {
    return {
      label: ({label}) => <Text>{label}</Text>,

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
                marginRight: wp(2),
              }}>
              {label}
            </Text>
            {headerIconName ? (
              <Image source={headerIconName} style={{height: 20, width: 20}} />
            ) : null}
          </View>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Header />
        </TouchableOpacity>
      ),
    };
  };

  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#002147', //Set Drawer background
          width: wp(35),
          borderBottomWidth: 1,
          borderBottomColor: '#fff',
          // justifyContent: 'center',
          // alignItems: 'center',
          // paddingLeft: 0,
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

        activeTintColor: '#fff',
        itemStyle: {
          borderRadius: 0,
          marginVertical: 0,
          borderBottomWidth: 0.5,
          borderBottomColor: '#D09900',
        },
        drawerActiveBackgroundColor: Colors.lightBlue,
      }}>
      <Drawer.Screen
        name="Home"
        options={drawerOption({
          label: 'Home',
          headerIconName: MonthImages.info_scopy,
        })}
        component={HomeStackScreen}
      />

      <Drawer.Screen
        name="Profile"
        options={drawerOption({
          label: 'profile',
        })}
        component={ProfileStackScreen}
      />
      <Drawer.Screen
        name="Attendence"
        options={drawerOption({
          label: 'Attendence',
          headerIconName: MonthImages.info_scopy,
        })}
        component={AttendenceStackScreen}
      />
      <Drawer.Screen
        name="Holidays"
        options={drawerOption({
          label: 'Holidays',
        })}
        component={HolidaysStackScreen}
      />
      <Drawer.Screen
        name="Leaves"
        options={drawerOption({
          label: 'Leaves',
          headerIconName: MonthImages.info_scopy,
        })}
        component={LeavesStackScreen}
      />
      <Drawer.Screen
        name="SalarySlip"
        options={drawerOption({
          label: 'SalarySlip',
          headerIconName: MonthImages.info_scopy,
        })}
        component={SalarySlipScreen}
      />

      <Drawer.Screen name="logout" component={Logout} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
