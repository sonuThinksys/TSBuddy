import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from 'screens/home/Home';
import Profile from 'screens/profile/Profile';
import ResourcesDetails from 'screens/Resources/ResourcesDetails';
import Resources from 'screens/Resources/Resources';
import jwt_decode from 'jwt-decode';

// import AttendenceTab from 'screens/Resources/AttendenceTab';

import Attendence from 'screens/attendence/Attendence';
import Holidays from 'screens/holidays/Holidays';
import Leaves from 'screens/leaves/Leaves';
import SalarySlip from 'screens/salarySlip/SalarySlip';
import {useDispatch, useSelector} from 'react-redux';
import CustomDrawer from './CustomDrawer';
import {Colors} from 'colors/Colors';
import Header from 'component/header/Header';
import UserProfile from 'component/useProfile/UserProfile';
import RequestLunch from 'screens/requestLunch/RequestLunch';
import UserDetail from 'component/useProfile/UserDetail';
import SalaryDetail from 'screens/salarySlip/SalaryDetail';
import ApplyLeave from 'screens/leaves/ApplyLeave';
import LeaveDetails from 'screens/leaves/LeaveDetails';
import SalaryPdf from 'screens/salarySlip/SalaryPdf';
import WorkFromHome from 'screens/workFromHome/WorkFromHome';

// plus.imageset
import {
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  AttendenceScreen,
  HolidaysScreen,
  LeavesScreen,
  SalarySlipTab,
  SalaryDetailsScreen,
  SalaryPDFDownloadScreen,
  RequestLunchScreen,
  LeaveApplyScreen,
  employeeProfileScreen,
  employeeDetailsScreen,
  LeaveDetailsScreen,
  ResourcesDetailsScreen,
  ResourcesScreen,
  CheckInOutScreen,
  WFHDetailsScreen,
  RegularzitionScreen,
} from './Route';
import {FontFamily, FontSize} from 'constants/fonts';
import AttaindanceDetails from 'screens/Resources/AttaindanceDetails';
import CheckInOut from 'screens/checkInOut/CheckInOut';
import {WorkFromHomeScreen} from './Route';

import MenuSVG from 'assets/newDashboardIcons/bars-sort.svg';
import WFHDetails from 'screens/workFromHome/WFhDetails';
import Regularization from 'screens/attendence/Regularization';
import CustomHeader from './CustomHeader';
import RegularisationScreen from 'screens/regularisation/RegularisationScreen';
import RegularisationFormDetails from 'screens/regularisation/RegularisationFormDetails';
import RegularisationTabDetails from 'screens/Resources/RegularisationTabDetails';

const Drawer = createDrawerNavigator();
const {plus: PlusIcon} = MonthImages;
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AttendenceStack = createNativeStackNavigator();
const HolidaysStack = createNativeStackNavigator();
const LeavesStack = createNativeStackNavigator();
const SalarySlipStack = createNativeStackNavigator();
const ResourcesStack = createNativeStackNavigator();
const CheckInOutStack = createNativeStackNavigator();
const WorkFromHomeStack = createNativeStackNavigator();
const RegularisationStack = createNativeStackNavigator();

const drawerOption = ({
  label,
  headerIconName,
  navigation,
  showDrawer = true,
  showHeaderRight = true,
  headerIcon,
  isHome = false,
  lunch,
}) => {
  return {
    headerTitleAlign: 'center',
    headerShown: lunch ? true : false,
    // headerTransparent: true,

    headerLeft: showDrawer
      ? () => (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <MenuSVG
              fill={isHome ? Colors.black : Colors.white}
              height={24}
              width={24}
            />
          </TouchableOpacity>
        )
      : null,
    headerStyle: {
      padding: 20,
      backgroundColor: isHome ? '#EEF2FA' : Colors.lighterBlue,
    },
    headerTintColor: Colors.purple,
    headerTitle: () => (
      // <TouchableOpacity>
      <View
        style={{
          // display: 'flex',
          flexDirection: 'row',
          // justifyContent: 'center',
          // alignItems: 'center',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}>
        {isHome ? (
          <Image
            source={MonthImages.TRMSIcon}
            style={{width: 108, height: 40}}
          />
        ) : (
          <Text
            style={{
              color: Colors.white,
              fontSize: 18,
              fontFamily: FontFamily.RobotoMedium,
            }}>
            {label}
          </Text>
        )}
        {/* <Text>TRMS</Text> */}

        {headerIcon && (
          <Image
            source={headerIcon}
            fill={isHome ? Colors.black : Colors.white}
            style={{height: 22, width: 22}}
          />
        )}
      </View>
      // </TouchableOpacity>
    ),
    headerRight: showHeaderRight
      ? () => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Header isHome={isHome} />
          </View>
        )
      : null,
  };
};

const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator initialRouteName="HomeDashboard" headerMode="none">
      <HomeStack.Screen
        name={HomeScreen}
        component={Home}
        options={drawerOption({
          label: 'trms',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
          headerIcon: false,
          isHome: true,
        })}
      />
      <HomeStack.Screen
        name={RequestLunchScreen}
        component={RequestLunch}
        options={{headerShown: false}}
        // options={props => {
        //   // return drawerOption({
        //   //   label: 'Request Lunch',
        //   //   headerIconName: MonthImages.info_scopy,
        //   //   lunch: true,
        //   //   ...props,
        //   // });

        // }}
      />
      <HomeStack.Screen
        name={employeeProfileScreen}
        component={UserProfile}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="UserDetail"
        component={UserDetail}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        options={{headerShown: false}}
        name={'LeaveApplyScreen'}
        component={ApplyLeave}
      />
    </HomeStack.Navigator>
  );
};

const WorkFromHomeStackScreen = ({navigation}) => {
  return (
    <WorkFromHomeStack.Navigator>
      <WorkFromHomeStack.Screen
        options={drawerOption({
          label: 'Work From Home',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
          headerIcon: MonthImages.info_scopy,
        })}
        name={WorkFromHomeScreen}
        component={WorkFromHome}
      />
      <WorkFromHomeStack.Screen
        options={() => ({
          headerShown: false,
        })}
        name={WFHDetailsScreen}
        component={WFHDetails}
      />
      <WorkFromHomeStack.Screen
        options={({navigation}) => ({
          headerShown: false,
        })}
        name={'workFromHomeLeaveDetailsScreen'}
        component={LeaveDetails}
      />
      <WorkFromHomeStack.Screen
        options={() => ({
          headerShown: false,
        })}
        name={'workFromHomeLeaveApplyScreenOpen'}
        component={ApplyLeave}
      />
    </WorkFromHomeStack.Navigator>
  );
};

const AttendenceStackScreen = ({navigation}) => {
  return (
    <AttendenceStack.Navigator screenOptions={{headerShown: false}}>
      <AttendenceStack.Screen
        options={{headerShown: false}}
        name={AttendenceScreen}
        component={Attendence}
      />
      <AttendenceStack.Screen
        options={drawerOption({
          headerShown: false,
        })}
        name={RegularzitionScreen}
        component={Regularization}
      />
    </AttendenceStack.Navigator>
  );
};

const ProfileStackScreen = ({navigation}) => {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
        options={{headerShown: false}}
        name={ProfileScreen}
        component={Profile}
      />
    </ProfileStack.Navigator>
  );
};

const RegularisationStackScreen = ({navigation}) => {
  return (
    <RegularisationStack.Navigator>
      <RegularisationStack.Screen
        options={{headerShown: false}}
        name={'Resource List screen'}
        component={RegularisationScreen}
      />
      <RegularisationStack.Screen
        options={{headerShown: false}}
        name={'RegularisationForm'}
        component={RegularisationFormDetails}
      />
      <RegularisationStack.Screen
        options={{headerShown: false}}
        name={'regularisationTabDetailsScreen'}
        component={RegularisationTabDetails}
      />
    </RegularisationStack.Navigator>
  );
};

const HolidaysStackScreen = ({navigation}) => {
  return (
    <HolidaysStack.Navigator
      initialRouteName={HolidaysScreen}
      screenOptions={{headerShown: false}}>
      <HolidaysStack.Screen
        options={{headerShown: false}}
        name={HolidaysScreen}
        component={Holidays}
      />
    </HolidaysStack.Navigator>
  );
};

const LeavesStackScreen = ({}) => {
  return (
    <LeavesStack.Navigator
      initialRouteName="LeavesScreeen"
      screenOptions={{headerShown: false}}>
      <LeavesStack.Screen
        options={{headerShown: false}}
        name={LeavesScreen}
        component={Leaves}
      />
      <LeavesStack.Screen
        options={{headerShown: false}}
        name={LeaveDetailsScreen}
        component={LeaveDetails}
      />
      <LeavesStack.Screen
        options={{headerShown: false}}
        name={LeaveApplyScreen}
        component={ApplyLeave}
      />
    </LeavesStack.Navigator>
  );
};

const SalarySlipScreen = ({navigation}) => {
  return (
    <SalarySlipStack.Navigator screenOptions={{headerShown: false}}>
      <SalarySlipStack.Screen
        options={{headerShown: false}}
        name={SalarySlipTab}
        component={SalarySlip}
      />
      <SalarySlipStack.Screen
        name={SalaryDetailsScreen}
        component={SalaryDetail}
        options={{headerShown: false}}
      />
      <SalarySlipStack.Screen
        name={SalaryPDFDownloadScreen}
        component={SalaryPdf}
        options={{headerShown: false}}
      />
    </SalarySlipStack.Navigator>
  );
};

const ResourcesStackScreen = ({navigation}) => {
  return (
    <ResourcesStack.Navigator initialRouteName={ResourcesScreen}>
      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={ResourcesScreen}
        component={Resources}
      />

      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={ResourcesDetailsScreen}
        component={ResourcesDetails}
      />

      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={LeaveDetailsScreen}
        component={LeaveDetails}
      />

      <ResourcesStack.Screen
        options={drawerOption({
          label: 'Apply Leave',
          showDrawer: false,
          showHeaderRight: false,
          navigation: navigation,
        })}
        name={LeaveApplyScreen}
        component={ApplyLeave}
      />

      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={'workFromHomeLeaveDetailsScreen'}
        component={LeaveDetails}
      />
      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={'workFromHomeLeaveApplyScreenOpen'}
        component={ApplyLeave}
      />

      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={'regularisationTabDetailsScreen'}
        component={RegularisationTabDetails}
      />

      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={'attaindanceDetailsScreen'}
        component={AttaindanceDetails}
      />
    </ResourcesStack.Navigator>
  );
};

const CheckInOutStackScreen = ({navigation}) => {
  return (
    <CheckInOutStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={CheckInOutScreen}>
      <CheckInOutStack.Screen
        options={{headerShown: false}}
        name={CheckInOutScreen}
        component={CheckInOut}
      />
    </CheckInOutStack.Navigator>
  );
};

const Logout = () => {
  return <Text>Logout</Text>;
};

function DrawerNavigator({navigation}) {
  const {userToken: token} = useSelector(state => state.auth);
  const decoded = token && jwt_decode(token);
  const isLeaveApprover = decoded?.role?.includes('Leave Approver') || false;

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: Colors.lightBlue,
          width: wp(35),
          borderBottomWidth: 1,
          borderBottomColor: Colors.white,
        },
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.darkBlue,
          height: 55,
        },
        headerTintColor: Colors.white, //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },

        activeTintColor: Colors.white,
        itemStyle: {
          borderRadius: 0,
          marginVertical: 0,
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.yellowishOrange,
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

      {isLeaveApprover ? (
        <Drawer.Screen name="Resources" component={ResourcesStackScreen} />
      ) : null}

      {isLeaveApprover ? (
        <Drawer.Screen
          name="WorkFromHome"
          component={WorkFromHomeStackScreen}
        />
      ) : null}

      {isLeaveApprover ? (
        <Drawer.Screen
          name="RegularisationFormScreen"
          component={RegularisationStackScreen}
        />
      ) : null}

      {/* <Drawer.Screen name="CheckInOut" component={CheckInOutStackScreen} /> */}

      <Drawer.Screen name="Attendence" component={AttendenceStackScreen} />
      <Drawer.Screen name="Leaves" component={LeavesStackScreen} />
      <Drawer.Screen name="Holidays" component={HolidaysStackScreen} />

      <Drawer.Screen name="Salary Slip" component={SalarySlipScreen} />

      <Drawer.Screen name="logout" component={Logout} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
  newLeaveText: {
    color: Colors.white,
    borderRadius: 6,
    borderWidth: 0.6,
    borderColor: Colors.white,
    fontFamily: FontFamily.RobotoBold,
    fontSize: FontSize.h15,
    paddingHorizontal: 4,
    marginRight: wp(4),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
  },
});
