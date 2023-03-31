import * as React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {getEmployeeData} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import UserProfile from 'component/useProfile/UserProfile';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'colors/Colors';
import {employeeProfileScreen} from 'navigation/Route';
const Header = () => {
  const {userToken: token} = useSelector(state => state.auth);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          dispatch(getEmployeeData(token));
          navigation.navigate(employeeProfileScreen);
        }}>
        <Image
          source={MonthImages.searchIconwhite}
          style={{
            height: 25,
            width: 25,
            marginRight: wp(5),
            color: Colors.white,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
