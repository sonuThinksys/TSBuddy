import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {FontFamily, FontSize} from 'constants/fonts';
import jwt_decode from 'jwt-decode';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

// import CrossIcon from 'assets/mipmap/icon_close.svg';
// import {appVersion} from 'utils/appVersion';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {loginStatus, logOut} from 'Auth/LoginSlice';

export default ({navigation}) => {
  const {userToken: token} = useSelector(state => state.auth);
  const decoded = jwt_decode(token);
  const isLeaveApprover = decoded?.role?.includes('Leave Approver');
  const dispatch = useDispatch();

  const resorcesTab = {
    screen: 'Resources',
    label: 'Resources',
    navigation,
    key: 3,
    icon: MonthImages.HomeImage,
  };

  const drawerList = [
    {
      screen: 'Home',
      label: 'Home',
      navigation,
      key: 1,
      icon: MonthImages.HomeImage,
    },
    {
      screen: 'Profile',
      label: 'Profile',
      navigation,
      key: 2,
      icon: MonthImages.ProfileIcon,
    },
    // isLeaveApprover && resorcesTab,
    {
      screen: 'Attendence',
      label: 'Attendence',
      navigation,
      key: 3,
      icon: MonthImages.AttendanceDrawer,
    },
    {
      screen: 'Leaves',
      label: 'Leaves',
      navigation,
      key: 4,
      icon: MonthImages.leavesImage,
    },
    {
      screen: 'Holidays',
      label: 'Holidays',
      navigation,
      key: 5,
      icon: MonthImages.HolidaysIcon,
    },

    {
      screen: 'SalarySlip',
      label: 'SalarySlip',
      navigation,
      key: 6,
      icon: MonthImages.salarySlipIcon,
    },
    {
      screen: 'logout',
      label: 'Logout',
      navigation,
      key: 7,
      dispatch,
      icon: MonthImages.logoutmenuS,
    },
    // {
    //   screen: 'resources',
    //   label: 'Resources',
    //   navigation,
    //   key: 8,
    //   icon: MonthImages.logoutmenuS,
    // },
  ];

  if (isLeaveApprover) {
    drawerList.splice(2, 0, resorcesTab);
    drawerList.forEach((el, index) => {
      el.key = index + 1;
    });
  }

  // if (isLeaveApproover) {
  //   drawerList.push(resorcesTab);
  // }

  // drawerList.splice(2, 0, {
  //   screen: 'Resources',
  //   label: 'Resources',
  //   navigation,
  //   key: 3,
  //   dispatch,
  //   icon: MonthImages.salarySlipIcon,
  // });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      style={{
        flex: 1,
      }}>
      {drawerList.map((value, index) => {
        return renderDrawerItem(value, index);
      })}
    </ScrollView>
  );
};
const renderDrawerItem = (
  {navigation, key, screen, label, dispatch, icon},
  index,
) => {
  const selected = navigation.getState().index + 1 === key;
  // if (selected) {
  //   console.log('index:', index, key, navigation.getState());
  // }
  return (
    <TouchableOpacity
      key={index}
      onPress={() => {
        if (dispatch) {
          // dispatch(loginStatus(false));
          dispatch(logOut());
          navigation.closeDrawer();
        } else {
          navigation.closeDrawer();
          navigation.navigate(screen);
        }
      }}
      style={{
        paddingVertical: wp(3),
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightBlack,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: selected ? Colors.lightBlue : null,
      }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{height: 45, width: 45}}
      />
      <Text
        style={{
          color: Colors.white,
          fontSize: FontSize.h18,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
