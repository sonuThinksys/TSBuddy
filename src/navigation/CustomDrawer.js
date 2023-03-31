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

import {useDispatch} from 'react-redux';
import {FontFamily, FontSize} from 'constants/fonts';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

// import CrossIcon from 'assets/mipmap/icon_close.svg';
// import {appVersion} from 'utils/appVersion';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {loginStatus,logOut} from 'Auth/LoginSlice';

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
  ];
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
  return (
    <TouchableOpacity
      key={index}
      onPress={() => {
        if (dispatch) {
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
      <Image source={icon} resizeMode="contain" style={{height: 45, width: 45}} />
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
