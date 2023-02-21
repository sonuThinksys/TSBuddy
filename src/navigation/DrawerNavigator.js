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
import RequestLunch from 'screens/requestLunch/RequestLunch';
import UserDetail from 'component/useProfile/UserDetail';
import SalaryDetail from 'screens/salarySlip/SalaryDetail';
import SalaryPdf from 'screens/salarySlip/SalaryPdf';
const Drawer = createDrawerNavigator();

const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AttendenceStack = createNativeStackNavigator();
const HolidaysStack = createNativeStackNavigator();
const LeavesStack = createNativeStackNavigator();
const SalarySlipStack = createNativeStackNavigator();

const drawerOption = ({label, headerIconName, navigation}) => {
  console.log('naigation in draweroption:-------------------', navigation);

  return {
    label: () => <Text>{label}</Text>,
    headerShown: true,
    headerLeft: props => (
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Image
          source={MonthImages.DrwaerMenu}
          style={{height: 22, width: 22}}
        />
      </TouchableOpacity>
    ),
    headerStyle: {backgroundColor: Colors.darkBlue},
    headerTitle: () => (
      <TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            // backgroundColor: 'red',
          }}>
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
      <TouchableOpacity>
        <Header />
      </TouchableOpacity>
    ),
  };
};

const HomeStackScreen = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <HomeStack.Navigator
      initialRouteName="HomeDashboard"
      // screenOptions={() => {
      //   return {
      //     headerShown: false,
      //     // headerStyle: {backgroundColor: 'red'},
      //     // headerTintColor: 'white',
      //     // headerTitleStyle: {fontWeight: 'bold'},
      //   };
      // }}
      headerMode="none">
      <HomeStack.Screen
        name="home"
        component={Home}
        options={drawerOption({
          label: 'Home',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
        })}
        // options={{
        //   headerShown: true,
        //   headerLeft: () => {
        //     return <Text>fgfgdfgfdg</Text>;
        //   },
        // }}
      />
      <HomeStack.Screen
        name="RequestLunch"
        component={RequestLunch}
        options={{headerShown: false}}
        // options={drawerOption({
        //   label: 'Request Lunch',
        //   headerIconName: MonthImages.info_scopy,
        // })}
      />
      <HomeStack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="UserDetail"
        component={UserDetail}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

const AttendenceStackScreen = ({navigation}) => {
  return (
    <AttendenceStack.Navigator screenOptions={{headerShown: false}}>
      <AttendenceStack.Screen
        options={drawerOption({
          label: 'Attendence',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
        })}
        name="attendence"
        component={Attendence}
      />
    </AttendenceStack.Navigator>
  );
};

const ProfileStackScreen = ({navigation}) => {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
        options={drawerOption({
          label: 'Profile',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
        })}
        name="profile"
        component={Profile}
      />
    </ProfileStack.Navigator>
  );
};

const HolidaysStackScreen = ({navigation}) => {
  return (
    <HolidaysStack.Navigator screenOptions={{headerShown: false}}>
      <HolidaysStack.Screen
        options={drawerOption({
          label: 'Holidays',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
        })}
        name="holidays"
        component={Holidays}
      />
    </HolidaysStack.Navigator>
  );
};

const LeavesStackScreen = ({navigation}) => {
  return (
    <LeavesStack.Navigator screenOptions={{headerShown: false}}>
      <LeavesStack.Screen
        options={drawerOption({
          label: 'Leaves',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
        })}
        name="leaves"
        component={Leaves}
      />
    </LeavesStack.Navigator>
  );
};

const SalarySlipScreen = ({navigation}) => {
  return (
    <SalarySlipStack.Navigator screenOptions={{headerShown: false}}>
      <SalarySlipStack.Screen
        options={drawerOption({
          label: 'Salary Slip',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
        })}
        name="salarySlip"
        component={SalarySlip}
      />
      <SalarySlipStack.Screen
        name="SalaryDetail"
        component={SalaryDetail}
        options={{headerShown: false}}
      />
      <SalarySlipStack.Screen
        name="SalaryPdf"
        component={SalaryPdf}
        options={{headerShown: true}}
      />
    </SalarySlipStack.Navigator>
  );
};
const Logout = () => {
  return <Text>Logout</Text>;
};

function DrawerNavigator({navigation}) {
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
        headerShown: false,
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
        options={{
          headerShown: false,
        }}
        component={HomeStackScreen}
      />

      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      <Drawer.Screen name="Attendence" component={AttendenceStackScreen} />
      <Drawer.Screen name="Holidays" component={HolidaysStackScreen} />
      <Drawer.Screen name="Leaves" component={LeavesStackScreen} />
      <Drawer.Screen name="SalarySlip" component={SalarySlipScreen} />

      <Drawer.Screen name="logout" component={Logout} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
