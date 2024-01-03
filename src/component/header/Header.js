import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';

// import {MonthImages} from 'assets/monthImage/MonthImage';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'colors/Colors';
import {employeeProfileScreen} from 'navigation/Route';
import {setFromNavigatedScreen} from 'redux/homeSlice';
import SearchIcon from 'assets/newDashboardIcons/user-magnifying-glass.svg';

const Header = ({isHome}) => {
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
        <SearchIcon
          fill={isHome ? Colors.black : Colors.white}
          height={26}
          width={26}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
