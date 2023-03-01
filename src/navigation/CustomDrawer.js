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

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

// import CrossIcon from 'assets/mipmap/icon_close.svg';
// import {appVersion} from 'utils/appVersion';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {loginStatus} from 'Auth/LoginSlice';

export default ({navigation}) => {
  const dispatch = useDispatch();

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
    {
      screen: 'Attendence',
      label: 'Attendence',
      navigation,
      key: 3,
      icon: MonthImages.AttendanceDrawer,
    },
    {
      screen: 'Holidays',
      label: 'Holidays',
      navigation,
      key: 4,
      icon: MonthImages.HolidaysIcon,
    },
    {
      screen: 'Leaves',
      label: 'Leaves',
      navigation,
      key: 5,
      icon: MonthImages.leavesImage,
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
  ];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      style={{
        flex: 1,
      }}>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <Text>Check</Text>
        <CrossIcon color={Colors.white} width={wp(9)} height={hp(9)} />
      </TouchableOpacity> */}
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
  return (
    <TouchableOpacity
      key={index}
      onPress={() => {
        if (dispatch) {
          dispatch(loginStatus(false));

          navigation.closeDrawer();
        } else {
          navigation.closeDrawer();
          navigation.navigate(screen);
        }
      }}
      style={{
        paddingVertical: wp(3),
        borderBottomWidth: 1,
        borderBottomColor: '#495057',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: selected ? Colors.lightBlue : null,
      }}>
      <Image source={icon} style={{height: 50, width: 50}} />
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
