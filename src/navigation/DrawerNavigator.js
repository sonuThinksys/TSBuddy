import * as React from 'react';
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
import Attendence from 'screens/attendence/Attendence';
import Holidays from 'screens/holidays/Holidays';
import Leaves from 'screens/leaves/Leaves';
import SalarySlip from 'screens/salarySlip/SalarySlip';
import {useDispatch} from 'react-redux';
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
} from './Route';
import {FontFamily, FontSize} from 'constants/fonts';
const Drawer = createDrawerNavigator();

const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AttendenceStack = createNativeStackNavigator();
const HolidaysStack = createNativeStackNavigator();
const LeavesStack = createNativeStackNavigator();
const SalarySlipStack = createNativeStackNavigator();

const drawerOption = ({
  label,
  headerIconName,
  navigation,
  showDrawer = true,
  showHeaderRight = true,
  fromLeave = false,
}) => {
  return {
    label: () => <Text>{label}</Text>,
    headerShown: true,
    headerLeft: showDrawer
      ? props => (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Image
              source={MonthImages.DrwaerMenu}
              style={{height: 22, width: 22}}
            />
          </TouchableOpacity>
        )
      : null,
    headerStyle: {backgroundColor: Colors.darkBlue},
    headerTintColor: Colors.white,
    headerTitle: () => (
      <TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: Colors.white,
              textAlign: 'center',
              marginLeft:
                Platform.OS === 'ios' ? 0.1 : !showDrawer ? wp(20) : wp(32),
              //paddingTop: hp(0.5),
              fontSize: 16,
              fontWeight: 'bold',
              marginRight: wp(2),
            }}>
            {label}
          </Text>
          {fromLeave && (
            <Pressable
              onPress={() => {
                navigation.navigate('LeaveApplyScreen');
              }}>
              <Text style={styles.newLeaveText}>+ New</Text>
            </Pressable>
          )}
          {/* {headerIconName ? (
            <Image source={headerIconName} style={{height: 20, width: 20}} />
          ) : null} */}
        </View>
      </TouchableOpacity>
    ),
    headerRight: showHeaderRight
      ? () => (
          <TouchableOpacity>
            <Header />
          </TouchableOpacity>
        )
      : null,
  };
};

const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeDashboard"
      // screenOptions={() => {
      //   return {
      //     headerShown: false,
      //     // headerStyle: {backgroundColor: Colors.red},
      //     // headerTintColor: Colors.white,
      //     // headerTitleStyle: {fontWeight: 'bold'},
      //   };
      // }}
      headerMode="none">
      <HomeStack.Screen
        name={HomeScreen}
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

const AttendenceStackScreen = ({navigation}) => {
  return (
    <AttendenceStack.Navigator screenOptions={{headerShown: false}}>
      <AttendenceStack.Screen
        options={drawerOption({
          label: 'Attendence',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
        })}
        name={AttendenceScreen}
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
        name={ProfileScreen}
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
          fromLeave: true,
        })}
        name={LeavesScreen}
        component={Leaves}
      />
      <LeavesStack.Screen
        options={drawerOption({
          label: 'Leave Details',
          showDrawer: false,
          showHeaderRight: false,
          // headerIconName: MonthImages.info_scopy,
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
      <Drawer.Screen name="Attendence" component={AttendenceStackScreen} />
      <Drawer.Screen name="Leaves" component={LeavesStackScreen} />
      <Drawer.Screen name="Holidays" component={HolidaysStackScreen} />

      <Drawer.Screen name="SalarySlip" component={SalarySlipScreen} />

      <Drawer.Screen name="logout" component={Logout} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
  newLeaveText: {
    color: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.white,
    fontFamily: FontFamily.RobotoBold,
    fontSize: FontSize.h18,
    paddingHorizontal: 4,
    marginLeft: 16,
  },
});
