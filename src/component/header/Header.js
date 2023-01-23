import * as React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {getEmployeeData} from 'redux/dataSlice';
import {useDispatch} from 'react-redux';
import UserProfile from 'component/useProfile/UserProfile';
import {useNavigation} from '@react-navigation/native';
const Header = () => {
  const navigation = useNavigation();
  console.log('navigation', navigation);
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          dispatch(getEmployeeData());
          navigation.navigate('UserProfile');
        }}>
        <Image
          source={MonthImages.searchIconwhite}
          style={{
            height: 25,
            width: 25,
            marginRight: wp(5),
            color: 'white',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
