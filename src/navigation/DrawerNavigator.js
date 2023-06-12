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
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
import MenuSVG from 'assets/newDashboardIcons/bars-sort.svg';
import {WorkFromHomeScreen} from './Route';
import WFHDetails from 'screens/workFromHome/WFhDetails';
import Regularization from 'screens/attendence/Regularization';

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

const drawerOption = ({
  label,
  headerIconName,
  navigation,
  showDrawer = true,
  showHeaderRight = true,
  headerIcon,
  isHome = false,
}) => {
  return {
    headerShown: true,
    // headerTransparent: true,
    headerTitleAlign: 'center',

    headerLeft: showDrawer
      ? () => (
          <TouchableOpacity
            // style={{}}
            onPress={() => {
              navigation.openDrawer();
            }}>
            {/* <Image
              source={MonthImages.DrwaerMenu}
              style={{height: 22, width: 22}}
            /> */}
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

  // return {
  //   label: () => <Text>{label}</Text>,
  //   headerShown: true,
  //   headerLeft: showDrawer
  //     ? props => (
  //         <TouchableOpacity
  //           onPress={() => {
  //             navigation.openDrawer();
  //           }}>
  //           <Image
  //             source={MonthImages.DrwaerMenu}
  //             style={{height: 22, width: 22}}
  //           />
  //         </TouchableOpacity>
  //       )
  //     : null,
  //   headerStyle: {backgroundColor: Colors.darkBlue},
  //   headerTintColor: Colors.white,
  //   headerTitle: () => (
  //     // <TouchableOpacity>
  //     <View
  //       style={{
  //         display: 'flex',
  //         flexDirection: 'row',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       <Text
  //         disabled={true}
  //         style={{
  //           color: Colors.white,
  //           textAlign: 'center',
  //           marginLeft:
  //             Platform.OS === 'ios' ? 0.1 : !showDrawer ? wp(20) : wp(32),
  //           //paddingTop: hp(0.5),
  //           fontSize: 16,
  //           // fontWeight: 'bold',
  //           marginRight: wp(2),
  //           // marginLeft: wp(25),
  //           fontFamily: FontFamily.RobotoRegular,
  //         }}>
  //         {label}
  //       </Text>
  //       {headerIcon && (
  //         <Image source={headerIcon} style={{height: 22, width: 22}} />
  //       )}
  //     </View>
  //     // </TouchableOpacity>
  //   ),
  //   headerRight: showHeaderRight
  //     ? () => (
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //           }}>
  //           {fromLeave && (
  //             <Pressable
  //               style={{
  //                 ...styles.newLeaveText,
  //                 flexDirection: 'row',
  //                 justifyContent: 'center',
  //                 alignItems: 'center',
  //               }}
  //               onPress={() => {
  //                 navigation.navigate('LeaveApplyScreen');
  //               }}>
  //               <Image
  //                 source={MonthImages.plus}
  //                 style={{height: 15, width: 15}}
  //               />
  //               <Text
  //                 style={{
  //                   color: Colors.white,
  //                   fontFamily: FontFamily.RobotoBold,
  //                   fontSize: FontSize.h15,
  //                   paddingLeft: 7,
  //                 }}>
  //                 New
  //               </Text>
  //             </Pressable>
  //           )}
  //           <Header />
  //         </View>
  //       )
  //     : null,
  // };
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
        // options={drawerOption({
        //   label: 'Request Lunch',
        //   headerIconName: MonthImages.info_scopy,
        // })}
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
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor: Colors.darkBlue,
          },
          title: '   WFH Details',
          headerTintColor: Colors.white,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={MonthImages.backArrowS}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: true,
        })}
        name={WFHDetailsScreen}
        component={WFHDetails}
      />
      <WorkFromHomeStack.Screen
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor: Colors.darkBlue,
          },
          title: '  Leave Detail',
          headerTintColor: Colors.white,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={MonthImages.backArrowS}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: true,
        })}
        name={'workFromHomeLeaveDetailsScreen'}
        component={LeaveDetails}
      />
      <WorkFromHomeStack.Screen
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor: Colors.darkBlue,
          },
          title: '  Leave Details',
          headerTintColor: Colors.white,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={MonthImages.backArrowS}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: true,
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
        options={drawerOption({
          label: 'Attendance',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
          // headerIcon: MonthImages.info_scopy,
          headerIcon: false,
        })}
        name={AttendenceScreen}
        component={Attendence}
      />
      <AttendenceStack.Screen
        options={drawerOption({
          label: 'Regularization',
          navigation: navigation,
          showDrawer: false,
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
        options={drawerOption({
          label: 'Profile',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
        })}
        name={ProfileScreen}
        component={Profile}
      />
    </ProfileStack.Navigator>
  );
};

const HolidaysStackScreen = ({navigation}) => {
  return (
    <HolidaysStack.Navigator
      initialRouteName={HolidaysScreen}
      screenOptions={{headerShown: false}}>
      <HolidaysStack.Screen
        options={drawerOption({
          label: 'Holidays',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
        })}
        name={HolidaysScreen}
        component={Holidays}
      />
    </HolidaysStack.Navigator>
  );
};

const LeavesStackScreen = ({navigation}) => {
  return (
    <LeavesStack.Navigator
      initialRouteName="leaves"
      screenOptions={{headerShown: false}}>
      <LeavesStack.Screen
        options={drawerOption({
          label: 'Leaves',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
        })}
        name={LeavesScreen}
        component={Leaves}
      />
      <LeavesStack.Screen
        options={drawerOption({
          label: 'Leave Details',
          showDrawer: false,
          showHeaderRight: false,
          navigation: navigation,
        })}
        name={LeaveDetailsScreen}
        component={LeaveDetails}
      />
      <LeavesStack.Screen
        options={drawerOption({
          label: 'Apply Leave',
          showDrawer: false,
          showHeaderRight: false,
          // headerIconName: MonthImages.info_scopy,
          navigation: navigation,
        })}
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
        options={drawerOption({
          label: 'Salary Slip',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
        })}
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
        options={drawerOption({
          showDrawer: false,
          showHeaderRight: false,
          label: 'Preview',
          navigation: navigation,
        })}
      />
    </SalarySlipStack.Navigator>
  );
};

const ResourcesStackScreen = ({navigation}) => {
  return (
    <ResourcesStack.Navigator
      // screenOptions={{headerShown: false}}
      initialRouteName={ResourcesScreen}>
      <ResourcesStack.Screen
        options={drawerOption({
          label: 'Resources',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
        })}
        name={ResourcesScreen}
        component={Resources}
      />

      <ResourcesStack.Screen
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor: Colors.darkBlue,
          },
          title: '  Resource Detail',
          headerTintColor: Colors.white,
          headerLeft: () => (
            <TouchableOpacity
              // style={{backgroundColor: 'red'}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={MonthImages.backArrowS}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: true,
        })}
        name={ResourcesDetailsScreen}
        component={ResourcesDetails}
      />
      <ResourcesStack.Screen
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor: Colors.darkBlue,
          },
          title: '  Leave Detail',
          headerTintColor: Colors.white,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={MonthImages.backArrowS}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: true,
        })}
        name={'resourceLeaveDetailsScreen'}
        component={LeaveDetails}
      />
      <ResourcesStack.Screen
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor: Colors.darkBlue,
          },
          title: '  Leave Details',
          headerTintColor: Colors.white,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={MonthImages.backArrowS}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: true,
        })}
        name={'resourceLeaveDetailsScreenOpen'}
        component={ApplyLeave}
      />

      <ResourcesStack.Screen
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor: Colors.darkBlue,
          },
          title: '  Attaidance Details',
          headerTintColor: Colors.white,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={MonthImages.backArrowS}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: true,
        })}
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
        options={drawerOption({
          label: "Today's Atendance",
          headerIconName: MonthImages.EventImage,
          navigation: navigation,
        })}
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
          backgroundColor: Colors.royalBlue, //Set Drawer background
          width: wp(35),
          borderBottomWidth: 1,
          borderBottomColor: Colors.white,
          // justifyContent: 'center',
          // alignItems: 'center',
          // paddingLeft: 0,
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
