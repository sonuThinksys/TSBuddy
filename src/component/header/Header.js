import * as React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'colors/Colors';
import {employeeProfileScreen} from 'navigation/Route';
import {setFromNavigatedScreen} from 'redux/homeSlice';
import SearchIcon from 'assets/newDashboardIcons/user-magnifying-glass.svg';

const Header = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const screenName = route.name;

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          dispatch(setFromNavigatedScreen({screenName}));
          navigation.navigate(employeeProfileScreen);
        }}>
        <SearchIcon height={26} width={26} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
