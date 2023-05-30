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
        <Image
          source={MonthImages.searchIconwhite}
          style={{
            height: 22,
            width: 22,
            marginRight: wp(1),
            // color: Colors.white,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
